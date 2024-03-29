class Aritmetica extends Expresion {
    constructor(tipoOperacion, operadorIzq, operadorDer, operadorU, unario, fila, columna) {
        super(fila, columna);
        this.unario = unario;
        this.tipoOperacion = tipoOperacion;
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
        this.operadorU = operadorU;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        if (this.unario) {
            let valorUnario = (this.operadorU == null) ? null : this.operadorU.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
            switch (this.tipoOperacion) {
                case TipoOperacionAritmetica.NEGACION:
                    return this.negacion(valorUnario, er, ambito);
                //mensajes.add(new NodoError("Semantico", "No es posible la multiplicacion (1) de una variable "+getTipoLegible(valorUnario),archivo, fila, columna));
                default:
                    return null;
            }
        }
        else {
            let left = (this.operadorIzq == null) ? null : this.operadorIzq.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
            let right = (this.operadorDer == null) ? null : this.operadorDer.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
            switch (this.tipoOperacion) {
                case TipoOperacionAritmetica.SUMA:
                    return this.suma(left, right, er, ambito);
                case TipoOperacionAritmetica.RESTA:
                    return this.resta(left, right, er, ambito);
                case TipoOperacionAritmetica.MULTIPLICACION:
                    return this.multiplicacion(left, right, er, ambito);
                case TipoOperacionAritmetica.DIVISION:
                    return this.division(left, right, er, ambito);
                case TipoOperacionAritmetica.POTENCIA:
                    return this.potencia(left, right, er, ambito);
                case TipoOperacionAritmetica.MODULO:
                    return this.modulo(left, right, er, ambito);
                default:
                    return null;
            }
        }
    }
    suma(left, right, er, padre) {
        if (typeof left.valor === "number" && typeof right.valor === "number") {
            return new Retorno((left.valor + right.valor), Type.NUMBER);
        }
        else if (typeof left.valor === "string" && typeof right.valor === "number") {
            return new Retorno((left.valor + right.valor.toString()), Type.STRING);
        }
        else if (typeof left.valor === "number" && typeof right.valor === "string") {
            return new Retorno((left.valor.toString() + right.valor), Type.STRING);
        }
        else if (typeof left.valor === "string" && typeof right.valor === "boolean") {
            return new Retorno((left.valor + right.valor.toString()), Type.STRING);
        }
        else if (typeof left.valor === "boolean" && typeof right.valor === "string") {
            return new Retorno((left.valor.toString() + right.valor), Type.STRING);
        }
        else if (typeof left.valor === "string" && typeof right.valor === "string") {
            return new Retorno((left.valor + right.valor), Type.STRING);
        }
        /* Falta agregar las operaciones entre arreglos si es que se puede */
        er.addError(new NodoError(TipoError.SEMANTICO, "No es posible la suma entre " + this.getTipoToString(left.tipo) + " y " + this.getTipoToString(right.tipo), this.fila, this.columna, padre));
        return null;
    }
    resta(left, right, er, padre) {
        if (typeof left.valor === "number" && typeof right.valor === "number") {
            return new Retorno((left.valor - right.valor), Type.NUMBER);
        }
        /* Falta agregar las operaciones entre arreglos si es que se puede */
        er.addError(new NodoError(TipoError.SEMANTICO, "No es posible la resta entre " + this.getTipoToString(left.tipo) + " y " + this.getTipoToString(right.tipo), this.fila, this.columna, padre));
        return null;
    }
    multiplicacion(left, right, er, padre) {
        if (typeof left.valor === "number" && typeof right.valor === "number") {
            return new Retorno((left.valor * right.valor), Type.NUMBER);
        }
        /* Falta agregar las operaciones entre arreglos si es que se puede */
        er.addError(new NodoError(TipoError.SEMANTICO, "No es posible la multiplicacion entre " + this.getTipoToString(left.tipo) + " y " + this.getTipoToString(right.tipo), this.fila, this.columna, padre));
        return null;
    }
    division(left, right, er, padre) {
        if (typeof left.valor === "number" && typeof right.valor === "number") {
            if (right.valor == 0) {
                er.addError(new NodoError(TipoError.SEMANTICO, "No es posible la division entre 0", this.fila, this.columna, padre));
                return null;
            }
            else {
                return new Retorno((left.valor / right.valor), Type.NUMBER);
            }
        }
        /* Falta agregar las operaciones entre arreglos si es que se puede */
        er.addError(new NodoError(TipoError.SEMANTICO, "No es posible la division entre " + this.getTipoToString(left.tipo) + " y " + this.getTipoToString(right.tipo), this.fila, this.columna, padre));
        return null;
    }
    potencia(left, right, er, padre) {
        if (typeof left.valor === "number" && typeof right.valor === "number") {
            return new Retorno((Math.pow(left.valor, right.valor)), Type.NUMBER);
        }
        /* Falta agregar las operaciones entre arreglos si es que se puede */
        er.addError(new NodoError(TipoError.SEMANTICO, "No es posible la potencia entre " + this.getTipoToString(left.tipo) + " y " + this.getTipoToString(right.tipo), this.fila, this.columna, padre));
        return null;
    }
    modulo(left, right, er, padre) {
        if (typeof left.valor === "number" && typeof right.valor === "number") {
            return new Retorno((left.valor % right.valor), Type.NUMBER);
        }
        /* Falta agregar las operaciones entre arreglos si es que se puede */
        er.addError(new NodoError(TipoError.SEMANTICO, "No es posible el modulo entre " + this.getTipoToString(left.tipo) + " y " + this.getTipoToString(right.tipo), this.fila, this.columna, padre));
        return null;
    }
    negacion(unario, er, padre) {
        if (typeof unario.valor === "number") {
            return new Retorno((unario.valor * -1), Type.NUMBER);
        }
        /* Falta agregar las operaciones entre arreglos si es que se puede */
        er.addError(new NodoError(TipoError.SEMANTICO, "No es posible la negacion de " + this.getTipoToString(unario.tipo), this.fila, this.columna, padre));
        return null;
    }
    getDot(builder, parent, cont) {
        var _a, _b, _c;
        if (this.unario) {
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
        if (this.unario) {
            trad = "(" + "-" + ((_a = this.operadorU) === null || _a === void 0 ? void 0 : _a.traducir(builder)) + ")";
        }
        else {
            trad = "(" + ((_b = this.operadorIzq) === null || _b === void 0 ? void 0 : _b.traducir(builder)) + " " + this.getOperacionSimbolo(this.tipoOperacion) + " " + ((_c = this.operadorDer) === null || _c === void 0 ? void 0 : _c.traducir(builder)) + ")";
        }
        return trad;
    }
    getOperacionSimbolo(t) {
        switch (t) {
            case TipoOperacionAritmetica.SUMA:
                return "+";
            case TipoOperacionAritmetica.RESTA:
                return "-";
            case TipoOperacionAritmetica.MULTIPLICACION:
                return "*";
            case TipoOperacionAritmetica.DIVISION:
                return "/";
            case TipoOperacionAritmetica.POTENCIA:
                return "**";
            case TipoOperacionAritmetica.MODULO:
                return "%";
            default:
                return "-";
        }
    }
}
var TipoOperacionAritmetica;
(function (TipoOperacionAritmetica) {
    TipoOperacionAritmetica[TipoOperacionAritmetica["SUMA"] = 0] = "SUMA";
    TipoOperacionAritmetica[TipoOperacionAritmetica["RESTA"] = 1] = "RESTA";
    TipoOperacionAritmetica[TipoOperacionAritmetica["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    TipoOperacionAritmetica[TipoOperacionAritmetica["DIVISION"] = 3] = "DIVISION";
    TipoOperacionAritmetica[TipoOperacionAritmetica["POTENCIA"] = 4] = "POTENCIA";
    TipoOperacionAritmetica[TipoOperacionAritmetica["MODULO"] = 5] = "MODULO";
    TipoOperacionAritmetica[TipoOperacionAritmetica["NEGACION"] = 6] = "NEGACION";
})(TipoOperacionAritmetica || (TipoOperacionAritmetica = {}));
