class Ternario extends Expresion {
    constructor(condicion, retornarTrue, retornarFalse, fila, columna) {
        super(fila, columna);
        this.condicion = condicion;
        this.retornarTrue = retornarTrue;
        this.retornarFalse = retornarFalse;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let condicional = this.condicion.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
        if (condicional.tipo != Type.BOOLEAN) {
            er.addError(new NodoError(TipoError.SEMANTICO, "Se esperaba una condicional booleana en el operador ternario", this.fila, this.columna, ambito));
        }
        else {
            if (condicional.valor == true) {
                return this.retornarTrue.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
            }
            return this.retornarFalse.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
        }
        return null;
    }
    getDot(builder, parent, cont) {
        let nodo = "nodo" + ++cont;
        builder.append(nodo + " [label=\"Expresion Ternaria\"];\n");
        builder.append(parent + " -> " + nodo + "[color=\"red:black;0.50:red\"];\n");
        cont = this.condicion.getDot(builder, nodo, cont);
        let nodoOp = "nodo" + ++cont;
        builder.append(nodoOp + " [label=\"" + "?" + "\"];\n");
        builder.append(nodo + " -> " + nodoOp + "[color=\"red:black;0.50:red\"];\n");
        cont = this.retornarTrue.getDot(builder, nodo, cont);
        let nodoOp1 = "nodo" + ++cont;
        builder.append(nodoOp1 + " [label=\"" + ":" + "\"];\n");
        builder.append(nodo + " -> " + nodoOp1 + "[color=\"red:black;0.50:red\"];\n");
        cont = this.retornarFalse.getDot(builder, nodo, cont);
        return cont;
    }
    traducir(builder) {
        return this.condicion.traducir(builder) + " ? " + this.retornarTrue.traducir(builder) + " : " + this.retornarFalse.traducir(builder);
    }
}
