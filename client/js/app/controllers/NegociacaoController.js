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
    this._service = new NegociacaoService();
    this._init();
  }

  _init() {
    this._service
      .listaTodos()
      .then(negociacoes => {
        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        this._mensagem.texto = "Negociações prontas!";
      })
      .catch(msg => (this._mensagem.texto = msg));

    setInterval(this.importaNegociacoes.bind(this), 5000);
  }

  importaNegociacoes() {
    this._service
      .obterNegociacoes()
      .then(negociacoes =>
        negociacoes.filter(
          negociacao =>
            !this._listaNegociacoes.negociacoes.some(
              negociacaoExistente => JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)
            )
        )
      )
      .then(negociacoes => {
        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

        this._mensagem.texto = "Negociacoes importadas com sucesso!";
      })
      .catch(error => (this._mensagem.texto = error));
  }

  adiciona(event) {
    event.preventDefault();
    let negociacao = this._criaNegociacao();

    this._service
      .cadastra(negociacao)
      .then(mensagem => {
        this._listaNegociacoes.adiciona(negociacao);
        this._mensagem.texto = mensagem;
        this._limpaForm();
      })
      .catch(mensagemErro => (this._mensagem.texto = mensagemErro));
  }

  apagaListaNegociacoes() {
    this._service
      .apaga()
      .then(mensagem => {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = mensagem;
      })
      .catch(msgErro => (this._mensagem.texto = msgErro));
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
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    );
  }

  _limpaForm() {
    this._inputData.value = "";
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;
    this._inputData.focus();
  }
}
