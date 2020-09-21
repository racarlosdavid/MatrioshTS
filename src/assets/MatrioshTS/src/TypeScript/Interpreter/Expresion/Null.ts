import { Expresion } from "../Abstract/Expresion";
import { StringBuilder } from "../Edd/StringBuilder";
import { ErrorManager } from "../Reportes/ErrorManager";
import { R_TS } from "../Reportes/R_TS";
import { Entorno } from "../TablaSimbolos/Entorno";
import { TSCollector } from "../TablaSimbolos/TSCollector";


export class Null extends Expresion{

    constructor(fila:number, columna:number){
        super(fila,columna);
    }
    
    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        return "null";
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        return cont;
    }

    traducir(builder: StringBuilder) {
        return "null"
    }

}