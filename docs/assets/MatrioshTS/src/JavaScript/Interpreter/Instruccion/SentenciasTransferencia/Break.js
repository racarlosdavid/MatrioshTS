class Break extends Instruccion {
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        return this;
    }
    getDot(builder, parent, cont) {
        let nodo = "nodo" + ++cont;
        builder.append(nodo + " [label=\"Break\"];\n");
        builder.append(parent + " -> " + nodo + ";\n");
        return cont;
    }
    traducir(builder, parent) {
        return "break;\n";
    }
}
