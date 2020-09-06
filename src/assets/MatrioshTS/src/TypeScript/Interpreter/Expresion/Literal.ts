import { Expresion } from "../Abstract/Expresion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "../Edd/StringBuilder";
import { Type } from "../TablaSimbolos/Tipo";
import { Retorno } from "../Abstract/Retorno";

export class Literal extends Expresion{
    valor:any;
    tipo:Type;

    constructor(valor:any,tipo:Type,fila:number,columna:number){
        super(fila,columna);
        this.valor = valor;
        this.tipo = tipo;
    }
    
    ejecutar(ent: Entorno, er: ErrorManager) {
        return new Retorno(this.valor,this.tipo);
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        throw new Error("Method not implemented.");
    }
    traducir(builder: StringBuilder) { 
        return this.valor.toString();
      
    }
}