import { Expresion } from "../Abstract/Expresion";
import { Retorno } from "../Abstract/Retorno";
import { StringBuilder } from "../Edd/StringBuilder";
import { ErrorManager } from "../Reportes/ErrorManager";
import { R_TS } from "../Reportes/R_TS";
import { Entorno } from "../TablaSimbolos/Entorno";
import { Type } from "../TablaSimbolos/Tipo";
import { TSCollector } from "../TablaSimbolos/TSCollector"; 


export class Null extends Expresion{

    constructor(fila:number, columna:number){
        super(fila,columna);
    }
    
    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        return new Retorno("null",Type.NULL);
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodo:string = "nodo" + ++cont;
        builder.append(nodo+" [label=\"Null\"];\n");
        builder.append(parent+" -> "+nodo+";\n");
        return cont;
    }

    traducir(builder: StringBuilder) {
        return "null"
    }

}