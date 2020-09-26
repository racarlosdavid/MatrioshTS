class Declaracion extends Instruccion {
    constructor(tipoDeclaracion, identificador, tipo, dimensiones, valor, fila, columna) {
        super(fila, columna);
        this.tipoDeclaracion = tipoDeclaracion;
        this.identificador = identificador;
        this.tipo = tipo;
        this.dimensiones = dimensiones;
        this.valor = valor;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        var _a, _b;
        try {
            if (!ent.Existe(this.identificador)) { //Verifico que la variable no exista en el entorno actual
                //if (this.tipoDeclaracion == TipoDeclaracion.LET) {
                if (this.valor != null) { // Si la variable esta inicializada entra a este if, 
                    let val = (_a = this.valor) === null || _a === void 0 ? void 0 : _a.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
                    if (this.tipo != null) { // Si se declaron con un tipo hay que comprobar que el valor sea del mismo tipo
                        if (this.tipo == val.tipo || val.tipo == Type.ARRAY || val.tipo == Type.TYPE || val.tipo == Type.NULL) { // Ok. se guarda en la TS
                            if (val.valor instanceof Arreglo) {
                                let tempo = val.valor;
                                tempo.setTipo(this.tipo);
                                //console.log(tempo.tipo + " ss "+ val.valor + " el tamaño del array es "+tempo.getTamaño())
                                ent.Add(this.identificador, tempo, this.tipo, tempo.getTamaño(), this.tipoDeclaracion);
                            }
                            else if (val.valor instanceof TypeTSDefinicion) {
                                if (typeof this.tipo == "string") {
                                    let bandera = true;
                                    let type_estructura = ent.GetType(this.tipo);
                                    let type_guardar = val.valor;
                                    let datos_estructura = new Map();
                                    let datos_guardar = new Map();
                                    //Si el esqueleton del type exite puedo seguir
                                    if (type_estructura != null) {
                                        for (let index = 0; index < type_estructura.variables.length; index++) {
                                            const element = type_estructura.variables[index];
                                            let identificador = element.identificador;
                                            let tipo = element.tipo;
                                            datos_estructura.set(identificador, tipo);
                                        }
                                        for (let index = 0; index < type_guardar.valores.length; index++) {
                                            const element = type_guardar.valores[index];
                                            let identificador = element.identificador;
                                            let valo = (_b = element.valor) === null || _b === void 0 ? void 0 : _b.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
                                            datos_guardar.set(identificador, valo);
                                        }
                                        // verifico que los los dos contengas los mismos ids
                                        if (datos_estructura.size == datos_guardar.size) {
                                            datos_estructura.forEach(function (v, clave) {
                                                if (!datos_guardar.has(clave)) {
                                                    bandera = false;
                                                }
                                            });
                                        }
                                        else {
                                            er.addError(new NodoError(TipoError.SEMANTICO, "Los valores a asignar no coinciden con los valores del type ", this.fila, this.columna));
                                            return null;
                                        }
                                        //Si bandera es true en este momento puedo guardar los valores
                                        if (bandera == true) {
                                            let mi_type = new Map();
                                            for (let index = 0; index < type_estructura.variables.length; index++) {
                                                const element = type_estructura.variables[index];
                                                let ide = element.identificador;
                                                let va = datos_guardar.get(ide);
                                                let tipo = datos_estructura.get(ide);
                                                if (va.tipo == tipo || va.tipo == Type.NULL) {
                                                    mi_type.set(ide, va.valor);
                                                }
                                                else { // Error no son del mismo tipo
                                                    er.addError(new NodoError(TipoError.SEMANTICO, "El tipo declarado " + this.getTipoToString(va.tipo) + " no coincide con el tipo del valor " + this.getTipoToString(tipo), this.fila, this.columna));
                                                    return null;
                                                }
                                            } //Todo ok. guardo la variable
                                            ent.Add(this.identificador, new MiType(mi_type, datos_estructura), this.tipo, this.dimensiones, this.tipoDeclaracion);
                                        }
                                    }
                                }
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
        catch (er) {
            console.log("error aqui en declaracion");
        }
    }
    getDot(builder, parent, cont) {
        let nodo = "nodo" + ++cont;
        builder.append(nodo + " [label=\"Declaracion\"];\n");
        builder.append(parent + " -> " + nodo + ";\n");
        let nodoVal = "nodo" + ++cont;
        builder.append(nodoVal + " [label=\"" + this.identificador + "\"];\n");
        builder.append(nodo + " -> " + nodoVal + ";\n");
        if (this.valor != null) {
            cont = this.valor.getDot(builder, nodo, cont);
        }
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
    TipoDeclaracion[TipoDeclaracion["TYPEVAL"] = 3] = "TYPEVAL";
})(TipoDeclaracion || (TipoDeclaracion = {}));
