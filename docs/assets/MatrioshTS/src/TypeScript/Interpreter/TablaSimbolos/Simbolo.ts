import { Type } from "./Tipo";
import { TipoDeclaracion } from "../Instruccion/Declaracion";

export class Simbolo{
    
    public id : string;
    public valor : any;
    public type : Type;
    public inicializado : boolean;
    public tipodeclaracion : TipoDeclaracion;

    constructor( id: string, valor: any, type: Type, inicializado : boolean, tipodeclaracion : TipoDeclaracion){
        this.id = id;
        this.valor = valor;
        this.type = type;
        this.inicializado = inicializado;
        this.tipodeclaracion = tipodeclaracion;
    }
}