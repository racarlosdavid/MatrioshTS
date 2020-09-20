class Acceso extends Expresion {
    constructor(identificador, accesos, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
        this.accesos = accesos;
    }
    ejecutar(ent, er) {
        let result = ent.GetValue(this.identificador);
        if (result != null) {
            if (result.valor instanceof Arreglo) {
                let r = result.valor;
                let pos;
                for (let index = 0; index < this.accesos.length; index++) {
                    const tempo = this.accesos[index].ejecutar(ent, er);
                    pos = tempo.valor;
                    if (tempo.tipo == Type.NUMBER) {
                        r = r.getValor(pos);
                    }
                    else {
                        er.addError(new NodoError(TipoError.SEMANTICO, "Se esperaba un valor de tipo number ", this.fila, this.columna));
                        return null;
                    }
                }
                return new Retorno(r, result.tipo);
            }
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
    getDot(builder, parent, cont) {
        return cont;
    }
    traducir(builder) {
        return ""; //falta implementar los otros tipos de acceso
    }
}
