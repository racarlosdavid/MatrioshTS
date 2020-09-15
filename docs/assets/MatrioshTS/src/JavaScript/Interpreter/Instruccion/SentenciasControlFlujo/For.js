class For extends Instruccion {
    /*
    private inicio:Declaracion | Asignacion;
    private condicion:Expresion;
    private fin:Asignacion | Expresion;
    private instrucciones:Instruccion;

    constructor(inicio:Declaracion | Asignacion, condicion:Expresion, fin:Asignacion | Expresion, instrucciones:Array<Instruccion>, fila:number, columna:number, archivo:string) {
        super(fila,columna,archivo);
        this.inicio = inicio;
        this.condicion = condicion;
        this.fin = fin;
        this.instrucciones = instrucciones;
    }
    */
    ejecutar(ent, er, consola, tsCollector) {
        throw new Error("Method not implemented.");
    }
    getDot(builder, parent, cont) {
        throw new Error("Method not implemented.");
    }
    traducir(builder, parent) {
        throw new Error("Method not implemented.");
    }
}
