import { Instruccion } from "../../Abstract/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { StringBuilder } from "../../Edd/StringBuilder";

export class Break extends Instruccion{

    ejecutar(ent: Entorno, er: ErrorManager) {
        return this;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodo:string = "nodo" + ++cont;
        builder.append(nodo+" [label=\"Break\"];\n");
        builder.append(parent+" -> "+nodo+";\n");
        return cont;
    }

    traducir(builder: StringBuilder) {
        return "break;\n"
    }
    

}