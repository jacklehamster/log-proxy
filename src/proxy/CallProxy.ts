interface Props {
  onCall?: (prop: string | symbol, params: any[], returnValue: any) => void;
  onProp?: (prop: string | symbol, value: any) => void;
  onSet?: (prop: string | symbol, value: any, result: any) => void;
}

export function callProxy<T extends object>(elem: T, {
  onCall,
  onProp,
  onSet,
}: Props) {
  const proxy = new Proxy<T>(elem, {
    get(target, prop) {
      const t = target as any;
      const result = t[prop];
      if (typeof result === 'function') {
        const f = (...params: any[]) => {
          const returnValue = result.apply(t, params);
          onCall?.(prop, params, returnValue);
          return returnValue;
        };
        return f;
      } else {
        onProp?.(prop, result);
        return result;
      }
    },
    set(target, prop, newValue) {
      const t = target as any;
      const result = t[prop] = newValue;
      onSet?.(prop, newValue, result);
      return newValue === result;
    }
  });
  return proxy;
}
