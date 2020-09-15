import { Entorno } from "../TablaSimbolos/Entorno";
import { StringBuilder } from "../Edd/StringBuilder";
import { Type } from "../TablaSimbolos/Tipo";
import { tipos } from "../Vault/MatrizTipos";
import { ErrorManager } from "../Reportes/ErrorManager";
import { TSCollector } from "../TablaSimbolos/TSCollector";

export abstract class Expresion{

    public fila: number;
    public columna: number;

    constructor(fila: number, columna: number) {
        this.fila = fila;
        this.columna = columna;
    }

    abstract ejecutar(ent:Entorno, er:ErrorManager):any;

    public getTipoResultante(tipo1 : Type, tipo2 : Type) : Type{
        const type = tipos[tipo1][tipo2];
        return type;
    }

    getTipoToString(tipo:Type|string):string{
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

    abstract getDot(builder:StringBuilder, parent:string, cont:number):number;

    abstract traducir(builder:StringBuilder):any;
}


