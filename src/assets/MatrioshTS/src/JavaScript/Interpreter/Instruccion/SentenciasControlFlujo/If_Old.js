class If_Old extends Instruccion {
    constructor(condicion, instrucciones, ins_else, tipo, fila, columna) {
        super(fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.ins_else = ins_else;
        this.tipo = tipo;
    }
    ejecutar(ent, er, consola, tsCollector) {
        var _a;
        let rcondicion = this.condicion.ejecutar(ent, er);
        if (rcondicion instanceof Retorno) {
            if (rcondicion.tipo != Type.BOOLEAN) {
                er.addError(new NodoError(TipoError.SEMANTICO, "Se esperaba una condicional booleana en la instruccion if " + rcondicion + " no es boolean", this.fila, this.columna));
                return null;
            }
            if (rcondicion.valor == true) {
                return this.instrucciones.ejecutar(ent, er, consola, tsCollector);
            }
            else {
                return (_a = this.ins_else) === null || _a === void 0 ? void 0 : _a.ejecutar(ent, er, consola, tsCollector);
            }
        }
        else {
            er.addError(new NodoError(TipoError.SEMANTICO, "Se esperaba una condicional booleana en la instruccion if " + rcondicion + " no es boolean", this.fila, this.columna));
        }
        return null;
    }
    getDot(builder, parent, cont) {
        if (this.tipo == TipoIf.IF) {
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
        }
        else if (this.tipo == TipoIf.IFELSEIF) {
            console.log(" if else if ");
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
            if (this.ins_else != null) {
                cont = this.ins_else.getDot(builder, nodoElse, cont);
            }
        }
        else if (this.tipo == TipoIf.IFELSE) {
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
            if (this.ins_else != null) {
                cont = this.ins_else.getDot(builder, nodoElse, cont);
            }
        }
        return cont;
    }
    traducir(builder, parent) {
        let trad;
        trad = "\n";
        return trad;
    }
    getTipoIF(t) {
        switch (t) {
            case TipoIf.IF:
                return "if";
            case TipoIf.IFELSEIF:
                return "else if";
            case TipoIf.IFELSE:
                return "else";
            default:
                return "error";
        }
    }
}
 var TipoIf;
(function (TipoIf) {
    TipoIf[TipoIf["IF"] = 0] = "IF";
    TipoIf[TipoIf["IFELSEIF"] = 1] = "IFELSEIF";
    TipoIf[TipoIf["IFELSE"] = 2] = "IFELSE";
})(TipoIf || (TipoIf = {}));
