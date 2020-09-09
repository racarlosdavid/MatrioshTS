import { Instruccion } from "../../Abstract/Instruccion";
export class Continue extends Instruccion {
    constructor(fila, columna) {
        super(fila, columna);
    }
    ejecutar(ent, er) {
        return this;
    }
    getDot(builder, parent, cont) {
        let nodo = "nodo" + ++cont;
        builder.append(nodo + " [label=\"Continue\"];\n");
        builder.append(parent + " -> " + nodo + ";\n");
        return cont;
    }
    traducir(builder) {
        return "continue;";
    }
}
