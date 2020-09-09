class Log extends Instruccion {
    constructor(valor, fila, columna) {
        super(fila, columna);
        this.valor = valor;
    }
    ejecutar(ent, er) {
        let val = this.valor.ejecutar(ent, er);
        console.log(" > " + val.valor);
        return null;
    }
    getDot(builder, parent, cont) {
        return cont;
    }
    traducir(builder) {
        return "console.log(" + this.valor.traducir(builder) + ");";
    }
}
