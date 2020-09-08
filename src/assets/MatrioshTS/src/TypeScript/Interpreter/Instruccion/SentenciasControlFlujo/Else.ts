import { Instruccion } from "../../Abstract/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { StringBuilder } from "../../Edd/StringBuilder";

export class Else extends Instruccion{
    instrucciones:Instruccion;

    constructor(instrucciones:Instruccion, fila:number, columna:number){
        super(fila,columna);
        this.instrucciones = instrucciones;
    }

    ejecutar(ent: Entorno, er: ErrorManager) {
        return this.instrucciones.ejecutar(ent,er);
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
       
        cont = this.instrucciones.getDot(builder, parent, cont);
        
        return cont;
    }

    traducir(builder: StringBuilder) {
        return "{"+this.instrucciones.traducir(builder)+"}";
    }
   
    
}