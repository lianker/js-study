class DateHelper {
  static dataParaTexto(data) {
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }

  static textoParaData(texto) {
    if (!/\d{4}-\d{2}-\d{2}/.test(texto)) throw new Error("Deve estar no formato YYYY-MM-dd");

    return new Date(...texto.split("-").map((el, index) => el - index % 2));
  }
}
