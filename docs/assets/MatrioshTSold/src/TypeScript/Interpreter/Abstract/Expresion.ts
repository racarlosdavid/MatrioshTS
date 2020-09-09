import { Entorno } from "../TablaSimbolos/Entorno";
import { StringBuilder } from "../Edd/StringBuilder";
import { Type } from "../TablaSimbolos/Tipo";
import { tipos } from "../Vault/MatrizTipos";

export abstract class Expresion{

    public fila: number;
    public columna: number;

    constructor(fila: number, columna: number) {
        this.fila = fila;
        this.columna = columna;
    }

    abstract ejecutar(ent:Entorno):any;

    public getTipoResultante(tipo1 : Type, tipo2 : Type) : Type{
        const type = tipos[tipo1][tipo2];
        return type;
    }

    abstract getDot(builder:StringBuilder, parent:string, cont:number):number;
}


