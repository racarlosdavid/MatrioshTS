import { Entorno } from "../TablaSimbolos/Entorno";
import { StringBuilder } from "../Edd/StringBuilder";
import { Type } from "../TablaSimbolos/Tipo";
import { ErrorManager } from "../Reportes/ErrorManager";
import { TSCollector } from "../TablaSimbolos/TSCollector";
import { R_TS } from "../Reportes/R_TS";
import { Arreglo } from "../Edd/Arreglo";
import { MiType } from "../Edd/MiType";

export abstract class Expresion{

    public fila: number;
    public columna: number;

    constructor(fila: number, columna: number) {
        this.fila = fila;
        this.columna = columna;
    }

    abstract ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string):any;

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

    getElTipo(val:any){
        if(typeof val === "number"){ 
            return Type.NUMBER;
        }else if(typeof val === "string"){
            return Type.STRING;
        }else if(typeof val === "boolean"){
            return Type.BOOLEAN;
        }else if(val instanceof Arreglo){
            return Type.ARRAY;
        }else if(val instanceof MiType){
            return Type.TYPE;
        }else{
            return val;
        }
    }

    abstract getDot(builder:StringBuilder, parent:string, cont:number):number;

    abstract traducir(builder:StringBuilder):any;
}


