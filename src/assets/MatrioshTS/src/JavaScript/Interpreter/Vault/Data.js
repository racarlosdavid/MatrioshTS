 class Data extends Instruccion {
    constructor(data, fila, columna) {
        super(fila, columna);
        this.data = data;
    }
    ejecutar(ent, er) {
        throw new Error("Method not implemented.");
    }
    getDot(builder, parent, cont) {
        throw new Error("Method not implemented.");
    }
    traducir(builder) {
        throw new Error("Method not implemented.");
    }
}
