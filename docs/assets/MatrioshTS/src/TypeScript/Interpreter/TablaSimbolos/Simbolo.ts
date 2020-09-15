import { Type } from "./Tipo";
import { TipoDeclaracion } from "../Instruccion/Declaracion";

export class Simbolo{
    
    public id : string;
    public valor : any;
    public tipo : Type|string;
    public dimensiones:number;
    public tipodeclaracion : TipoDeclaracion;

    constructor( id: string, valor: any, tipo: Type|string, dimensiones:number, tipodeclaracion : TipoDeclaracion){
        this.id = id;
        this.valor = valor;
        this.tipo = tipo;
        this.dimensiones = dimensiones;
        this.tipodeclaracion = tipodeclaracion;
    }

    getTipoToString():string{
        switch (this.tipo) {
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
                return this.tipo+"";
        }
    }
}