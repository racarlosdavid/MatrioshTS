class For extends Instruccion {
    constructor(inicio, condicion, actualizacion, instrucciones, fila, columna) {
        super(fila, columna);
        this.inicio = inicio;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.instrucciones = instrucciones;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let nuevo = new Entorno(ent);
        this.inicio.ejecutar(nuevo, er, consola, tsCollector, reporte_ts, ambito, padre);
        let condicionFor = this.condicion.ejecutar(nuevo, er, consola, tsCollector, reporte_ts, ambito, padre);
        if (condicionFor.tipo != Type.BOOLEAN) {
            er.addError(new NodoError(TipoError.SEMANTICO, "La condicion no es booleana", this.fila, this.columna));
            return null;
        }
        while (condicionFor.valor == true) {
            let r = this.instrucciones.ejecutar(nuevo, er, consola, tsCollector, reporte_ts, ambito, padre);
            if (r != null || r != undefined) {
                if (r instanceof Break) {
                    break;
                }
                else if (r instanceof Continue) {
                    this.actualizacion.ejecutar(nuevo, er, consola, tsCollector, reporte_ts, ambito, padre);
                    continue;
                }
            }
            this.actualizacion.ejecutar(nuevo, er, consola, tsCollector, reporte_ts, ambito, padre);
            condicionFor = this.condicion.ejecutar(nuevo, er, consola, tsCollector, reporte_ts, ambito, padre);
            if (condicionFor.tipo != Type.BOOLEAN) {
                er.addError(new NodoError(TipoError.SEMANTICO, "La condicion no es booleana", this.fila, this.columna));
                return null;
            }
        }
        return null;
    }
    getDot(builder, parent, cont) {
        console.log("Method not implemented. FOR");
        return cont;
    }
    traducir(builder, parent) {
        console.log("Method not implemented.FOR ");
    }
}
