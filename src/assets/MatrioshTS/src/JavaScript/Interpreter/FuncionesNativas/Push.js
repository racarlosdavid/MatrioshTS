class Push extends Instruccion {
    constructor(identificador, valor, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
        this.valor = valor;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let r = ent.GetValue(this.identificador);
        if (r != null && r.valor instanceof Arreglo) {
            let val = this.valor.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
            if (r.valor.getTamaño() == 0) {
                r.valor.setTipo(val.tipo);
            }
            if (val != null) {
                if ((r.tipo == val.tipo || val.valor instanceof Arreglo || r.tipo == Type.ARRAY) && r.valor != null) {
                    r.valor.Add(val.valor);
                }
                else {
                    er.addError(new NodoError(TipoError.SEMANTICO, "El tipo del arreglo " + this.getTipoToString(r.tipo) + " no coinciden con el tipo " + this.getTipoToString(val.tipo) + " del valor que se quiere agregar", this.fila, this.columna, padre));
                    return null;
                }
            }
        }
        else {
            er.addError(new NodoError(TipoError.SEMANTICO, "El arreglo " + this.identificador + " no se ha inicializado", this.fila, this.columna, padre));
        }
    }
    getDot(builder, parent, cont) {
        //console.log("Method not implemented. PUSH 2");
        return cont;
    }
    traducir(builder, parent) {
        let tempo = new StringBuilder();
        tempo.append(this.identificador + ".push(");
        tempo.append(this.valor.traducir(builder));
        tempo.append(")");
        return tempo.toString();
    }
}
