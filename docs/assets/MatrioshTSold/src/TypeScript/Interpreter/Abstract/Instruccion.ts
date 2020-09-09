
import { Entorno } from "../TablaSimbolos/Entorno";
import { StringBuilder } from "../Edd/StringBuilder";

export abstract class Instruccion{

    public fila: number;
    public columna: number;

    constructor(fila: number, columna: number) {
        this.fila = fila;
        this.columna = columna;
    }

    abstract ejecutar(ent:Entorno):any;

    abstract getDot(builder:StringBuilder, parent:string, cont:number):number;
}



