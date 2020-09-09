import { Instruccion } from "../../Abstract/Instruccion";
export class Else extends Instruccion {
    constructor(instrucciones, fila, columna) {
        super(fila, columna);
        this.instrucciones = instrucciones;
    }
    ejecutar(ent, er) {
        return this.instrucciones.ejecutar(ent, er);
    }
    getDot(builder, parent, cont) {
        cont = this.instrucciones.getDot(builder, parent, cont);
        return cont;
    }
    traducir(builder) {
        return "{\n" + this.instrucciones.traducir(builder) + "}";
    }
}
