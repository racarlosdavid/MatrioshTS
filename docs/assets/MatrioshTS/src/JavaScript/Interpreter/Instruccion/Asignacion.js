class Asignacion extends Instruccion {
    constructor(identificador, accesos, valor, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
        this.accesos = accesos;
        this.valor = valor;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let result = ent.GetValue(this.identificador);
        if (result != null) {
            if (result.tipodeclaracion == TipoDeclaracion.CONST) {
                er.addError(new NodoError(TipoError.SEMANTICO, "Asignacion no permitida la variable " + this.identificador + " es const ", this.fila, this.columna));
                return null;
            }
            else {
                let new_val = this.valor.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
                if (result.valor instanceof Arreglo) {
                    let r = result.valor;
                    let pos;
                    for (let index = 0; index < this.accesos.length; index++) {
                        const tempo = this.accesos[index].ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
                        pos = tempo.valor;
                        if (tempo.tipo == Type.NUMBER) {
                            if (index < this.accesos.length - 1) {
                                r = r.getValor(pos);
                            }
                        }
                        else {
                            er.addError(new NodoError(TipoError.SEMANTICO, "Se esperaba un valor de tipo number ", this.fila, this.columna));
                            return null;
                        }
                    }
                    if (new_val.tipo == r.tipo || new_val.tipo == Type.ARRAY || r.tipo == Type.ARRAY) {
                        r.setValor(pos, new_val.valor);
                    }
                    else {
                        er.addError(new NodoError(TipoError.SEMANTICO, "La variable \"" + this.identificador + "\" es de tipo " + this.getTipoToString(r.tipo) + " y el nuevo valor \"" + new_val.valor + "\" es de tipo " + this.getTipoToString(new_val.tipo), this.fila, this.columna));
                        return null;
                    }
                }
                else if (result.valor instanceof TypeTS) {
                }
                else {
                    if (new_val.tipo == result.tipo) {
                        console.log("·");
                        ent.ChangeValue(this.identificador, new_val.valor);
                    }
                    else {
                        er.addError(new NodoError(TipoError.SEMANTICO, "La variable \"" + this.identificador + "\" es de tipo " + this.getTipoToString(result.tipo) + " y el nuevo valor \"" + new_val.valor + "\" es de tipo " + this.getTipoToString(new_val.tipo), this.fila, this.columna));
                        return null;
                    }
                }
            }
        }
        else {
            er.addError(new NodoError(TipoError.SEMANTICO, "La variable " + this.identificador + " no existe ", this.fila, this.columna));
            return null;
        }
        return null;
    }
    getDot(builder, parent, cont) {
        console.log("Method not implemented. ASIGNACION");
        return cont;
    }
    traducir(builder, parent) {
        throw new Error("Method not implemented. ASIGNACION");
    }
}
