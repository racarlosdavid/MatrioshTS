 class Return extends Instruccion {
    constructor(valor, fila, columna) {
        super(fila, columna);
        this.valor = valor;
    }
    ejecutar(ent, er, consola, tsCollector) {
        return this.valor.ejecutar(ent, er);
    }
    getDot(builder, parent, cont) {
        let nodo = "nodo" + ++cont;
        builder.append(nodo + " [label=\"Return\"];\n");
        builder.append(parent + " -> " + nodo + ";\n");
        cont = this.valor.getDot(builder, nodo, cont);
        return cont;
    }
    traducir(builder, parent) {
        return "return " + this.valor.traducir(builder) + ";\n";
    }
}
