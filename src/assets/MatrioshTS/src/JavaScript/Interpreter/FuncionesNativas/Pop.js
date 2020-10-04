class Pop extends Instruccion {
    constructor(identificador, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let r = ent.GetValue(this.identificador);
        if (r != null && r.valor instanceof Arreglo) {
            let val = r.valor.popArreglo();
            return new Retorno(val, r.tipo);
        }
        return null;
    }
    getDot(builder, parent, cont) {
        //throw new Error("Method not implemented.");
        return cont;
    }
    traducir(builder, parent) {
        return this.identificador + ".pop()";
    }
}
