
import { Entorno } from "../TablaSimbolos/Entorno";
import { StringBuilder } from "../Edd/StringBuilder";
import { Expresion } from "../Abstract/Expresion";
import { Instruccion } from "../Abstract/Instruccion";


export class Declaracion extends Instruccion{

    private identificador:string;
    private valor:Expresion|null;

    constructor (identificador:string, valor:Expresion|null, fila:number, columna:number) {
        super(fila,columna);
        this.identificador = identificador;
        this.valor = valor;
    }

    ejecutar(ent: Entorno) {
        const val = this.valor?.ejecutar(ent);
        //ent.Add();
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        throw new Error("Method not implemented.");
    }
    
}