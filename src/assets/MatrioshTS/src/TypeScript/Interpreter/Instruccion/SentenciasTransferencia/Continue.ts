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
        throw new Error("Method not implemented.");
    }

    traducir(builder: StringBuilder) {
        throw new Error("Method not implemented.");
    }
 

}