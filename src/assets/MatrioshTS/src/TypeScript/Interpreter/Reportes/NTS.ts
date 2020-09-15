export class NTS {
    
    identificador:string;
    tipo:string;
    ambito:string;
    padre:string;
    descripcion:string;

    constructor(identificador:string,tipo:string, ambito:string, padre:string, descripcion:string) {
        this.identificador = identificador;
        this.tipo = tipo;
        this.ambito = ambito;
        this.padre = padre;
        this.descripcion = descripcion;
    }

    

}