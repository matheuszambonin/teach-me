// The Demo shell. Classic script; sets window.Demo. Needs window.Integ.
// The contract only grows: Demo.mount(id, { model, draw }), with the Demo's declaration
// (what changes from lesson to lesson) in a <script type="application/json" class="demo-spec">
// inside the element id.
(function (root) {
  'use strict';

  var PLAY_SECONDS = 4;   // screen seconds per run, whatever the model time
  var MAX_FRAME = 0.1;    // screen seconds consumed per frame, at most

  // Shell texts in English. The workspace translates them once in assets/demo-text.js (window.DemoText),
  // and a lesson's JSON block can still override one with "text".
  var TEXT = {
    lock: 'Pick an answer to unlock the controls.',
    replay: 'Replay the run',
    back: 'Back to the example values',
    sim: 'simulated',
    formula: 'formula',
    defect: 'These two numbers should match here. This is a fault in the Demo, not in the formula. Mention it at the start of the next session.',
    outside: 'Outside the range where the formula holds ({range}): the gap is part of what the Demo shows.',
    goTarget: 'Now set {param} to {value} and read the result at the end of the run.',
    restOthers: 'For the verdict, leave the other controls at the example values.',
    right: 'Right.',
    wrong: 'Not that one.',
    printCaption: 'Model readouts at three values of {param}.',
    and: 'and'
  };

  var checkMode = /[?&]check=1\b/.test(root.location ? root.location.search : '');

  // Errors from any script go into an attribute, for the --dump-dom check.
  if (root.addEventListener) {
    root.addEventListener('error', function (e) {
      var html = document.documentElement;
      html.dataset.demoErrors = (html.dataset.demoErrors ? html.dataset.demoErrors + ' | ' : '') + (e.message || 'error');
    });
  }

  function fill(template, vars) {
    return template.replace(/\{(\w+)\}/g, function (_, k) { return vars[k]; });
  }

  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') el.textContent = attrs[k];
      else if (k === 'className') el.className = attrs[k];
      else el.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { el.appendChild(c); });
    return el;
  }

  // Numbers in the format of the lesson's language (<html lang>).
  function lang() {
    return (root.document && document.documentElement.lang) || 'en';
  }

  function fmt(x, decimals) {
    return isFinite(x) ? x.toLocaleString(lang(), { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: false }) : '—';
  }

  function fmtParam(param, value) {
    var unit = param.unit ? (param.unit === '°' ? '°' : ' ' + param.unit) : '';
    return value.toLocaleString(lang(), { useGrouping: false, maximumFractionDigits: 6 }) + unit;
  }

  // Range declared in the model: { param, min?, max? }. No range: the formula always holds.
  function inRange(range, p) {
    if (!range) return true;
    var x = p[range.param];
    return (range.min === undefined || x >= range.min) && (range.max === undefined || x <= range.max);
  }

  function rangeText(range, spec) {
    var param = spec.params.filter(function (q) { return q.id === range.param; })[0];
    var name = param ? param.symbol || param.label : range.param;
    var parts = [];
    if (range.min !== undefined) parts.push(name + ' ≥ ' + fmtParam(param || {}, range.min));
    if (range.max !== undefined) parts.push(name + ' ≤ ' + fmtParam(param || {}, range.max));
    return parts.join(' ' + (Object.assign({}, TEXT, root.DemoText).and) + ' ');
  }

  // Equal when they differ by at most one unit in the last place shown.
  function agree(a, b, decimals) {
    return Math.abs(a - b) <= Math.pow(10, -decimals) + 1e-12;
  }

  // Compares one readout at the places shown. Returns 'ok', 'defect' or 'outside'.
  function compare(readout, value, decimals, p) {
    if (!inRange(readout.range, p)) return 'outside';
    if (!isFinite(value.sim) || !isFinite(value.formula)) return 'defect';
    return agree(value.sim, value.formula, decimals) ? 'ok' : 'defect';
  }

  function exampleParams(spec) {
    var p = Object.assign({}, spec.fixed);
    spec.params.forEach(function (q) { p[q.id] = q.example; });
    return p;
  }

  function mount(id, opts) {
    var root_ = document.getElementById(id);
    var spec = JSON.parse(root_.querySelector('script.demo-spec').textContent);
    var model = opts.model, draw = opts.draw;
    var text = Object.assign({}, TEXT, root.DemoText, spec.text);
    var q = spec.question;
    var targetParam = spec.params.filter(function (x) { return x.id === q.param; })[0];

    // --- Prediction question ---
    var chosen = null;
    var optionButtons = q.options.map(function (o, i) {
      var b = h('button', { type: 'button', className: 'demo-option', text: o.text });
      b.addEventListener('click', function () { choose(i); });
      return b;
    });
    var questionEl = h('div', { className: 'demo-question' }, [
      h('p', { text: q.text }),
      h('div', { className: 'demo-options' }, optionButtons),
      h('p', { className: 'demo-lock', text: text.lock })
    ]);

    // --- Canvas ---
    var canvas = h('canvas', { width: spec.canvas[0], height: spec.canvas[1], className: 'demo-canvas' });
    var ctx = canvas.getContext('2d');

    // --- Controles ---
    var sliders = {};
    var controls = h('div', { className: 'demo-controls' }, spec.params.map(function (x) {
      var input = h('input', { type: 'range', id: id + '-' + x.id, min: x.min, max: x.max, step: x.step, value: x.example, disabled: '' });
      var out = h('output', { for: input.id, text: fmtParam(x, x.example) });
      input.addEventListener('input', function () { out.textContent = fmtParam(x, +input.value); restart(); });
      sliders[x.id] = { input: input, out: out, param: x };
      return h('label', { className: 'demo-slider' }, [h('span', { text: x.label }), input, out]);
    }));
    var replayBtn = h('button', { type: 'button', text: text.replay, disabled: '' });
    var backBtn = h('button', { type: 'button', text: text.back, disabled: '' });
    replayBtn.addEventListener('click', function () { restart(); });
    backBtn.addEventListener('click', backToExample);

    // --- Leituras ---
    var readoutEls = {};
    var readoutTable = h('table', { className: 'demo-readouts' }, [
      h('tr', {}, [h('th', { text: '' }), h('th', { text: text.sim }), h('th', { text: text.formula })])
    ].concat(model.readouts.map(function (r) {
      var meta = spec.readouts[r.id];
      var sim = h('output', { className: 'demo-sim' });
      var formula = h('output', { className: 'demo-formula' });
      readoutEls[r.id] = { sim: sim, formula: formula, row: null };
      var row = h('tr', { 'data-readout': r.id }, [
        h('th', { text: meta.label + (meta.unit ? ' (' + meta.unit + ')' : '') }),
        h('td', {}, [sim]), h('td', {}, [formula])
      ]);
      readoutEls[r.id].row = row;
      return row;
    })));
    var notice = h('p', { className: 'demo-notice', 'aria-live': 'polite' });
    var verdict = h('p', { className: 'demo-verdict', 'aria-live': 'polite' });

    // --- Print table ---
    var printTable = buildPrintTable();

    root_.classList.add('demo', 'demo-locked');
    [questionEl, canvas, controls, h('div', { className: 'demo-buttons' }, [replayBtn, backBtn]),
      readoutTable, notice, verdict, printTable].forEach(function (el) { root_.appendChild(el); });
    var caption = root_.querySelector('figcaption');
    if (caption) root_.insertBefore(caption, canvas.nextSibling);

    // --- Run state ---
    var p, s, running = false, last = null, acc = 0;

    function readParams() {
      var out = Object.assign({}, spec.fixed);
      Object.keys(sliders).forEach(function (k) { out[k] = +sliders[k].input.value; });
      return out;
    }

    function atExampleExceptTarget(params) {
      return spec.params.every(function (x) { return x.id === q.param || params[x.id] === x.example; });
    }

    function showReadouts(state, params, finished) {
      var vals = model.values(state, params);
      var status = 'ok';
      model.readouts.forEach(function (r) {
        var meta = spec.readouts[r.id];
        var el = readoutEls[r.id];
        el.sim.textContent = fmt(vals[r.id].sim, meta.decimals);
        el.formula.textContent = fmt(vals[r.id].formula, meta.decimals);
        el.row.className = '';
        if (!finished) return;
        var c = compare(r, vals[r.id], meta.decimals, params);
        el.row.className = 'demo-' + c;
        if (c === 'defect') status = 'defect';
        else if (c === 'outside' && status === 'ok') { status = 'outside'; notice.textContent = fill(text.outside, { range: rangeText(r.range, spec) }); }
      });
      if (status === 'defect') notice.textContent = text.defect;
      else if (status === 'ok') notice.textContent = '';
      return status;
    }

    function showVerdict(status, params) {
      if (chosen === null || status === 'defect') { verdict.textContent = ''; return; }
      if (params[q.param] !== q.target) {
        verdict.textContent = fill(text.goTarget, { param: targetParam.label, value: fmtParam(targetParam, q.target) });
        return;
      }
      if (!atExampleExceptTarget(params)) { verdict.textContent = text.restOthers; return; }
      var o = q.options[chosen];
      verdict.textContent = (o.correct ? text.right : text.wrong) + ' ' + o.why;
      verdict.className = 'demo-verdict ' + (o.correct ? 'demo-right' : 'demo-wrong');
    }

    function finish() {
      running = false;
      var status = showReadouts(s, p, true);
      showVerdict(status, p);
      return status;
    }

    function frame(now) {
      if (!running) return;
      var dt = last === null ? 0 : Math.min((now - last) / 1000, MAX_FRAME);
      last = now;
      var modelSeconds = dt * model.duration(p) / PLAY_SECONDS;
      acc += modelSeconds;
      while (acc >= model.h && !model.done(s, p)) { s = model.step(s, model.h, p); acc -= model.h; }
      draw(ctx, s, p, model);
      if (model.done(s, p)) { finish(); return; }
      showReadouts(s, p, false);
      requestAnimationFrame(frame);
    }

    function restart() {
      p = readParams();
      s = model.init(p);
      acc = 0; last = null;
      verdict.textContent = ''; verdict.className = 'demo-verdict';
      notice.textContent = '';
      if (!running) { running = true; requestAnimationFrame(frame); }
    }

    function setSliders(values) {
      Object.keys(sliders).forEach(function (k) {
        sliders[k].input.value = values[k];
        sliders[k].out.textContent = fmtParam(sliders[k].param, +sliders[k].input.value);
      });
    }

    function backToExample() {
      setSliders(exampleParams(spec));
      restart();
    }

    function unlock() {
      root_.classList.remove('demo-locked');
      Object.keys(sliders).forEach(function (k) { sliders[k].input.removeAttribute('disabled'); });
      replayBtn.removeAttribute('disabled');
      backBtn.removeAttribute('disabled');
    }

    function choose(i) {
      if (chosen !== null) return;
      chosen = i;
      optionButtons.forEach(function (b, j) {
        b.disabled = true;
        if (j === i) b.classList.add('demo-chosen');
      });
      unlock();
      restart();
    }

    function buildPrintTable() {
      var meta = spec.readouts;
      var rows = [h('tr', {}, [h('th', { text: targetParam.label })].concat(model.readouts.map(function (r) {
        return h('th', { text: meta[r.id].label + ': ' + text.sim + ' · ' + text.formula });
      })))];
      spec.print.forEach(function (value) {
        var params = exampleParams(spec);
        params[q.param] = value;
        var vals = model.values(Integ.run(model, params), params);
        rows.push(h('tr', {}, [h('td', { text: fmtParam(targetParam, value) })].concat(model.readouts.map(function (r) {
          var d = meta[r.id].decimals;
          return h('td', { text: fmt(vals[r.id].sim, d) + ' · ' + fmt(vals[r.id].formula, d) });
        }))));
      });
      return h('table', { className: 'demo-print' }, [
        h('caption', { text: fill(text.printCaption, { param: targetParam.label }) })
      ].concat(rows));
    }

    // --- Check mode: ?check=1 ---
    // Goes through the same sliders and readouts as normal mode, synchronously,
    // and writes the result to data-check for the agent to read in the final DOM.
    function check() {
      unlock();
      var points = [{ name: 'example', values: exampleParams(spec) }];
      var target = exampleParams(spec);
      target[q.param] = q.target;
      points.push({ name: 'target', values: target });
      var results = points.map(function (pt) {
        setSliders(pt.values);
        p = readParams();
        s = Integ.run(model, p);
        var status = showReadouts(s, p, true);
        var shown = model.readouts.map(function (r) {
          return r.id + '=' + readoutEls[r.id].sim.textContent + '/' + readoutEls[r.id].formula.textContent;
        }).join(',');
        return pt.name + ':' + status + ':' + shown;
      });
      setSliders(exampleParams(spec));
      p = readParams();
      s = Integ.run(model, p);
      draw(ctx, s, p, model);
      showReadouts(s, p, true);
      root_.dataset.check = results.every(function (r) { return /:(ok|outside):/.test(r); }) ? 'pass' : 'fail';
      root_.dataset.checkPoints = results.join(' | ');
    }

    // Before the prediction, the canvas shows the example's run already complete.
    p = exampleParams(spec);
    s = Integ.run(model, p);
    draw(ctx, s, p, model);
    if (checkMode) check();
  }

  root.Demo = { mount: mount, TEXT: TEXT };
})(this);
