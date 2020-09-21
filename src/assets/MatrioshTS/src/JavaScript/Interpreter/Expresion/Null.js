class Null extends Expresion {
    constructor(fila, columna) {
        super(fila, columna);
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        return "null";
    }
    getDot(builder, parent, cont) {
        return cont;
    }
    traducir(builder) {
        return "null";
    }
}
