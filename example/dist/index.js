// /Users/vincent/log-proxy/example/node_modules/log-proxy/dist/index.js
var z = function(j, { onCall: h, onProp: i, onSet: c }) {
  return new Proxy(j, { get(k, b) {
    const d = k, f = d[b];
    if (typeof f === "function")
      return (...B) => {
        const D = f.apply(d, B);
        return h?.(b, B, D), D;
      };
    else
      return i?.(b, f), f;
  }, set(k, b, d) {
    const f = k, q = f[b] = d;
    return c?.(b, d, q), d === q;
  } });
};
var E = function(j, h) {
  return z(j, { onCall: (i, c, A) => console.log(`${h}.${String(i)}(`, c, ") =", A), onProp: (i, c) => console.log(`${h}.${String(i)} =`, c), onSet: (i, c) => console.log(`set ${h}.${String(i)} =`, c) });
};
export {
  E as logProxy
};
