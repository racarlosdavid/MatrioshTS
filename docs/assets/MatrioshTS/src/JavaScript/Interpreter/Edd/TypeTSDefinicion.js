class TypeTSDefinicion extends Expresion {
    constructor(valores, fila, columna) {
        super(fila, columna);
        this.valores = valores;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        return new Retorno(this, Type.TYPE);
    }
    getDot(builder, parent, cont) {
        console.log("Method not implemented. TYPETS DEFINITION");
        return cont;
    }
    traducir(builder) {
        console.log("Method not implemented. TYPETS DEFINITION");
    }
}
