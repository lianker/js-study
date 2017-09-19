class MensagemView extends View {
    constructor(elemento) {
        super(elemento);
    }

    template(mensagemModel) {
        debugger;
        return mensagemModel.texto ? `<p class="alert alert-info">${mensagemModel.texto}</p>` : "<p></p>";
    }
}