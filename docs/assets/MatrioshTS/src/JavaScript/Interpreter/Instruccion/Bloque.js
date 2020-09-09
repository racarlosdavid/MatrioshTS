class Bloque extends Instruccion {
    constructor(instrucciones, linea, columna) {
        super(linea, columna);
        this.instrucciones = instrucciones;
    }
    ejecutar(ent, er) {
        let nuevo = new Entorno(ent);
        for (const instr of this.instrucciones) {
            try {
                const element = instr.ejecutar(nuevo, er);
                if (element != undefined || element != null)
                    return element;
            }
            catch (error) {
                er.addError(new NodoError(TipoError.SEMANTICO, "" + error + "", this.fila, this.columna));
            }
        }
        return null;
    }
    getDot(builder, parent, cont) {
        let nodo = "nodo" + ++cont;
        builder.append(nodo + " [label=\"Instrucciones\"];\n");
        builder.append(parent + " -> " + nodo + ";\n");
        for (const instr of this.instrucciones) {
            cont = instr.getDot(builder, nodo, cont);
        }
        return cont;
    }
    traducir(builder) {
        let nuevo = new StringBuilder();
        for (const instr of this.instrucciones) {
            try {
                if (instr instanceof Funcion) {
                    builder.append(instr.traducir(builder));
                }
                else {
                    nuevo.append(instr.traducir(builder) + "\n");
                }
            }
            catch (error) {
                //er.addError(new NodoError(TipoError.SEMANTICO, ""+error+"", this.fila, this.columna));
            }
        }
        return nuevo.toString();
    }
}
