import { Instruccion } from "../Abstract/Instruccion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { StringBuilder } from "../Edd/StringBuilder";
import { Expresion } from "../Abstract/Expresion";


export class Log extends Instruccion{
    private valor:Expresion;

    constructor(valor:Expresion, fila:number, columna:number){
        super(fila,columna);
        this.valor = valor;
    }

    ejecutar(ent: Entorno) {
        console.log("el valoor es: "+this.valor.ejecutar(ent));
    }
    getDot(builder: StringBuilder, parent: string, cont: number): number {
        throw new Error("Method not implemented.");
    }

}
