class Return extends Instruccion {
    constructor(valor, fila, columna) {
        super(fila, columna);
        this.valor = valor;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        if (this.valor != null) {
            return this.valor.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
        }
        else {
            return this;
        }
    }
    getDot(builder, parent, cont) {
        let nodo = "nodo" + ++cont;
        builder.append(nodo + " [label=\"Return\"];\n");
        builder.append(parent + " -> " + nodo + ";\n");
        if (this.valor != null) {
            cont = this.valor.getDot(builder, nodo, cont);
        }
        return cont;
    }
    traducir(builder, parent) {
        if (this.valor != null) {
            return "return " + this.valor.traducir(builder) + ";\n";
        }
        else {
            return "return ;\n";
        }
    }
}
