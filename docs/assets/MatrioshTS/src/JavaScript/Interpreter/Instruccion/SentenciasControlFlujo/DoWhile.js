class DoWhile extends Instruccion {
    constructor(instrucciones, condicion, fila, columna) {
        super(fila, columna);
        this.instrucciones = instrucciones;
        this.condicion = condicion;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let rcondicion;
        do {
            let r = this.instrucciones.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
            if (r != null || r != undefined) {
                if (r instanceof Break) {
                    break;
                }
                else if (r instanceof Continue) {
                    continue;
                }
            }
            rcondicion = this.condicion.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
            if (rcondicion.tipo != Type.BOOLEAN) {
                er.addError(new NodoError(TipoError.SEMANTICO, "La condicion no es booleana", this.fila, this.columna));
                return null;
            }
        } while (rcondicion.valor);
        return null;
    }
    getDot(builder, parent, cont) {
        let nodo = "nodo" + ++cont;
        builder.append(nodo + " [label=\"Do While\"];\n");
        builder.append(parent + " -> " + nodo + ";\n");
        let nodoInstrucciones = "nodo" + ++cont;
        builder.append(nodoInstrucciones + " [label=\"Instrucciones\"];\n");
        builder.append(nodo + " -> " + nodoInstrucciones + ";\n");
        cont = this.instrucciones.getDot(builder, nodoInstrucciones, cont);
        let nodoCondicion = "nodo" + ++cont;
        builder.append(nodoCondicion + " [label=\"Condicion\"];\n");
        builder.append(nodo + " -> " + nodoCondicion + ";\n");
        cont = this.condicion.getDot(builder, nodoCondicion, cont);
        return cont;
    }
    traducir(builder, parent) {
        let trad = new StringBuilder();
        trad.append("do {\n");
        trad.append(this.instrucciones.traducir(builder, parent));
        trad.append("}(" + this.condicion.traducir(builder) + ")\n");
        return trad.toString();
    }
}
