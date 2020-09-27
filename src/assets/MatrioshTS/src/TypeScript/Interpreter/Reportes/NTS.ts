export class NTS {
    
    identificador:string;
    tipo:string;
    ambito:string;
    padre:string;
    valor:string;

    constructor(identificador:string,tipo:string, ambito:string, padre:string, valor:string) {
        this.identificador = identificador;
        this.tipo = tipo;
        this.ambito = ambito;
        this.padre = padre;
        this.valor = valor;
    }

    

}