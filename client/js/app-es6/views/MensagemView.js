import View from "./View";

export default class MensagemView extends View {
  constructor(elemento) {
    super(elemento);
  }

  template(mensagemModel) {
    return mensagemModel.texto ? `<p class="alert alert-info">${mensagemModel.texto}</p>` : "<p></p>";
  }
}
