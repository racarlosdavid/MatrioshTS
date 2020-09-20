class Arreglo {
    constructor(valores, tipo) {
        this.valores = valores;
        this.tipo = tipo;
    }
    Add(valor) {
        this.valores.push(valor);
    }
    getValor(indice) {
        if (indice < this.getTamaño()) {
            return this.valores[indice];
        }
        return null;
    }
    setValor(indice, valor) {
        if (indice <= this.getTamaño()) {
            this.valores[indice] = valor;
        }
    }
    getTamaño() {
        return this.valores.length;
    }
    imprimirArreglo() {
        if (this.valores.length == 0) {
            return "[]";
        }
        let sb = new StringBuilder();
        //sb.append(valores.getFirst().toString());
        for (let t = 0; t < this.valores.length; t++) {
            let val = this.valores[t];
            if (t == 0) {
                if (val instanceof Arreglo) {
                    sb.append("[" + val.imprimirArreglo());
                }
                else {
                    sb.append("[" + val.toString());
                }
            }
            else {
                if (val instanceof Arreglo) {
                    sb.append("," + val.imprimirArreglo());
                }
                else {
                    sb.append("," + val.toString());
                }
            }
        }
        sb.append("]");
        return sb.toString();
    }
    getValores() {
        return this.valores;
    }
    setValores(valores) {
        this.valores = valores;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
}
