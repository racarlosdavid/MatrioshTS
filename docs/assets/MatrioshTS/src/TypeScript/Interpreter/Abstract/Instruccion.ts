
import { Entorno } from "../TablaSimbolos/Entorno";
import { StringBuilder } from "../Edd/StringBuilder";
import { ErrorManager } from "../Reportes/ErrorManager";
import { Type } from "../TablaSimbolos/Tipo";

export abstract class Instruccion{

    public fila: number;
    public columna: number;

    constructor(fila: number, columna: number) {
        this.fila = fila;
        this.columna = columna;
    }

    abstract ejecutar(ent:Entorno, er:ErrorManager):any;

    abstract getDot(builder:StringBuilder, parent:string, cont:number):number;

    abstract traducir(builder:StringBuilder):any;

    getTipoToString(tipo:Type):string{
        switch (tipo) {
            case Type.NUMBER:
                return "NUMBER";
            case Type.STRING:
                return "STRING";
            case Type.BOOLEAN:
                return "BOOLEAN";
            case Type.NULL:
                return "NULL";
            case Type.ARRAY:
                return "ARRAY";
            case Type.VOID:
                return "VOID";
            case Type.TYPE:
                return "TYPE";
            default:
                return "INDEF";
        }
    }
}



