class For extends Instruccion {
    constructor(inicio, condicion, actualizacion, instrucciones, fila, columna) {
        super(fila, columna);
        this.inicio = inicio;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.instrucciones = instrucciones;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let nuevo = new Entorno(ent);
        this.inicio.ejecutar(nuevo, er, consola, tsCollector, reporte_ts, "Local: For", padre);
        let condicionFor = this.condicion.ejecutar(nuevo, er, consola, tsCollector, reporte_ts, "Local: For", padre);
        if (condicionFor.tipo != Type.BOOLEAN) {
            er.addError(new NodoError(TipoError.SEMANTICO, "La condicion no es booleana", this.fila, this.columna, ambito));
            return null;
        }
        while (condicionFor.valor == true) {
            let r = this.instrucciones.ejecutar(nuevo, er, consola, tsCollector, reporte_ts, "Local: For", padre);
            if (r != null || r != undefined) {
                if (r instanceof Break) {
                    break;
                }
                else if (r instanceof Continue) {
                    this.actualizacion.ejecutar(nuevo, er, consola, tsCollector, reporte_ts, "Local: For", padre);
                    continue;
                }
            }
            this.actualizacion.ejecutar(nuevo, er, consola, tsCollector, reporte_ts, "Local: For", padre);
            condicionFor = this.condicion.ejecutar(nuevo, er, consola, tsCollector, reporte_ts, "Local: For", padre);
            if (condicionFor.tipo != Type.BOOLEAN) {
                er.addError(new NodoError(TipoError.SEMANTICO, "La condicion no es booleana", this.fila, this.columna, ambito));
                return null;
            }
        }
        reporte_ts.addLista(nuevo.getReporte("Local: For", padre));
        return null;
    }
    getDot(builder, parent, cont) {
        let nodo = "nodo" + ++cont;
        builder.append(nodo + " [label=\"For\"];\n");
        builder.append(parent + " -> " + nodo + ";\n");
        let nodoCondicion = "nodo" + ++cont;
        builder.append(nodoCondicion + " [label=\"Definicion\"];\n");
        builder.append(nodo + " -> " + nodoCondicion + ";\n");
        cont = this.inicio.getDot(builder, nodoCondicion, cont);
        cont = this.condicion.getDot(builder, nodoCondicion, cont);
        cont = this.actualizacion.getDot(builder, nodoCondicion, cont);
        let nodoInstrucciones = "nodo" + ++cont;
        builder.append(nodoInstrucciones + " [label=\"Instrucciones\"];\n");
        builder.append(nodo + " -> " + nodoInstrucciones + ";\n");
        cont = this.instrucciones.getDot(builder, nodoInstrucciones, cont);
        return cont;
    }
    traducir(builder, parent) {
        let trad = new StringBuilder();
        trad.append("for (" + this.inicio.traducir(builder, parent) + " " + this.condicion.traducir(builder) + ";" + this.actualizacion.traducir(builder, parent) + ") {\n");
        trad.append(this.instrucciones.traducir(builder, parent));
        trad.append("}\n");
        return trad.toString();
    }
}
