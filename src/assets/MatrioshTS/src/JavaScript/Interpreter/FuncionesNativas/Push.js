class Push extends Funcion {
    constructor(identificador, padre, parametros, tipoRetorno, instrucciones, fila, columna) {
        super(identificador, padre, parametros, tipoRetorno, instrucciones, fila, columna);
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let val = ent.GetValue("Nativa_Push_Arg1");
        let id = ent.GetValue("Nativa_Push_Arg2");
        if (id != null) {
            let r = ent.GetValue(id.valor);
            if (r != null && r.valor instanceof Arreglo) {
                if (val != null) {
                    if ((r.tipo == val.tipo || val.valor instanceof Arreglo) && r.valor != null) {
                        r.valor.Add(val.valor);
                    }
                    else {
                        er.addError(new NodoError(TipoError.SEMANTICO, "El tipo del arreglo " + this.getTipoToString(r.tipo) + " no coinciden con el tipo " + this.getTipoToString(val.tipo) + " del valor que se quiere agregar", this.fila, this.columna, padre));
                        return null;
                    }
                }
            }
            else {
                er.addError(new NodoError(TipoError.SEMANTICO, "El arreglo " + id.valor + " no se ha inicializado", this.fila, this.columna, padre));
            }
        }
        return null;
    }
    getDot(builder, parent, cont) {
        return cont;
    }
    traducir(builder, parent) {
        return "";
    }
}
