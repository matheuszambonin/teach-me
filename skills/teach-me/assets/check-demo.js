#!/usr/bin/env node
// Checks a lesson's Demos before the lesson is delivered.
//   node assets/check-demo.js lessons/NNNN-name.html [--screenshot file.png]
// Level 1 (required): runs the model in Node at the example, the target, the slider ends,
// the range edges and the extra points, and checks the prediction's answer key.
// Level 2 (when Chromium or Chrome exists): opens the lesson with ?check=1 and reads
// the final DOM. Exits with code 1 if anything fails.
'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const Integ = require('./integ.js');

const BROWSERS = ['chromium', 'chromium-browser', 'google-chrome', 'google-chrome-stable', 'chrome'];
const BROWSER_TIMEOUT_MS = 30000;
const RATIO_DECIMALS = 2;

function specsIn(html) {
  const re = /<script type="application\/json" class="demo-spec">([\s\S]*?)<\/script>/g;
  const found = [];
  let m;
  while ((m = re.exec(html))) found.push(JSON.parse(m[1]));
  return found;
}

function exampleParams(spec) {
  const p = { ...spec.fixed };
  spec.params.forEach((q) => { p[q.id] = q.example; });
  return p;
}

function inRange(range, p) {
  if (!range) return true;
  const x = p[range.param];
  return (range.min === undefined || x >= range.min) && (range.max === undefined || x <= range.max);
}

function finite(vals) {
  return Object.values(vals).every((v) => Number.isFinite(v.sim) && Number.isFinite(v.formula));
}

function checkSpec(spec, lessonDir) {
  const modelPath = path.resolve(lessonDir, '..', 'assets', 'models', spec.model + '.js');
  const model = require(modelPath);
  const rows = [];

  function runAt(name, p, compareFormula) {
    let vals;
    try {
      vals = model.values(Integ.run(model, p), p);
    } catch (e) {
      rows.push({ point: name, readout: '—', simulated: '—', formula: '—', result: 'FAILED: ' + e.message });
      return null;
    }
    model.readouts.forEach((r) => {
      const d = spec.readouts[r.id].decimals;
      const v = vals[r.id];
      const sim = v.sim.toFixed(d), formula = v.formula.toFixed(d);
      let result;
      if (!Number.isFinite(v.sim) || !Number.isFinite(v.formula)) result = 'FAILED: not finite';
      else if (!compareFormula) result = 'ok (finite only)';
      else if (!inRange(r.range, p)) result = 'outside range';
      else result = Math.abs(v.sim - v.formula) <= Math.pow(10, -d) + 1e-12 ? 'ok' : 'FAILED: differ by more than one unit in the last place';
      rows.push({ point: name, readout: r.id, simulated: sim, formula, result });
    });
    return vals;
  }

  const q = spec.question;
  const example = exampleParams(spec);
  const target = { ...example, [q.param]: q.target };
  const atExample = runAt('example', example, true);
  const atTarget = runAt('target ' + q.param + '=' + q.target, target, true);

  spec.params.forEach((param) => {
    ['min', 'max'].forEach((end) => {
      runAt(param.id + '=' + param[end], { ...example, [param.id]: param[end] }, false);
    });
  });

  // Every range edge: the approximate claim must still agree there, with the other sliders at their ends.
  model.readouts.filter((r) => r.range).forEach((r) => {
    ['min', 'max'].filter((end) => r.range[end] !== undefined).forEach((end) => {
      const edge = { ...example, [r.range.param]: r.range[end] };
      runAt('edge ' + r.range.param + '=' + r.range[end], edge, true);
      spec.params.filter((x) => x.id !== r.range.param).forEach((x) => {
        ['min', 'max'].forEach((e) => runAt('edge ' + r.range.param + '=' + r.range[end] + ', ' + x.id + '=' + x[e], { ...edge, [x.id]: x[e] }, true));
      });
    });
  });

  // Extra points declared in the lesson, usually a reported and fixed defect.
  (spec.check || []).forEach((extra) => {
    const p = { ...example, ...extra };
    runAt('extra ' + Object.keys(extra).map((k) => k + '=' + extra[k]).join(', '), p, true);
  });

  // Answer key: the target/example ratio of the asked readout must match the correct option, and only it.
  if (atExample && atTarget && finite(atExample) && finite(atTarget)) {
    const ratio = atTarget[q.readout].sim / atExample[q.readout].sim;
    const shown = ratio.toFixed(RATIO_DECIMALS);
    const matches = q.options.filter((o) => o.ratio.toFixed(RATIO_DECIMALS) === shown);
    const right = matches.length === 1 && matches[0].correct;
    rows.push({ point: 'answer key', readout: q.readout, simulated: 'ratio ' + shown, formula: 'correct option ' + q.options.find((o) => o.correct).ratio, result: right ? 'ok' : 'FAILED: the correct option does not describe the model' });
  }

  console.log('\nDemo ' + spec.id + ' · model ' + spec.model);
  console.table(rows);
  return rows.every((r) => !r.result.startsWith('FAILED'));
}

// Shell texts: every key of demo.js needs a translation in demo-text.js, when that file exists.
function checkText(assetsDir) {
  const textPath = path.join(assetsDir, 'demo-text.js');
  if (!fs.existsSync(textPath)) {
    console.log('\nTexts: no demo-text.js; the shell speaks English.');
    return true;
  }
  const keys = Object.keys(require(path.join(assetsDir, 'demo.js')).Demo.TEXT);
  const translated = require(textPath).DemoText || {};
  const missing = keys.filter((k) => !(k in translated));
  console.log('\nTexts: ' + (missing.length ? 'MISSING in demo-text.js: ' + missing.join(', ') : 'ok'));
  return missing.length === 0;
}

function findBrowser() {
  for (const name of BROWSERS) {
    const r = spawnSync('which', [name], { encoding: 'utf8' });
    if (r.status === 0) return r.stdout.trim();
  }
  return null;
}

function checkInBrowser(lessonPath, specs, screenshot) {
  const browser = findBrowser();
  if (!browser) {
    console.log('\nBrowser: no Chromium or Chrome on this machine; level 2 did not run.');
    return true;
  }
  const url = 'file://' + path.resolve(lessonPath) + '?check=1';
  const base = ['--headless=new', '--disable-gpu', '--no-sandbox', '--virtual-time-budget=2000'];
  const r = spawnSync(browser, [...base, '--dump-dom', url], { encoding: 'utf8', timeout: BROWSER_TIMEOUT_MS });
  const dom = r.stdout || '';
  let ok = true;
  const errors = /data-demo-errors="([^"]*)"/.exec(dom);
  if (errors) { console.log('\nBrowser: script error: ' + errors[1]); ok = false; }
  specs.forEach((spec) => {
    const tag = new RegExp('id="' + spec.id + '"[^>]*>').exec(dom);
    const check = tag && /data-check="(\w+)"/.exec(tag[0]);
    const points = tag && /data-check-points="([^"]*)"/.exec(tag[0]);
    const status = check ? check[1] : 'missing';
    console.log('\nBrowser: Demo ' + spec.id + ': ' + status + (points ? '\n  ' + points[1].replace(/&amp;/g, '&') : ''));
    if (status !== 'pass') ok = false;
  });
  if (screenshot) {
    spawnSync(browser, [...base, '--window-size=900,2400', '--screenshot=' + path.resolve(screenshot), url], { timeout: BROWSER_TIMEOUT_MS });
    console.log('Screenshot: ' + screenshot);
  }
  return ok;
}

function main() {
  const args = process.argv.slice(2);
  const lessonPath = args.find((a) => a.endsWith('.html'));
  const shotIndex = args.indexOf('--screenshot');
  const screenshot = shotIndex >= 0 ? args[shotIndex + 1] : null;
  if (!lessonPath) {
    console.error('usage: node assets/check-demo.js lessons/NNNN-name.html [--screenshot file.png]');
    process.exit(2);
  }
  const specs = specsIn(fs.readFileSync(lessonPath, 'utf8'));
  if (specs.length === 0) {
    console.log('No Demo in this lesson.');
    return;
  }
  const nodeOk = specs.map((s) => checkSpec(s, path.dirname(path.resolve(lessonPath)))).every(Boolean);
  const textOk = checkText(path.resolve(path.dirname(lessonPath), '..', 'assets'));
  const browserOk = checkInBrowser(lessonPath, specs, screenshot);
  const ok = nodeOk && textOk && browserOk;
  console.log('\n' + (ok ? 'PASSED' : 'FAILED'));
  process.exit(ok ? 0 : 1);
}

main();
