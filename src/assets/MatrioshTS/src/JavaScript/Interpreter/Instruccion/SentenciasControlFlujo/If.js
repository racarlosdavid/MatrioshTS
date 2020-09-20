class If extends Instruccion {
    constructor(condicion, instrucciones, fila, columna) {
        super(fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    ejecutar(ent, er, consola, tsCollector) {
        let rcondicion = this.condicion.ejecutar(ent, er);
        
            if (rcondicion.tipo != Type.BOOLEAN) {
                er.addError(new NodoError(TipoError.SEMANTICO, "Se esperaba una condicional booleana en la instruccion if " + rcondicion + " no es boolean", this.fila, this.columna));
                return null;
            }
            if (rcondicion.valor == true) {
                return this.instrucciones.ejecutar(ent, er, consola, tsCollector);
            }
       
        return null;
    }
    getDot(builder, parent, cont) {
        let nodo = "nodo" + ++cont;
        builder.append(nodo + " [label=\"If\"];\n");
        builder.append(parent + " -> " + nodo + ";\n");
        let nodoCondicion = "nodo" + ++cont;
        builder.append(nodoCondicion + " [label=\"Condicion\"];\n");
        builder.append(nodo + " -> " + nodoCondicion + ";\n");
        cont = this.condicion.getDot(builder, nodoCondicion, cont);
        let nodoInstrucciones = "nodo" + ++cont;
        builder.append(nodoInstrucciones + " [label=\"Instrucciones\"];\n");
        builder.append(nodo + " -> " + nodoInstrucciones + ";\n");
        cont = this.instrucciones.getDot(builder, nodoInstrucciones, cont);
        return cont;
    }
    traducir(builder, parent) {
        return "if (" + this.condicion.traducir(builder) + ") {" + this.instrucciones.traducir(builder, parent) + "}\n";
    }
}
