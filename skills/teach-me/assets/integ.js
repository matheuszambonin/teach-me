// Integrators and the synchronous runner, shared by the browser and Node.
// Classic script: sets window.Integ in the browser and module.exports in Node.
(function (root) {
  'use strict';

  var MAX_STEPS = 1e6;

  // Velocity Verlet. acc(x, v, t) returns the acceleration; x, v and a are arrays.
  function velocityVerlet(x, v, t, h, acc) {
    var a0 = acc(x, v, t);
    var x1 = x.map(function (xi, i) { return xi + v[i] * h + 0.5 * a0[i] * h * h; });
    var a1 = acc(x1, v, t + h);
    var v1 = v.map(function (vi, i) { return vi + 0.5 * (a0[i] + a1[i]) * h; });
    return { x: x1, v: v1 };
  }

  // RK4 for y' = f(y, t), when the force depends on velocity.
  function rk4(y, t, h, f) {
    function add(a, b, k) { return a.map(function (ai, i) { return ai + k * b[i]; }); }
    var k1 = f(y, t);
    var k2 = f(add(y, k1, h / 2), t + h / 2);
    var k3 = f(add(y, k2, h / 2), t + h / 2);
    var k4 = f(add(y, k3, h), t + h);
    return y.map(function (yi, i) { return yi + h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]); });
  }

  // Runs the model from start to end with the model's own fixed step.
  function run(model, p) {
    var s = model.init(p);
    var n = 0;
    while (!model.done(s, p)) {
      s = model.step(s, model.h, p);
      if (++n > MAX_STEPS) throw new Error('model ' + model.slug + ' did not finish in ' + MAX_STEPS + ' steps');
    }
    return s;
  }

  var api = { velocityVerlet: velocityVerlet, rk4: rk4, run: run };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Integ = api;
})(this);
