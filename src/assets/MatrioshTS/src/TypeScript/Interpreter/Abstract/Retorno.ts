import { Type } from "../TablaSimbolos/Tipo";

export class Retorno {
    valor : any;
    tipo : Type;

    constructor(valor:any, tipo:Type){
        this.valor = valor;
        this.tipo = tipo;

    }
}
