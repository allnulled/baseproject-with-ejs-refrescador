(subpath) {
  return fetch(this.fullpath(subpath), { method: "GET" }).then(response => response.text());
}