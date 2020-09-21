import { Instruccion } from "../../Abstract/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { StringBuilder } from "../../Edd/StringBuilder";
import { TSCollector } from "../../TablaSimbolos/TSCollector";
import { R_TS } from "../../Reportes/R_TS";

export class Else extends Instruccion{
    instrucciones:Instruccion;

    constructor(instrucciones:Instruccion, fila:number, columna:number){
        super(fila,columna);
        this.instrucciones = instrucciones;
    }

    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        return this.instrucciones.ejecutar(ent,er,consola,tsCollector,reporte_ts,"local: else",padre);
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
       
        cont = this.instrucciones.getDot(builder, parent, cont);
        
        return cont;
    }

    traducir(builder: StringBuilder, parent: string) {
        return "{\n"+this.instrucciones.traducir(builder,parent)+"}\n";
    }
   
    
}