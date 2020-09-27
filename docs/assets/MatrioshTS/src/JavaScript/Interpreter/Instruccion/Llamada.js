class Llamada extends Instruccion {
    constructor(identificador, argumentos, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
        this.argumentos = argumentos;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let funcion = ent.GetFuncion(this.identificador);
        //console.log(tiene_herencia+" ddddddd");
        if (funcion != null && funcion.parametros.length == this.argumentos.length) {
            let tiene_herencia = this.identificador.includes("_");
            let nuevo;
            if (tiene_herencia) {
                nuevo = new Entorno(ent);
            }
            else {
                nuevo = new Entorno(ent.GetGlobal());
            }
            //tsCollector.addTS(this.identificador,new Entorno(ent));
            if (funcion instanceof Graficar_ts) {
            }
            else {
                for (let index = 0; index < this.argumentos.length; index++) {
                    const param = funcion.parametros[index];
                    let v = this.argumentos[index].ejecutar(ent, er, consola, tsCollector, reporte_ts, this.identificador, padre);
                    if (v.tipo != param.tipo && !(this.identificador == "pop" || this.identificador == "push")) { //Si tipo del valor del parametro es igual al tipo de la variable de la funcion todo ok.
                        er.addError(new NodoError(TipoError.SEMANTICO, "El tipo del parametro " + v.tipo + " no coinciden con el tipo " + param.tipo + " de la funcion", this.fila, this.columna, this.identificador));
                        return null;
                    }
                    nuevo.Add(param.identificador, v.valor, param.tipo != null ? param.tipo : this.getElTipo(v.valor), param.dimensiones, param.tipoDeclaracion);
                }
            }
            if (funcion instanceof Graficar_ts) {
                let gra = funcion;
                gra.fila = this.fila;
                gra.columna = this.columna;
                let obj = gra.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
                if (obj != null) {
                    return obj;
                }
            }
            else if (funcion instanceof Pop || funcion instanceof Push) {
                funcion.fila = this.fila;
                funcion.columna = this.columna;
                let obj = funcion.ejecutar(nuevo, er, consola, tsCollector, reporte_ts, this.identificador, padre);
                if (obj != null) {
                    return obj;
                }
            }
            else {
                //Manager.getManager().addListaR_TS(nuevo.getReporte("global",""));
                for (const inst of funcion.instrucciones) {
                    let result = inst.ejecutar(nuevo, er, consola, tsCollector, reporte_ts, this.identificador, padre);
                    if (result != null) {
                        //Compruebo que el tipo de retorno sea igual que el tipo de retorno de la funcion
                        if (inst instanceof Llamada) {
                            //console.log("Es una llamada como instruccion no como expresion por eso no retorno nada");
                        }
                        else if (result instanceof Return) {
                            return null;
                        }
                        else if (result instanceof Break) {
                            er.addError(new NodoError(TipoError.SEMANTICO, "Break fuera de ciclo ", this.fila, this.columna, this.identificador));
                        }
                        else if ((result.tipo == funcion.tipoRetorno && funcion.tipoRetorno != Type.VOID) || funcion.tipoRetorno == null) {
                            return result;
                        }
                        else {
                            if (funcion.tipoRetorno == Type.VOID) {
                                er.addError(new NodoError(TipoError.SEMANTICO, "Una funcion tipo " + this.getTipoToString(funcion.tipoRetorno) + " no puede retornar algo. ", this.fila, this.columna, this.identificador));
                                return null;
                            }
                            else {
                                er.addError(new NodoError(TipoError.SEMANTICO, "El tipo de retorno " + this.getTipoToString(result.tipo) + " no coinciden con el tipo de retorno " + this.getTipoToString(funcion.tipoRetorno) + " de la funcion", this.fila, this.columna, this.identificador));
                                return null;
                            }
                        }
                    }
                }
            }
            reporte_ts.addLista(nuevo.getReporte(this.identificador, padre));
        }
        else {
            er.addError(new NodoError(TipoError.SEMANTICO, "Funcion " + this.identificador + " no encontrada en la tabla de simbolos", this.fila, this.columna, this.identificador));
            return null;
        }
        return null;
    }
    getDot(builder, parent, cont) {
        let nodo = "nodo" + ++cont;
        builder.append(nodo + " [label=\"Call Funcion\"];\n");
        builder.append(parent + " -> " + nodo + ";\n");
        let nodoId = "nodo" + ++cont;
        builder.append(nodoId + " [label=\"" + this.identificador + "\"];\n");
        builder.append(nodo + " -> " + nodoId + ";\n");
        let nodoParametros = "nodo" + ++cont;
        builder.append(nodoParametros + " [label=\"Argumentos\"];\n");
        builder.append(nodo + " -> " + nodoParametros + ";\n");
        for (let instr of this.argumentos) {
            cont = instr.getDot(builder, nodoParametros, cont);
        }
        return cont;
    }
    traducir(builder, parent) {
        let tempo = new StringBuilder();
        let nuevo_identificador = Manager.getManager().getFid(this.identificador);
        if (nuevo_identificador != null) {
            tempo.append(nuevo_identificador);
        }
        else {
            tempo.append(this.identificador);
        }
        // Traduccion de los parametros
        let param = new StringBuilder();
        if (this.argumentos.length == 0) {
            tempo.append("()");
        }
        else {
            tempo.append("(");
            for (let index = 0; index < this.argumentos.length; index++) {
                let element = this.argumentos[index];
                param.append(element.traducir(builder));
                if (index < this.argumentos.length - 1) {
                    param.append(",");
                }
            }
            tempo.append(param.toString());
            tempo.append(")");
        }
        // Fin
        return tempo.toString();
    }
}
