class StringBuilder {
    constructor() {
        this.cadena = new Array();
    }
    append(valor) {
        if (valor) {
            this.cadena.push(valor);
        }
    }
    clear() {
        this.cadena.length = 0;
    }
    toString() {
        return this.cadena.join("");
    }
    get() {
        return this.cadena;
    }
}
