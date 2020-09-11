import { Instruccion } from "../Abstract/Instruccion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { StringBuilder } from "../Edd/StringBuilder";
import { Expresion } from "../Abstract/Expresion";
import { ErrorManager } from "../Reportes/ErrorManager";



export class Log extends Instruccion{

    valor:Expresion ;

    constructor(valor:any, fila:number, columna:number){
        super(fila,columna);
        this.valor = valor;
    }

    ejecutar(ent: Entorno, er: ErrorManager) {
        let val = this.valor.ejecutar(ent,er);
        console.log(" > "+val.valor);
        return null;
    }
    
    getDot(builder: StringBuilder, parent: string, cont: number): number {
        return cont;
    }

    traducir(builder: StringBuilder) {
        return "console.log("+this.valor.traducir(builder)+");\n";
    }
   

   

}
