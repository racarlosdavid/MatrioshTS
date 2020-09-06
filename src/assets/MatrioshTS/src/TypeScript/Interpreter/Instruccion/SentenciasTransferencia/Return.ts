import { Instruccion } from "../../Abstract/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { StringBuilder } from "../../Edd/StringBuilder";
import { Expresion } from "../../Abstract/Expresion";

export class Return extends Instruccion{

    valor:Expresion;

    constructor(valor:Expresion, fila:number, columna:number){
        super(fila,columna);
        this.valor = valor;
    }
    
    ejecutar(ent: Entorno, er: ErrorManager) {
        return this.valor.ejecutar(ent,er);
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        throw new Error("Method not implemented.");
    }
    
    traducir(builder: StringBuilder) {
        throw new Error("Method not implemented.");
    }

}