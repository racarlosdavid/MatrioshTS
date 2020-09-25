import { Expresion } from "../Abstract/Expresion";
import { Instruccion } from "../Abstract/Instruccion";
import { Retorno } from "../Abstract/Retorno";
import { Declaracion } from "../Instruccion/Declaracion";
import { ErrorManager } from "../Reportes/ErrorManager";
import { R_TS } from "../Reportes/R_TS";
import { Entorno } from "../TablaSimbolos/Entorno";
import { Type } from "../TablaSimbolos/Tipo";
import { TSCollector } from "../TablaSimbolos/TSCollector";
import { StringBuilder } from "./StringBuilder";

export class TypeTSDefinicion extends Expresion{

    valores:Array<Declaracion>;

    constructor(valores:Array<Declaracion>, fila:number, columna:number){   
        super(fila,columna);
        this.valores = valores;
    }

    ejecutar(ent: Entorno, er: ErrorManager, consola: StringBuilder, tsCollector: TSCollector, reporte_ts: R_TS, ambito: string, padre: string) {
        return new Retorno(this,Type.TYPE);
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        console.log("Method not implemented. TYPETS DEFINITION");
        return cont;
    }

    traducir(builder: StringBuilder) {
        console.log("Method not implemented. TYPETS DEFINITION");
    } 

    
}