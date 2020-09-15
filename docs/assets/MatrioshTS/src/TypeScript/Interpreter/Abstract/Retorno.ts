import { Type } from "../TablaSimbolos/Tipo";

export class Retorno {
    valor : any;
    tipo : Type|string;

    constructor(valor:any, tipo:Type|string){
        this.valor = valor;
        this.tipo = tipo;

    }
}
