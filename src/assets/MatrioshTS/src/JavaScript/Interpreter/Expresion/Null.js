class Null extends Expresion {
    constructor(fila, columna) {
        super(fila, columna);
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        return new Retorno("null", Type.NULL);
    }
    getDot(builder, parent, cont) {
        let nodo = "nodo" + ++cont;
        builder.append(nodo + " [label=\"Null\"];\n");
        builder.append(parent + " -> " + nodo + ";\n");
        return cont;
    }
    traducir(builder) {
        return "null";
    }
}
