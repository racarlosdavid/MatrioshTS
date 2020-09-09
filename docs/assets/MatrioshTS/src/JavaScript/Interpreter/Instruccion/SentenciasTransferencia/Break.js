import { Instruccion } from "../../Abstract/Instruccion";
export class Break extends Instruccion {
    ejecutar(ent, er) {
        return this;
    }
    getDot(builder, parent, cont) {
        let nodo = "nodo" + ++cont;
        builder.append(nodo + " [label=\"Break\"];\n");
        builder.append(parent + " -> " + nodo + ";\n");
        return cont;
    }
    traducir(builder) {
        return "break;";
    }
}
