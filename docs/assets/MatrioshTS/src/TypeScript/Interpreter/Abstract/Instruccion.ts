
import { Entorno } from "../TablaSimbolos/Entorno";
import { StringBuilder } from "../Edd/StringBuilder";
import { ErrorManager } from "../Reportes/ErrorManager";
import { Type } from "../TablaSimbolos/Tipo";
import { TSCollector } from "../TablaSimbolos/TSCollector";

export abstract class Instruccion{

    public fila: number;
    public columna: number;

    constructor(fila: number, columna: number) {
        this.fila = fila;
        this.columna = columna;
    }

    abstract ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector):any;

    abstract getDot(builder:StringBuilder, parent:string, cont:number):number;

    abstract traducir(builder:StringBuilder, parent:string):any;

    getTipoToString(tipo:Type|string|null):string{
        switch (tipo) {
            case Type.NUMBER:
                return "number";
            case Type.STRING:
                return "string";
            case Type.BOOLEAN:
                return "boolean";
            case Type.NULL:
                return "null";
            case Type.ARRAY:
                return "array";
            case Type.VOID:
                return "void";
            case Type.TYPE:
                return "type";
            default:
                return tipo+"";
        }
    }
}



