class HttpService {
  post(url, dado) {
    return fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "post",
      body: JSON.stringify(dado),
    }).then(res => this._errorHandler(res));
  }

  get(url) {
    return fetch(url)
      .then(res => this._errorHandler(res))
      .then(res => res.json());
  }

  _errorHandler(res) {
    if (!res.ok) throw new Error(res.statusText);

    return res;
  }
}
