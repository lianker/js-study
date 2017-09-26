export default class ProxyFactory {
  static create(objeto, props, acao) {
    return new Proxy(objeto, {
      get(target, prop, receiver) {
        if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
          return function() {
            Reflect.apply(target[prop], target, arguments);
            return acao(target);
          };
        }

        return Reflect.get(target, prop, receiver);
      },

      set(target, prop, value, receiver) {
        Reflect.set(target, prop, value, receiver);
        acao(target);
        return true;
      },
    });
  }

  static _ehFuncao(fun) {
    return typeof fun == typeof Function;
  }
}
