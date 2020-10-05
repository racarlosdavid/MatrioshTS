class Asignacion extends Instruccion {
    constructor(identificador, accesos, valor, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
        this.accesos = accesos;
        this.valor = valor;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        var _a;
        let result = ent.GetValue(this.identificador);
        if (result != null) {
            let bandera_es_arreglo_const = result.valor instanceof Arreglo ? true : false;
            let bandera_es_type_const = result.valor instanceof MiType ? true : false;
            if (result.tipodeclaracion == TipoDeclaracion.CONST && !bandera_es_arreglo_const && !bandera_es_type_const) {
                er.addError(new NodoError(TipoError.SEMANTICO, "Asignacion no permitida la variable " + this.identificador + " es const ", this.fila, this.columna, ambito));
                return null;
            }
            else {
                let new_val = this.valor.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
                if (result.valor instanceof Arreglo) {
                    if (this.accesos.length == 0 && result.tipodeclaracion == TipoDeclaracion.LET) { //Estoy asignado todo el type
                        if (new_val.tipo == result.tipo) {
                            ent.ChangeValue(this.identificador, new_val.valor);
                        }
                        else {
                            er.addError(new NodoError(TipoError.SEMANTICO, "La variable \"" + this.identificador + "\" es de tipo " + this.getTipoToString(result.tipo) + " y el nuevo valor \"" + new_val.valor + "\" es de tipo " + this.getTipoToString(new_val.tipo), this.fila, this.columna, ambito));
                            return null;
                        }
                    }
                    else if (this.accesos.length == 0 && result.tipodeclaracion == TipoDeclaracion.CONST) { //Estoy asignado todo el type
                        er.addError(new NodoError(TipoError.SEMANTICO, "La variable \"" + this.identificador + "\" es const por lo que no puede asignarse " + this.getTipoToString(new_val.tipo), this.fila, this.columna, ambito));
                        return null;
                    }
                    else {
                        if (new_val.valor == undefined) {
                            er.addError(new NodoError(TipoError.SEMANTICO, "No se puede asignar un undefined al arreglo, se va a sustituir por 0 para que no se quede trabado", this.fila, this.columna, ambito));
                            if (result.tipo == Type.NUMBER) { //Si es un arreglo de number intento recuperarme asignadole 0 al undefined
                                new_val.valor = 0;
                                new_val.tipo = Type.NUMBER;
                            }
                            if (result.tipo == Type.STRING) { //Si es un arreglo de number intento recuperarme asignadole "" al undefined
                                new_val.valor = "";
                                new_val.tipo = Type.STRING;
                            }
                        }
                        let r = result.valor;
                        let pos = null;
                        for (let index = 0; index < this.accesos.length; index++) {
                            const tempo = this.accesos[index].ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
                            pos = tempo.valor;
                            if (tempo.tipo == Type.NUMBER) {
                                if (index < this.accesos.length - 1) {
                                    r = r.getValor(pos);
                                }
                            }
                            else {
                                er.addError(new NodoError(TipoError.SEMANTICO, "Se esperaba un valor de tipo number ", this.fila, this.columna, ambito));
                                return null;
                            }
                        }
                        if (new_val.tipo == r.tipo || new_val.tipo == Type.ARRAY || r.tipo == Type.ARRAY) {
                            if (pos != null) {
                                r.setValor(pos, new_val.valor);
                            }
                            else {
                                r.setValores(new_val.valor.valores);
                            }
                        }
                        else {
                            er.addError(new NodoError(TipoError.SEMANTICO, "La variable \"" + this.identificador + "\" es de tipo " + this.getTipoToString(r.tipo) + " y el nuevo valor \"" + new_val.valor + "\" es de tipo " + this.getTipoToString(new_val.tipo), this.fila, this.columna, ambito));
                            return null;
                        }
                    }
                }
                else if (result.valor instanceof MiType || new_val.valor instanceof TypeTSDefinicion) {
                    if (typeof result.tipo == "string") {
                        if (this.accesos.length == 0 && result.tipodeclaracion != TipoDeclaracion.CONST) { //Estoy asignado todo el type
                            let bandera = true;
                            let type_estructura = ent.GetType(result.tipo);
                            let type_guardar = new_val.valor;
                            let datos_estructura = new Map();
                            let datos_guardar = new Map();
                            //Si el esqueleton del type exite puedo seguir
                            if (type_estructura != null) {
                                for (let index = 0; index < type_estructura.variables.length; index++) {
                                    const element = type_estructura.variables[index];
                                    let identificador = element.lista_identificador[0];
                                    let tipo = element.tipo;
                                    datos_estructura.set(identificador, tipo);
                                }
                                for (let index = 0; index < type_guardar.valores.length; index++) {
                                    const element = type_guardar.valores[index];
                                    let identificador = element.lista_identificador[0];
                                    let valo = (_a = element.valor) === null || _a === void 0 ? void 0 : _a.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
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
                                    er.addError(new NodoError(TipoError.SEMANTICO, "Los valores a asignar no coinciden con los valores del type ", this.fila, this.columna, ambito));
                                    return null;
                                }
                                //Si bandera es true en este momento puedo guardar los valores
                                if (bandera == true && this.accesos.length == 0) {
                                    let mi_type = new Map();
                                    for (let index = 0; index < type_estructura.variables.length; index++) {
                                        const element = type_estructura.variables[index];
                                        let ide = element.lista_identificador[0];
                                        let va = datos_guardar.get(ide);
                                        let tipo = datos_estructura.get(ide);
                                        if (va.tipo == tipo || va.tipo == Type.NULL) {
                                            mi_type.set(ide, va.valor);
                                        }
                                        else { // Error no son del mismo tipo
                                            er.addError(new NodoError(TipoError.SEMANTICO, "El tipo declarado " + this.getTipoToString(va.tipo) + " no coincide con el tipo del valor " + this.getTipoToString(tipo), this.fila, this.columna, ambito));
                                            return null;
                                        }
                                    } //Todo ok. guardo la variable
                                    ent.ChangeValue(this.identificador, new MiType(mi_type, datos_estructura));
                                }
                                else if (this.accesos.length != 0) {
                                    let r = result.valor;
                                    for (let index = 0; index < this.accesos.length; index++) {
                                        const tempo = this.accesos[index];
                                        if (tempo instanceof Id) {
                                            r = r.getValor(tempo.identificador);
                                        }
                                    }
                                }
                            }
                        }
                        else { // Estoy asignado solo un valor de type
                            let type_estructura = ent.GetType(result.tipo);
                            let datos_estructura = new Map();
                            //Si el esqueleton del type exite puedo seguir
                            if (type_estructura != null) {
                                for (let index = 0; index < type_estructura.variables.length; index++) {
                                    const element = type_estructura.variables[index];
                                    let identificador = element.lista_identificador[0];
                                    let tipo = element.tipo;
                                    datos_estructura.set(identificador, tipo);
                                }
                                let r = result.valor;
                                let t = result.tipo;
                                for (let index = 0; index < this.accesos.length; index++) {
                                    const tempo = this.accesos[index];
                                    let tempo2 = r;
                                    if (tempo instanceof Id) {
                                        r = tempo2.getValor(tempo.identificador);
                                        t = tempo2.getTipo(tempo.identificador);
                                        if (datos_estructura.has(tempo.identificador)) {
                                            if (new_val.tipo == t) {
                                                tempo2.setValor(tempo.identificador, new_val.valor);
                                            }
                                            else {
                                                er.addError(new NodoError(TipoError.SEMANTICO, "La variable \"" + tempo.identificador + "\" es de tipo " + this.getTipoToString(t) + " y el nuevo valor \"" + new_val.valor + "\" es de tipo " + this.getTipoToString(new_val.tipo), this.fila, this.columna, ambito));
                                                return null;
                                            }
                                        }
                                        else {
                                            er.addError(new NodoError(TipoError.SEMANTICO, " \"" + tempo.identificador + "\" no existe en el type " + type_estructura.identificador, this.fila, this.columna, ambito));
                                            return null;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    if (new_val.tipo == result.tipo) {
                        ent.ChangeValue(this.identificador, new_val.valor);
                    }
                    else {
                        er.addError(new NodoError(TipoError.SEMANTICO, "La variable \"" + this.identificador + "\" es de tipo " + this.getTipoToString(result.tipo) + " y el nuevo valor \"" + new_val.valor + "\" es de tipo " + this.getTipoToString(new_val.tipo), this.fila, this.columna, ambito));
                        return null;
                    }
                }
            }
        }
        else {
            er.addError(new NodoError(TipoError.SEMANTICO, "La variable " + this.identificador + " no existe ", this.fila, this.columna, ambito));
            return null;
        }
        return null;
    }
    getDot(builder, parent, cont) {
        //console.log("Method not implemented. ASIGNACION");
        return cont;
    }
    traducir(builder, parent) {
        let trad = new StringBuilder();
        if (this.accesos.length == 0) {
            trad.append(this.identificador + " = " + this.valor.traducir(builder) + ";\n");
        }
        else {
            trad.append(this.identificador);
            for (let index = 0; index < this.accesos.length; index++) {
                const element = this.accesos[index];
                if (element instanceof Llamada) {
                    trad.append(element.traducir(builder));
                }
                else if (element instanceof Id) {
                    trad.append("." + element.traducir(builder));
                }
                else {
                    trad.append("[" + element.traducir(builder) + "]");
                }
            }
            trad.append(" = " + this.valor.traducir(builder) + ";\n");
        }
        return trad.toString();
    }
}
