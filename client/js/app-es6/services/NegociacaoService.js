import HttpService from "./HttpService";
import ConnectionFactory from "./ConnectionFactory";
import Negociacao from "../models/Negociacao";
import NegociacaoDao from "../dao/NegociacaoDao";

export default class NegociacaoService {
  constructor() {
    this._http = new HttpService();
  }

  obtemNegociacoesDaSemana() {
    return new Promise((resolve, reject) => {
      this._http
        .get("negociacoes/semana")
        .then(negociacoes => {
          resolve(negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
        })
        .catch(err => {
          console.log(err);
          reject("Erro ao importar Negociações da Semana");
        });
    });
  }

  obtemNegociacoesDaSemanaAnterior() {
    return new Promise((resolve, reject) => {
      this._http
        .get("negociacoes/anterior")
        .then(negociacoes => {
          resolve(negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
        })
        .catch(err => {
          console.log(err);
          reject("Erro ao importar Negociações da Semana Anterior");
        });
    });
  }

  obtemNegociacoesDaSemanaRetrasada() {
    return new Promise((resolve, reject) => {
      this._http
        .get("negociacoes/retrasada")
        .then(negociacoes => {
          resolve(negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
        })
        .catch(err => {
          console.log(err);
          reject("Erro ao importar Negociações da Semana retrasada");
        });
    });
  }

  obterNegociacoes() {
    return Promise.all([
      this.obtemNegociacoesDaSemana(),
      this.obtemNegociacoesDaSemanaAnterior(),
      this.obtemNegociacoesDaSemanaRetrasada(),
    ])
      .then(periodos => {
        let negociacoes = periodos.reduce((dados, periodo) => dados.concat(periodo), []);

        return negociacoes;
      })
      .catch(erro => {
        throw new Error(erro);
      });
  }

  cadastra(negociacao) {
    return ConnectionFactory.getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.adiciona(negociacao))
      .then(() => "negociação cadastrada com sucesso")
      .catch(() => {
        throw new Error("Erro ao cadastrar negociação");
      });
  }

  listaTodos() {
    return ConnectionFactory.getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.listaTodos())
      .catch(() => {
        throw new Error("Erro ao buscar negociações");
      });
  }

  apaga() {
    return ConnectionFactory.getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.apagaTodos())
      .then(() => "Negociações apagadas com sucesso")
      .catch(error => error);
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
