import { callProxy } from "./CallProxy";

export function logProxy<T extends object>(elem: T, name: string) {
  return callProxy(elem, {
    onCall: (prop, params, returnValue) => console.log(`${name}.${String(prop)}(`, params, ') =', returnValue),
    onProp: (prop, value) => console.log(`${name}.${String(prop)} =`, value),
    onSet: (prop, value) => console.log(`set ${name}.${String(prop)} =`, value),
  });
}
