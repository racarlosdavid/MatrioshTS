import { Instruccion } from "../Abstract/Instruccion";
export class Log extends Instruccion {
    constructor(valor, fila, columna) {
        super(fila, columna);
        this.valor = valor;
    }
    ejecutar(ent) {
        console.log("el valoor es: " + this.valor.ejecutar(ent));
    }
    getDot(builder, parent, cont) {
        throw new Error("Method not implemented.");
    }
}
