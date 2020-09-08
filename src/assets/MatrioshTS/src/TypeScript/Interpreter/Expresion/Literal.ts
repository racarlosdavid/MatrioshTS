import { Expresion } from "../Abstract/Expresion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "../Edd/StringBuilder";
import { Type } from "../TablaSimbolos/Tipo";
import { Retorno } from "../Abstract/Retorno";

export class Literal extends Expresion{
    valor:any;
    tipo:Type;
    tipoString:TipoString;

    constructor(valor:any,tipo:Type,tipoString:TipoString,fila:number,columna:number){
        super(fila,columna);
        this.valor = valor;
        this.tipo = tipo;
        this.tipoString = tipoString;
    }
    
    ejecutar(ent: Entorno, er: ErrorManager) {
        return new Retorno(this.valor,this.tipo);
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodoOp:string = "nodo" + ++cont;
        builder.append(nodoOp+" [label=\""+this.valor+"\"];\n");
        builder.append(parent+" -> "+nodoOp+"[color=\"red:black;0.50:red\"];\n");
        return cont;
    }

    traducir(builder: StringBuilder) { 
        if (this.tipoString == TipoString.STRING1) {
            return "\""+this.valor.toString()+"\"";
        } else if (this.tipoString == TipoString.STRING2) {
            return "\'"+this.valor.toString()+"\'";
        } else if (this.tipoString == TipoString.STRING3) {
            return "\`"+this.valor.toString()+"\`";
        }
        return this.valor.toString();
    }
}

export enum TipoString {
    STRING1,
    STRING2,
    STRING3,
    INDEF
}