class ListaNegociacoes {
  constructor() {
    this._negociacoes = [];
  }

  get negociacoes() {
    return [].concat(this._negociacoes);
  }

  adiciona(negociacao) {
    this._negociacoes.push(negociacao);
  }

  esvazia() {
    this._negociacoes = [];
  }

  get volumeTotal() {
    return this._negociacoes.reduce((total, elemento) => total + elemento.volume, 0.0);
  }

  ordena(criterio) {
    this._negociacoes.sort(criterio);
  }

  inverteOrdem() {
    this._negociacoes.reverse();
  }
}
