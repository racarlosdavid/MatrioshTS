import { Expresion } from "../Abstract/Expresion";
import { Retorno } from "../Abstract/Retorno";
import { MiType } from "../Edd/MiType";
import { StringBuilder } from "../Edd/StringBuilder";
import { ErrorManager } from "../Reportes/ErrorManager";
import { NodoError, TipoError } from "../Reportes/NodoError";
import { R_TS } from "../Reportes/R_TS";
import { Entorno } from "../TablaSimbolos/Entorno";
import { Simbolo } from "../TablaSimbolos/Simbolo";
import { TSCollector } from "../TablaSimbolos/TSCollector";

export class Dimension extends Expresion{
    expresion:Expresion;

    constructor(expresion:Expresion, fila:number, columna:number) {   
        super(fila,columna);
        this.expresion = expresion;
    }

    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        return this.expresion.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodoId:string = "nodo" + ++cont;
        builder.append(nodoId+" [label=\""+this.expresion+"\"];\n");
        builder.append(parent+" -> "+nodoId+"[color=\"red:black;0.50:red\"];\n");
        return cont;
    }

    traducir(builder: StringBuilder) {
        return this.expresion.traducir(builder);
    }
    
}