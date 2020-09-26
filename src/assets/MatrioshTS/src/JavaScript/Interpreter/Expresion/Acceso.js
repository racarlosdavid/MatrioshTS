class Acceso extends Expresion {
    constructor(identificador, accesos, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
        this.accesos = accesos;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let result = ent.GetValue(this.identificador);
        if (result != null) {
            let r = result.valor;
            let t = result.tipo;
            let pos;
            try {
                for (let index = 0; index < this.accesos.length; index++) {
                    if (r instanceof Arreglo) {
                        let tempo = this.accesos[index];
                        if (tempo instanceof Id) {
                            if (tempo.identificador == "length") {
                                r = r.getTamaño();
                            }
                            else {
                                let tempo = this.accesos[index].ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
                                pos = tempo.valor;
                                if (tempo.tipo == Type.NUMBER) {
                                    r = r.getValor(pos);
                                }
                                else {
                                    er.addError(new NodoError(TipoError.SEMANTICO, "Se esperaba un valor de tipo number ", this.fila, this.columna));
                                    return null;
                                }
                            }
                        }
                        else {
                            let tempo = this.accesos[index].ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
                            pos = tempo.valor;
                            if (tempo.tipo == Type.NUMBER) {
                                r = r.getValor(pos);
                            }
                            else {
                                er.addError(new NodoError(TipoError.SEMANTICO, "Se esperaba un valor de tipo number ", this.fila, this.columna));
                                return null;
                            }
                        }
                    }
                    else if (r instanceof MiType) {
                        const tempo = this.accesos[index];
                        let tempo2 = r;
                        if (tempo instanceof Id) {
                            r = tempo2.getValor(tempo.identificador);
                            t = tempo2.getTipo(tempo.identificador);
                        }
                    }
                }
            }
            catch (er) {
                console.log("error aqui en acceso " + er);
            }
            return new Retorno(r, t);
        }
        else {
            er.addError(new NodoError(TipoError.SEMANTICO, "La variable " + this.identificador + " no existe ", this.fila, this.columna));
            return null;
        }
        /*
                if (this.tipoacceso == TipoAcceso.ID) {
                    //console.log("estas haciendo un acceso de tipo ID del id "+ this.identificador);
                    if(obj!=null){
                        //Primero compruebo que la variable tenga un valor sino hay que reportar error de acceso a variable sin haber asignado un valor
                        if (obj.valor == "null") {
                            er.addError(new NodoError(TipoError.SEMANTICO,"No se puede usar la variable "+this.identificador+" sin haber asignado un valor", this.fila, this.columna));
                            return "null";
                        } else {
                            console.log(obj.valor+" "+obj.tipo)
                            return new Retorno(obj.valor,obj.tipo);
                        }
                        
                            
                    }
                    
                }
                */
        return "null";
    }
    esEntero(numero) {
        if (numero - Math.floor(numero) == 0) {
            return numero;
        }
        else {
            return Math.floor(numero);
        }
    }
    getDot(builder, parent, cont) {
        return cont;
    }
    traducir(builder) {
        return ""; //falta implementar los otros tipos de acceso
    }
}
