class NegociacaoService {

    constructor() {
        this._xhr = new XMLHttpRequest();
    }

    obtemNegociacoesDaSemana(callback) {
        this.sendGet("negociacoes/semana", callback);
    }

    obtemNegociacoesDaSemanaAnterior(callback) {
        this.sendGet("negociacoes/anterior", callback);
    }

    obtemNegociacoesDaSemanaRetrasada(callback) {
        this.sendGet("negociacoes/retrasada", callback);
    }

    sendGet(url, callback) {
        this._xhr.open("GET", url);

        this._xhr.onreadystatechange = () => {
            if (this._xhr.readyState == 4) {
                if (this._xhr.status == 200) {
                    callback(
                        null,
                        JSON.parse(this._xhr.responseText)
                        .map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor))
                    );
                } else {
                    console.log(this._xhr.responseText)
                    callback("erro na importação")
                }
            }
        }

        this._xhr.send();
    }
}

/*
xhr.readyState
0: requisição ainda não iniciada.
1: conexão com o servidor estabelecida.
2: requisição recebida.
3: processando requisição.
4: requisição concluída e a resposta esta pronta.
*/