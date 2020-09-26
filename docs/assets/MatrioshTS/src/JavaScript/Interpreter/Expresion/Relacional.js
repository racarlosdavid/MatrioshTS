class Relacional extends Expresion {
    constructor(tipoOperacion, operadorIzq, operadorDer, fila, columna, archivo) {
        super(fila, columna);
        this.tipoOperacion = tipoOperacion;
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let left = (this.operadorIzq == null) ? null : this.operadorIzq.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
        let right = (this.operadorDer == null) ? null : this.operadorDer.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
        switch (this.tipoOperacion) {
            case TipoOperacionRelacional.IGUALQUE:
                return this.igualQue(left, right, er);
            case TipoOperacionRelacional.DIFERENTE:
                return this.diferente(left, right, er);
            case TipoOperacionRelacional.MAYORQUE:
                return this.mayorQue(left, right, er);
            case TipoOperacionRelacional.MENORQUE:
                return this.menorQue(left, right, er);
            case TipoOperacionRelacional.MAYORIGUAL:
                return this.mayorIgual(left, right, er);
            case TipoOperacionRelacional.MENORIGUAL:
                return this.menorIgual(left, right, er);
            default:
                return null;
        }
    }
    igualQue(left, right, er) {
        if (typeof left.valor === "number" && typeof right.valor === "number") {
            return new Retorno((left.valor == right.valor), Type.BOOLEAN);
        }
        else if (typeof left.valor === "string" && typeof right.valor === "string") {
            return new Retorno((left.valor == right.valor), Type.BOOLEAN);
        }
        else if (typeof left.valor === "boolean" && typeof right.valor === "boolean") {
            return new Retorno((left.valor == right.valor), Type.BOOLEAN);
        }
        er.addError(new NodoError(TipoError.SEMANTICO, "No es posible la comparacion == entre " + this.getTipoToString(left.tipo) + " y " + this.getTipoToString(right.tipo), this.fila, this.columna));
        return null;
    }
    diferente(left, right, er) {
        if (typeof left.valor === "number" && typeof right.valor === "number") {
            return new Retorno((left.valor != right.valor), Type.BOOLEAN);
        }
        else if (typeof left.valor === "string" && typeof right.valor === "string") {
            return new Retorno((left.valor != right.valor), Type.BOOLEAN);
        }
        else if (typeof left.valor === "boolean" && typeof right.valor === "boolean") {
            return new Retorno((left.valor != right.valor), Type.BOOLEAN);
        }
        er.addError(new NodoError(TipoError.SEMANTICO, "No es posible la comparacion != entre " + this.getTipoToString(left.tipo) + " y " + this.getTipoToString(right.tipo), this.fila, this.columna));
        return null;
    }
    mayorQue(left, right, er) {
        //console.log(left.valor + " " + right.valor)
        if (typeof left.valor === "number" && typeof right.valor === "number") {
            return new Retorno((left.valor > right.valor), Type.BOOLEAN);
        }
        else if (typeof left.valor === "string" && typeof right.valor === "string") {
            return new Retorno((left.valor.length > left.valor.length), Type.BOOLEAN);
        }
        er.addError(new NodoError(TipoError.SEMANTICO, "No es posible la comparacion > entre " + this.getTipoToString(left.tipo) + " y " + this.getTipoToString(right.tipo), this.fila, this.columna));
        return null;
    }
    menorQue(left, right, er) {
        //console.log(left.valor + " " + right.valor)
        if (typeof left.valor === "number" && typeof right.valor === "number") {
            return new Retorno((left.valor < right.valor), Type.BOOLEAN);
        }
        else if (typeof left.valor === "string" && typeof right.valor === "string") {
            return new Retorno((left.valor.length < left.valor.length), Type.BOOLEAN);
        }
        er.addError(new NodoError(TipoError.SEMANTICO, "No es posible la comparacion < entre " + this.getTipoToString(left.tipo) + " y " + this.getTipoToString(right.tipo), this.fila, this.columna));
        return null;
    }
    mayorIgual(left, right, er) {
        if (typeof left.valor === "number" && typeof right.valor === "number") {
            return new Retorno((left.valor >= right.valor), Type.BOOLEAN);
        }
        else if (typeof left.valor === "string" && typeof right.valor === "string") {
            return new Retorno((left.valor.length >= left.valor.length), Type.BOOLEAN);
        }
        er.addError(new NodoError(TipoError.SEMANTICO, "No es posible la comparacion >= entre " + this.getTipoToString(left.tipo) + " y " + this.getTipoToString(right.tipo), this.fila, this.columna));
        return null;
    }
    menorIgual(left, right, er) {
        if (typeof left.valor === "number" && typeof right.valor === "number") {
            return new Retorno((left.valor <= right.valor), Type.BOOLEAN);
        }
        else if (typeof left.valor === "string" && typeof right.valor === "string") {
            return new Retorno((left.valor.length <= left.valor.length), Type.BOOLEAN);
        }
        er.addError(new NodoError(TipoError.SEMANTICO, "No es posible la comparacion <= entre " + this.getTipoToString(left.tipo) + " y " + this.getTipoToString(right.tipo), this.fila, this.columna));
        return null;
    }
    getDot(builder, parent, cont) {
        let nodoOp = "nodo" + ++cont;
        builder.append(nodoOp + " [label=\"" + this.getOperacionSimbolo(this.tipoOperacion) + "\"];\n");
        builder.append(parent + " -> " + nodoOp + "[color=\"red:black;0.50:red\"];\n");
        cont = this.operadorIzq.getDot(builder, nodoOp, cont);
        cont = this.operadorDer.getDot(builder, nodoOp, cont);
        return cont;
    }
    traducir(builder) {
        var _a, _b;
        return ((_a = this.operadorIzq) === null || _a === void 0 ? void 0 : _a.traducir(builder)) + " " + this.getOperacionSimbolo(this.tipoOperacion) + " " + ((_b = this.operadorDer) === null || _b === void 0 ? void 0 : _b.traducir(builder));
    }
    getOperacionSimbolo(t) {
        switch (t) {
            case TipoOperacionRelacional.DIFERENTE:
                return "!=";
            case TipoOperacionRelacional.IGUALQUE:
                return "==";
            case TipoOperacionRelacional.MAYORIGUAL:
                return ">=";
            case TipoOperacionRelacional.MAYORQUE:
                return ">";
            case TipoOperacionRelacional.MENORIGUAL:
                return "<=";
            case TipoOperacionRelacional.MENORQUE:
                return "<";
            default:
                return "null";
        }
    }
}
var TipoOperacionRelacional;
(function (TipoOperacionRelacional) {
    TipoOperacionRelacional[TipoOperacionRelacional["MAYORQUE"] = 0] = "MAYORQUE";
    TipoOperacionRelacional[TipoOperacionRelacional["MENORQUE"] = 1] = "MENORQUE";
    TipoOperacionRelacional[TipoOperacionRelacional["MAYORIGUAL"] = 2] = "MAYORIGUAL";
    TipoOperacionRelacional[TipoOperacionRelacional["MENORIGUAL"] = 3] = "MENORIGUAL";
    TipoOperacionRelacional[TipoOperacionRelacional["IGUALQUE"] = 4] = "IGUALQUE";
    TipoOperacionRelacional[TipoOperacionRelacional["DIFERENTE"] = 5] = "DIFERENTE";
})(TipoOperacionRelacional || (TipoOperacionRelacional = {}));
