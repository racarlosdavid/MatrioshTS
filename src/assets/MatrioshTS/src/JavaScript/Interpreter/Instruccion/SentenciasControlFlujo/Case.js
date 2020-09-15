class Case extends Instruccion {
    constructor(condicion, instrucciones, fila, columna) {
        super(fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    ejecutar(ent, er, consola, tsCollector) {
        let nuevo = new Entorno(ent);
        for (let inst of this.instrucciones) {
            let r = inst.ejecutar(nuevo, er, consola, tsCollector);
            if (r != null) {
                if (r instanceof Continue) {
                    er.addError(new NodoError(TipoError.SEMANTICO, " Continue no es valido en switch", inst.fila, inst.columna));
                    continue;
                }
                else {
                    return r;
                }
            }
        }
        return null;
    }
    getDot(builder, parent, cont) {
        let nodo = "nodo" + ++cont;
        builder.append(nodo + " [label=\"Case\"];\n");
        builder.append(parent + " -> " + nodo + ";\n");
        let nodoCondicion = "nodo" + ++cont;
        builder.append(nodoCondicion + " [label=\"Condicion\"];\n");
        builder.append(nodo + " -> " + nodoCondicion + ";\n");
        cont = this.condicion.getDot(builder, nodoCondicion, cont);
        let nodoInstrucciones = "nodo" + ++cont;
        builder.append(nodoInstrucciones + " [label=\"Instrucciones\"];\n");
        builder.append(nodo + " -> " + nodoInstrucciones + ";\n");
        for (let instr of this.instrucciones) {
            cont = instr.getDot(builder, nodoInstrucciones, cont);
        }
        return cont;
    }
    traducir(builder, parent) {
        let trad = new StringBuilder();
        trad.append("case " + this.condicion.traducir(builder) + " : \n");
        for (let instr of this.instrucciones) {
            trad.append(instr.traducir(builder, parent));
        }
        return trad.toString();
    }
    getCondicion() {
        return this.condicion;
    }
    setCondicion(condicion) {
        this.condicion = condicion;
    }
    getInstrucciones() {
        return this.instrucciones;
    }
    setInstrucciones(instrucciones) {
        this.instrucciones = instrucciones;
    }
}
