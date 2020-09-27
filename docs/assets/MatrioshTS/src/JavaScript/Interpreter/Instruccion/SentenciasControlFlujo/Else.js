class Else extends Instruccion {
    constructor(instrucciones, fila, columna) {
        super(fila, columna);
        this.instrucciones = instrucciones;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        return this.instrucciones.ejecutar(ent, er, consola, tsCollector, reporte_ts, "local: else", ambito);
    }
    getDot(builder, parent, cont) {
        cont = this.instrucciones.getDot(builder, parent, cont);
        return cont;
    }
    traducir(builder, parent) {
        return "{\n" + this.instrucciones.traducir(builder, parent) + "}\n";
    }
}
