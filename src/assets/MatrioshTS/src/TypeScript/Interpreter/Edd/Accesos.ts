import { Expresion } from "../Abstract/Expresion";
import { Instruccion } from "../Abstract/Instruccion";

export class Accesos {
    
    valor:Expresion;
    tipo:TipoAcceso;
    fila:number;
    columna:number;

    constructor(valor:Expresion, tipo:TipoAcceso, fila:number, columna:number) {
        this.valor = valor;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }
}

export enum TipoAcceso {
    ID,
    ARRAY,
    CALL
}