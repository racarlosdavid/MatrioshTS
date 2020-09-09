import { Instruccion } from "../../Abstract/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { StringBuilder } from "../../Edd/StringBuilder";

export class Continue extends Instruccion{

    constructor(fila:number, columna:number){
        super(fila,columna);
    }

    ejecutar(ent: Entorno, er: ErrorManager) {
        return this;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodo:string = "nodo" + ++cont;
        builder.append(nodo+" [label=\"Continue\"];\n");
        builder.append(parent+" -> "+nodo+";\n");
        return cont;
    }

    traducir(builder: StringBuilder) {
        return "continue;"
    }
 

}