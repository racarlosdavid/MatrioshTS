 class Logica extends Expresion {
    constructor(tipoOperacion, operadorIzq, operadorDer, operadorU, not, fila, columna) {
        super(fila, columna);
        this.tipoOperacion = tipoOperacion;
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
        this.operadorU = operadorU;
        this.not = not;
    }
    ejecutar(ent, er) {
        if (this.not) {
            let valorUnario = (this.operadorU == null) ? null : this.operadorU.ejecutar(ent, er);
            switch (this.tipoOperacion) {
                case TipoOperacionLogica.NOT:
                    return this.notOperacion(valorUnario, ent, er);
                default:
                    return null;
            }
        }
        else {
            let left = (this.operadorIzq == null) ? null : this.operadorIzq.ejecutar(ent, er);
            let right = (this.operadorDer == null) ? null : this.operadorDer.ejecutar(ent, er);
            switch (this.tipoOperacion) {
                case TipoOperacionLogica.AND:
                    return this.and(left, right, ent, er);
                case TipoOperacionLogica.OR:
                    return this.or(left, right, ent, er);
                default:
                    return null;
            }
        }
    }
    and(left, right, ent, er) {
        let tipoResultante = this.getTipoResultante(left.tipo, right.tipo);
        if (tipoResultante == Type.BOOLEAN) {
            return new Retorno((left.valor && right.valor), tipoResultante);
        }
        er.addError(new NodoError(TipoError.SEMANTICO, "No es posible el and entre " + this.getTipoToString(left.tipo) + " y " + this.getTipoToString(right.tipo), this.fila, this.columna));
        return null;
    }
    or(left, right, ent, er) {
        let tipoResultante = this.getTipoResultante(left.tipo, right.tipo);
        if (tipoResultante == Type.BOOLEAN) {
            return new Retorno((left.valor || right.valor), tipoResultante);
        }
        er.addError(new NodoError(TipoError.SEMANTICO, "No es posible el or entre " + this.getTipoToString(left.tipo) + " y " + this.getTipoToString(right.tipo), this.fila, this.columna));
        return null;
    }
    notOperacion(unario, ent, er) {
        if (unario.tipo == Type.BOOLEAN) {
            return new Retorno(!(unario.valor), unario.tipo);
        }
        er.addError(new NodoError(TipoError.SEMANTICO, "No es posible realizar not de " + this.getTipoToString(unario.tipo), this.fila, this.columna));
        return null;
    }
    getDot(builder, parent, cont) {
        var _a, _b, _c;
        if (this.not) {
            let nodoOp = "nodo" + ++cont;
            builder.append(nodoOp + " [label=\"" + this.getOperacionSimbolo(this.tipoOperacion) + "\"];\n");
            builder.append(parent + " -> " + nodoOp + ";\n");
            if (this.operadorU != null) {
                cont = (_a = this.operadorU) === null || _a === void 0 ? void 0 : _a.getDot(builder, nodoOp, cont);
            }
        }
        else {
            let nodoOp = "nodo" + ++cont;
            builder.append(nodoOp + " [label=\"" + this.getOperacionSimbolo(this.tipoOperacion) + "\"];\n");
            builder.append(parent + " -> " + nodoOp + ";\n");
            if (this.operadorIzq != null && this.operadorDer != null) {
                cont = (_b = this.operadorIzq) === null || _b === void 0 ? void 0 : _b.getDot(builder, nodoOp, cont);
                cont = (_c = this.operadorDer) === null || _c === void 0 ? void 0 : _c.getDot(builder, nodoOp, cont);
            }
        }
        return cont;
    }
    traducir(builder) {
        var _a, _b, _c;
        let trad;
        if (this.not) {
            trad = "-" + ((_a = this.operadorU) === null || _a === void 0 ? void 0 : _a.traducir(builder));
        }
        else {
            trad = ((_b = this.operadorIzq) === null || _b === void 0 ? void 0 : _b.traducir(builder)) + " " + this.getOperacionSimbolo(this.tipoOperacion) + " " + ((_c = this.operadorDer) === null || _c === void 0 ? void 0 : _c.traducir(builder));
        }
        return trad;
    }
    getOperacionSimbolo(t) {
        switch (t) {
            case TipoOperacionLogica.AND:
                return "&&";
            case TipoOperacionLogica.OR:
                return "||";
            case TipoOperacionLogica.NOT:
                return "!";
            default:
                return "!";
        }
    }
}
 var TipoOperacionLogica;
(function (TipoOperacionLogica) {
    TipoOperacionLogica[TipoOperacionLogica["AND"] = 0] = "AND";
    TipoOperacionLogica[TipoOperacionLogica["OR"] = 1] = "OR";
    TipoOperacionLogica[TipoOperacionLogica["NOT"] = 2] = "NOT";
})(TipoOperacionLogica || (TipoOperacionLogica = {}));
