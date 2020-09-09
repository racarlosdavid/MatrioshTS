import { Instruccion } from "../Abstract/Instruccion";
import { Expresion } from "../Abstract/Expresion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "./StringBuilder";

export class ArrayTS extends Expresion{

    valores:Array<Expresion>;
    arreglo:[];

    constructor(valores:Array<Expresion>, fila:number, columna:number){
        super(fila,columna);
        this.valores = valores;
        this.arreglo = [];
    }

    ejecutar(ent: Entorno, er: ErrorManager) {
        return this;
    }
/*
    imprimirArray():string {
        if (this.valores.length == 0) {
            return "[]";
        }
        let sb = new StringBuilder();
        sb.append("[");
        let s:string = this.valores[0];
        sb.append(s); consoloe.log(this.valores[1]);
        for (int t = 1; t < valores.size(); t++) {
            sb.append(",").append(valores.get(t).toString());
        }
        sb.append("]");
        return sb.toString();
       
    }
 */
    getDot(builder: StringBuilder, parent: string, cont: number): number {
        throw new Error("Method not implemented.");
    }

    traducir(builder: StringBuilder) {
        throw new Error("Method not implemented.");
    }

    

    
    
}