# Demo Format

A **Demo** is the manipulable simulation inside a lesson, tied to one claim of its text. The learner predicts first, then moves the controls and watches a simulated value beside the value the claim predicts. Watching without predicting produces the illusion of competence (Oakley ch. 4); a simulation with a bug teaches the bug, because the learner trusts it. So every Demo predicts first and every Demo is checked before the learner sees it.

## When a chunk gets one

A chunk gets a Demo when the lesson's central claim ties a quantity the learner can vary to a quantity the lesson can compute: at least one free parameter and one value given by a formula or rule. A chunk with nothing to vary gets none.

One Demo per lesson. A second one only when the claim has two parameters whose effects the learner should predict separately, and one set of controls would mix the two predictions. When in doubt, one.

## Files

The skill ships the shell in `assets/`: `demo.js`, `integ.js`, `demo.css` and `check-demo.js`. At the first Demo in a workspace, copy the four into `./assets/`. At every later Demo, copy any of them over the workspace copy when the workspace copy is older than the skill. The shell's contract only grows, so an overwrite never breaks a lesson. Edit the shell only in the skill, never in the workspace.

At the first Demo, also write `./assets/demo-text.js`: the shell's interface texts translated into the learner's language, once. Copy the keys of `TEXT` in `demo.js` and translate the values, keeping the `{…}` placeholders as they are:

```js
(function (root) {
  root.DemoText = { lock: '…', replay: '…', /* every key of TEXT */ };
})(this);
```

The skill never overwrites this file. When `check-demo.js` reports a missing key after a shell update, translate that key and add it.

Each chunk's simulation lives in `./assets/models/<slug>.js`: pure, no DOM, a classic script ending in `module.exports` so that the browser and Node load the same file. Another lesson about the same system reuses it.

```js
(function (root) {
  var Integ = typeof module !== 'undefined' && module.exports ? require('../integ.js') : root.Integ;
  var model = {
    slug: 'pendulum',
    h: 0.0005,                                   // fixed step, model time
    readouts: [{ id: 'period', range: { param: 'theta0', max: 10 } }],
    init: function (p) { /* state from parameters */ },
    step: function (s, h, p) { /* returns the new state, never mutates s */ },
    done: function (s, p) { /* true when one run is over */ },
    duration: function (p) { /* model time of one run */ },
    values: function (s, p) { return { period: { sim: …, formula: … } }; }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = model;
  else (root.Models = root.Models || {})[model.slug] = model;
})(this);
```

- `range` declares where the claim holds when the formula is an approximation (`min`, `max` or both, on one parameter). An exact claim has no `range`. The range is physics, so it lives in the model.
- Use Verlet from `integ.js` for forces that depend on position, RK4 when the force depends on velocity.

## In the lesson

The Demo is section 5 of the lesson (see `LESSON-FORMAT.md`): a `<figure id>` in the column, after the worked example. The `<head>` adds, in this order: `demo.css` after the shared stylesheet, then `integ.js`, `demo.js`, `demo-text.js` and the model. `<html lang>` carries the learner's language; the shell formats numbers by it.

Inside the `<figure>`, one `<script type="application/json" class="demo-spec">` holds what changes from lesson to lesson, then a `<figcaption>` that says in one sentence what the canvas shows. After the `<figure>`, one script defines `draw(ctx, s, p, model)` and calls `Demo.mount(id, { model: Models['<slug>'], draw })`.

```json
{
  "id": "demo-period",
  "model": "pendulum",
  "canvas": [720, 280],
  "fixed": {},
  "params": [
    { "id": "L", "label": "String length", "symbol": "L", "unit": "m", "min": 0.25, "max": 4, "step": 0.25, "example": 1 },
    { "id": "theta0", "label": "Release angle", "symbol": "θ₀", "unit": "°", "min": 2, "max": 60, "step": 1, "example": 5 }
  ],
  "readouts": { "period": { "label": "Period", "unit": "s", "decimals": 2 } },
  "question": {
    "param": "L", "target": 4, "readout": "period",
    "text": "In the example, a 1 m string gives T = 2.01 s. With a 4 m string, released from the same angle, the period:",
    "options": [
      { "text": "doubles", "ratio": 2, "correct": true, "why": "T follows the square root of L: four times the string, twice the time." },
      { "text": "quadruples", "ratio": 4, "why": "L sits inside the root, so T grows as √L, not as L." },
      { "text": "stays the same", "ratio": 1, "why": "The angle is the same, but L is in the formula and it changed." }
    ]
  },
  "print": [1, 2, 4]
}
```

- `example` is the worked example's value for every parameter. The Demo opens on these values, and the shell's back button returns to them.
- `question` starts from the worked example and asks about one step outside it. Three qualitative options with the same word count, as in the practice quiz. `ratio` is the readout at the target divided by the readout at the example; exactly one option is `correct`. `why` is one sentence that points at the term of the formula.
- `decimals` is how many places the readout shows. Choose it, the slider limits and the model's `range` together: inside the range, simulated and formula must stay within one unit of the last place shown.
- `print` lists two or three values of the question's parameter. On paper the shell replaces canvas and controls with the question and a table of simulated and formula values at those points.
- `check` is optional: extra parameter sets the check compares with the formula, written as `[{ "L": 3, "theta0": 8 }]` with the unnamed parameters at the example. A fixed defect leaves its point here.
- The Demo's text (question, options, `why` lines, labels, caption) stays under about 80 words.

The shell does the rest: it locks the controls until the learner picks an option, plays every run in about four seconds of screen time, compares the readouts at the end of each run, gives the verdict when the asked parameter is at the target and the others at the example, flags a mismatch inside the range as a defect of the Demo, and labels a gap outside the range as part of what the Demo shows.

## Checking before delivery

Run the check on every lesson with a Demo before the lesson counts as written:

```
node assets/check-demo.js lessons/NNNN-<name>.html [--screenshot <scratch>/NNNN.png]
```

It runs the model in Node at the example, at the target, at both ends of every slider (finite values only), at every range edge combined with the other sliders' ends, and at every point in `check`. It checks that the option marked `correct` is the only one whose `ratio` matches the model, that `demo-text.js` has every key, and, when Chromium, Chrome or Edge is installed, it opens the lesson with `?check=1` and reads the result from the final DOM. Exit code 0 is a pass. Without a browser the summary reads `PASSED (level 1 only; level 2 did not run)`.

- No `node` on the machine: the lesson goes out without a Demo.
- Pass `--screenshot` when the model or `draw` is new, and look at the image.
- A failure in Closing: fix and rerun, up to two times. In Opening step 6, one time. Still failing: remove the Demo from the lesson and write one line in `NOTES.md` with the date, the chunk and the failing point.

When a file in `./assets/models/` changes, rerun the check on every lesson that loads it (`grep -l 'models/<slug>.js' lessons/`). A shell overwrite needs no recheck.

## Defects

The learner reports at Opening that the two numbers disagreed inside the range. Treat it as a bug in the Demo, not as a learning event: the learning record stays as it is, and a wrong conclusion the learner drew is corrected in chat. Reproduce the point in Node, fix the model, add the point to the `check` list of the lesson's `demo-spec`, and rerun the check on every lesson that loads the model. If the fix does not fit in Opening, remove the Demo from the lesson and restore it at Closing.
