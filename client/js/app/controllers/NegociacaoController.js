class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document);

    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");

    this._ordemAtual = "";

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($("#negociacoesView")),
      "adiciona",
      "esvazia",
      "adiciona",
      "inverteOrdem"
    );

    this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), "texto");
  }

  importaNegociacoes() {
    let negociacaoService = new NegociacaoService();

    Promise.all([
      negociacaoService.obtemNegociacoesDaSemana(),
      negociacaoService.obtemNegociacoesDaSemanaAnterior(),
      negociacaoService.obtemNegociacoesDaSemanaRetrasada(),
    ])
      .then(resultado => {
        resultado
          .reduce((negociacoes, arrNegociacoes) => negociacoes.concat(arrNegociacoes), [])
          .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        this._mensagem.texto = "Negociacoes importadas com sucesso!";
      })
      .catch(error => (this._mensagem.texto = error));
  }

  adiciona(event) {
    event.preventDefault();

    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = "Negociação adicionada com sucesso!";
    this._limpaForm();
  }

  apagaListaNegociacoes() {
    this._listaNegociacoes.esvazia();
    this._mensagem.texto = "Lista de negociações apagadas com sucesso!";
  }

  ordena(coluna) {
    if (this._ordemAtual == coluna) {
      this._listaNegociacoes.inverteOrdem();
    } else {
      this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
    }
    this._ordemAtual = coluna;
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }

  _limpaForm() {
    this._inputData.value = "";
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;
    this._inputData.focus();
  }
}
