class Literal extends Expresion {
    constructor(valor, tipo, tipoString, fila, columna) {
        super(fila, columna);
        this.valor = valor;
        this.tipo = tipo;
        this.tipoString = tipoString;
    }
    ejecutar(ent, er) {
        return new Retorno(this.valor, this.tipo);
    }
    getDot(builder, parent, cont) {
        let nodoOp = "nodo" + ++cont;
        builder.append(nodoOp + " [label=\"" + this.valor + "\"];\n");
        builder.append(parent + " -> " + nodoOp + "[color=\"red:black;0.50:red\"];\n");
        return cont;
    }
    traducir(builder) {
        if (this.tipoString == TipoString.STRING1) {
            return "\"" + this.valor.toString() + "\"";
        }
        else if (this.tipoString == TipoString.STRING2) {
            return "\'" + this.valor.toString() + "\'";
        }
        else if (this.tipoString == TipoString.STRING3) {
            return "\`" + this.valor.toString() + "\`";
        }
        return this.valor.toString();
    }
}
var TipoString;
(function (TipoString) {
    TipoString[TipoString["STRING1"] = 0] = "STRING1";
    TipoString[TipoString["STRING2"] = 1] = "STRING2";
    TipoString[TipoString["STRING3"] = 2] = "STRING3";
    TipoString[TipoString["INDEF"] = 3] = "INDEF";
})(TipoString || (TipoString = {}));
