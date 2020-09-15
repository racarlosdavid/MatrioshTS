class IfElse extends Instruccion {
    constructor(condicion, instrucciones, _else, fila, columna) {
        super(fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this._else = _else;
    }
    ejecutar(ent, er, consola, tsCollector) {
        let rcondicion = this.condicion.ejecutar(ent, er);
        if (rcondicion instanceof Retorno) {
            if (rcondicion.tipo != Type.BOOLEAN) {
                er.addError(new NodoError(TipoError.SEMANTICO, "Se esperaba una condicional booleana en la instruccion if else " + rcondicion + " no es boolean", this.fila, this.columna));
                return null;
            }
            if (rcondicion.valor == true) {
                return this.instrucciones.ejecutar(ent, er, consola, tsCollector);
            }
            else {
                return this._else.ejecutar(ent, er, consola, tsCollector);
            }
        }
        else {
            er.addError(new NodoError(TipoError.SEMANTICO, "Se esperaba una condicional booleana en la instruccion if else " + rcondicion + " no es boolean", this.fila, this.columna));
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
        cont = this.instrucciones.getDot(builder, nodo, cont);
        let nodoElse = "nodo" + ++cont;
        builder.append(nodoElse + " [label=\"Else\"];\n");
        builder.append(nodo + " -> " + nodoElse + ";\n");
        cont = this._else.getDot(builder, nodoElse, cont);
        return cont;
    }
    traducir(builder, parent) {
        return "if (" + this.condicion.traducir(builder) + ") {\n" + this.instrucciones.traducir(builder, parent) + "} else " + this._else.traducir(builder, parent);
    }
}
