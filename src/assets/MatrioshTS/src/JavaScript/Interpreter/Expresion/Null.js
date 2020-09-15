 class Null extends Expresion {
    constructor(fila, columna) {
        super(fila, columna);
    }
    ejecutar(ent, er) {
        return "null";
    }
    getDot(builder, parent, cont) {
        return cont;
    }
    traducir(builder) {
        return "null";
    }
}
