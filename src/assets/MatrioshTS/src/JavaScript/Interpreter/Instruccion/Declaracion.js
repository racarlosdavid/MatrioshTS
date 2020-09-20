class Declaracion extends Instruccion {
    constructor(tipoDeclaracion, identificador, tipo, dimensiones, valor, fila, columna) {
        super(fila, columna);
        this.tipoDeclaracion = tipoDeclaracion;
        this.identificador = identificador;
        this.tipo = tipo;
        this.dimensiones = dimensiones;
        this.valor = valor;
    }
    ejecutar(ent, er, consola, tsCollector) {
        var _a;
        if (!ent.Existe(this.identificador)) {
            //if (this.tipoDeclaracion == TipoDeclaracion.LET) {
            if (this.valor != null) { // Si la variable esta inicializada entra a este if, 
                let val = (_a = this.valor) === null || _a === void 0 ? void 0 : _a.ejecutar(ent, er);
                if (this.tipo != null) { // Si se declaron con un tipo hay que comprobar que el valor sea del mismo tipo
                    if (this.tipo == val.tipo || val.tipo == Type.ARRAY) { // Ok. se guarda en la TS
                        if (val.valor instanceof Arreglo) {
                            let tempo = val.valor;
                            tempo.setTipo(this.tipo);
                            //console.log(tempo.tipo + " ss "+ val.valor + " el tamaño del array es "+tempo.getTamaño())
                            ent.Add(this.identificador, tempo, this.tipo, tempo.getTamaño(), this.tipoDeclaracion);
                        }
                        else {
                            ent.Add(this.identificador, val.valor, this.tipo, this.dimensiones, this.tipoDeclaracion);
                        }
                    }
                    else { // Error no son del mismo tipo
                        er.addError(new NodoError(TipoError.SEMANTICO, "El tipo declarado " + this.getTipoToString(this.tipo) + " no coincide con el tipo del valor " + this.getTipoToString(val.tipo), this.fila, this.columna));
                        return null;
                    }
                }
                else { // No se declaro con tipo
                    ent.Add(this.identificador, val.valor, val.tipo, this.dimensiones, this.tipoDeclaracion);
                }
            }
            else { // Si la variable no esta inicializada entra aqui
                if (this.tipo != null) {
                    ent.Add(this.identificador, "null", this.tipo, this.dimensiones, this.tipoDeclaracion);
                }
                else {
                    ent.Add(this.identificador, "null", Type.INDEF, this.dimensiones, this.tipoDeclaracion);
                }
            }
        }
        else {
            er.addError(new NodoError(TipoError.SEMANTICO, "La variable " + this.identificador + " ya exite en este entorno", this.fila, this.columna));
            return null;
        }
        return null;
    }
    getDot(builder, parent, cont) {
        return cont;
    }
    traducir(builder, parent) {
        let trad = "";
        if (this.tipoDeclaracion == TipoDeclaracion.PARAM) {
            trad += this.identificador + ":" + this.getTipoToString(this.tipo);
        }
        else if (this.tipoDeclaracion == TipoDeclaracion.LET) {
            trad += "let " + this.identificador;
            if (this.tipo != null) {
                trad += ":" + this.getTipoToString(this.tipo);
                if (this.dimensiones != 0) {
                    for (let i = 0; i < this.dimensiones; i++) {
                        trad += "[]";
                    }
                }
            }
            if (this.valor != null) {
                trad += " = " + this.valor.traducir(builder);
            }
            trad += ";\n";
        }
        else if (this.tipoDeclaracion == TipoDeclaracion.CONST) {
            trad += "const " + this.identificador;
            if (this.tipo != null) {
                trad += ":" + this.getTipoToString(this.tipo);
                if (this.dimensiones != 0) {
                    for (let i = 0; i < this.dimensiones; i++) {
                        trad += " [] ";
                    }
                }
            }
            if (this.valor != null) {
                trad += " = " + this.valor.traducir(builder);
            }
            trad += ";\n";
        }
        return trad;
    }
}
 var TipoDeclaracion;
(function (TipoDeclaracion) {
    TipoDeclaracion[TipoDeclaracion["LET"] = 0] = "LET";
    TipoDeclaracion[TipoDeclaracion["CONST"] = 1] = "CONST";
    TipoDeclaracion[TipoDeclaracion["PARAM"] = 2] = "PARAM";
})(TipoDeclaracion || (TipoDeclaracion = {}));
