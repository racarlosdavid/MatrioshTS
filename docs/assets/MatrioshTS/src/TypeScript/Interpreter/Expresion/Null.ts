import { Expresion } from "../Abstract/Expresion";
import { StringBuilder } from "../Edd/StringBuilder";
import { ErrorManager } from "../Reportes/ErrorManager";
import { Entorno } from "../TablaSimbolos/Entorno";


export class Null extends Expresion{

    constructor(fila:number, columna:number){
        super(fila,columna);
    }
    
    ejecutar(ent: Entorno, er: ErrorManager) {
        return "null";
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        return cont;
    }

    traducir(builder: StringBuilder) {
        return "null"
    }

}