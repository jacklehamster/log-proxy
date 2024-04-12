import { expect, it, describe, jest } from 'bun:test';
import { callProxy } from '.';

describe('callProxy', () => {
    it('call function with callProxy', () => {
        const onCall = jest.fn();
        const MathProxy = callProxy(Math, { onCall });
        expect(MathProxy.floor(123.5)).toEqual(123);
        expect(onCall).toBeCalledWith("floor", [123.5], 123);
    });

    it('call property with callProxy', () => {
        const onProp = jest.fn();
        const MathProxy = callProxy(Math, { onProp });
        expect(MathProxy.PI).toEqual(Math.PI);
        expect(onProp).toBeCalledWith("PI", Math.PI);
    });

    it('call set with callProxy', () => {
        const onSet = jest.fn();
        const o: any = {};
        const proxy = callProxy(o, { onSet });
        proxy.a = 123;
        expect(o.a).toEqual(123);
        expect(onSet).toBeCalledWith("a", 123, 123);
    });
});
