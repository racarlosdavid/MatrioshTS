import { Instruccion } from "../../Abstract/Instruccion";
export class Return extends Instruccion {
    constructor(valor, fila, columna) {
        super(fila, columna);
        this.valor = valor;
    }
    ejecutar(ent, er) {
        return this.valor.ejecutar(ent, er);
    }
    getDot(builder, parent, cont) {
        throw new Error("Method not implemented.");
    }
    traducir(builder) {
        return "return " + this.valor.traducir(builder) + ";\n";
    }
}
