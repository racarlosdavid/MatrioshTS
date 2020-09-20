import { Instruccion } from "../Abstract/Instruccion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { StringBuilder } from "../Edd/StringBuilder";
import { Expresion } from "../Abstract/Expresion";
import { ErrorManager } from "../Reportes/ErrorManager";
import { TSCollector } from "../TablaSimbolos/TSCollector";
import { Arreglo } from "../Edd/Arreglo";



export class Log extends Instruccion{

    valor:Expresion ;

    constructor(valor:any, fila:number, columna:number){
        super(fila,columna);
        this.valor = valor;
    }

    ejecutar(ent: Entorno, er: ErrorManager, consola:StringBuilder, tsCollector:TSCollector) {
        let val = this.valor.ejecutar(ent,er);
        if (val.valor instanceof Arreglo) {
            consola.append(" > "+val.valor.imprimirArreglo()+"\n");
        } else {
            consola.append(" > "+val.valor+"\n"); 
        }
        return null;
    }
    
    getDot(builder: StringBuilder, parent: string, cont: number): number {
        console.log("getDot de Log no esta implementado solo retorna el cont para que no de error");
        return cont;
    }

    traducir(builder: StringBuilder, parent: string) {
        return "console.log("+this.valor.traducir(builder)+");\n";
    }
   

   

}
