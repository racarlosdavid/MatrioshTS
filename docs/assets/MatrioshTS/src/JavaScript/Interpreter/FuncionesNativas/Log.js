class Log extends Instruccion {
    constructor(valor, fila, columna) {
        super(fila, columna);
        this.valor = valor;
    }
    ejecutar(ent, er, consola, tsCollector) {
        let val = this.valor.ejecutar(ent, er);
        consola.append(" > " + val.valor);
        return null;
    }
    getDot(builder, parent, cont) {
        console.log("getDot de Log no esta implementado solo retorna el cont para que no de error");
        return cont;
    }
    traducir(builder, parent) {
        return "console.log(" + this.valor.traducir(builder) + ");\n";
    }
}
