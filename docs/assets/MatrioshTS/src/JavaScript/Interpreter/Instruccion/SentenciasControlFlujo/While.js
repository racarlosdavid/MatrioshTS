class While extends Instruccion {
    constructor(condicion, instrucciones, fila, columna) {
        super(fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let rcondicion = this.condicion.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
        if (rcondicion.tipo != Type.BOOLEAN) {
            er.addError(new NodoError(TipoError.SEMANTICO, "La condicion no es booleana", this.fila, this.columna));
            return null;
        }
        while (rcondicion.valor == true) {
            let r = this.instrucciones.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
            if (r != null || r != undefined) {
                if (r instanceof Break)
                    break;
                else if (r instanceof Continue)
                    continue;
            }
            rcondicion = this.condicion.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
            if (rcondicion.tipo != Type.BOOLEAN) {
                er.addError(new NodoError(TipoError.SEMANTICO, "La condicion no es booleana", this.fila, this.columna));
                return null;
            }
        }
        return null;
        /*
        let bandera:boolean=false; console.log(this.condicion.ejecutar(ent,er).valor);
        while (this.condicion.ejecutar(ent,er).valor) {
       
            if(bandera){
                bandera = false;
                continue;
            }
            let res = this.instrucciones.ejecutar(ent,er);
   
            if(res != null || res != undefined){
                console.log(res);
                if(res instanceof Break)
                    break;
                else if(res instanceof Continue)
                    continue;
            }
            
        }
        return null;
        */
    }
    getDot(builder, parent, cont) {
        throw new Error("Method not implemented. WHILE");
    }
    traducir(builder, parent) {
        throw new Error("Method not implemented. WHILE");
    }
}
