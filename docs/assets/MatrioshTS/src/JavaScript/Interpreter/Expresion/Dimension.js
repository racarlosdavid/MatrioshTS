class Dimension extends Expresion {
    constructor(expresion, fila, columna) {
        super(fila, columna);
        this.expresion = expresion;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        return this.expresion.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
    }
    getDot(builder, parent, cont) {
        return cont;
    }
    traducir(builder) {
        return this.expresion.traducir(builder);
    }
}
