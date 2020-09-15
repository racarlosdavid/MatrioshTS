 class Default extends Instruccion {
    constructor(instrucciones, fila, columna) {
        super(fila, columna);
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
        builder.append(nodo + " [label=\"Default\"];\n");
        builder.append(parent + " -> " + nodo + ";\n");
        for (let instr of this.instrucciones) {
            cont = instr.getDot(builder, nodo, cont);
        }
        return cont;
    }
    traducir(builder, parent) {
        let trad = new StringBuilder();
        trad.append("default : \n");
        for (let instr of this.instrucciones) {
            trad.append(instr.traducir(builder, parent));
        }
        return trad.toString();
    }
}
