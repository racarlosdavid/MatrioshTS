class Pop extends Funcion {
    constructor(identificador, padre, parametros, tipoRetorno, instrucciones, fila, columna) {
        super(identificador, padre, parametros, tipoRetorno, instrucciones, fila, columna);
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let result = ent.GetValue("Nativa_Pop_Arg1");
        if (result != null) {
            let r = ent.GetValue(result.valor);
            if (r != null && r.valor instanceof Arreglo) {
                let val = r.valor.popArreglo();
                return new Retorno(val, r.tipo);
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
