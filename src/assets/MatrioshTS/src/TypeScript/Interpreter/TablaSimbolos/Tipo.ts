export enum Type {
    NUMBER,
    STRING,
    BOOLEAN,
    NULL,
    ARRAY,
    VOID,
    TYPE,
    INDEF
}

export class Tipo {

    tipo:Type|string ;
    esArreglo:boolean=false;
    
    constructor(tipo:Type|string){
        this.tipo = tipo;
    }

    getTipo(){
        return this.tipo;
    }

    getEsArreglo(){
        return this.esArreglo;
    }

    setEsArreglo(esArreglo:boolean){
        this.esArreglo = esArreglo;
    }

    getTipoToString(): string {
        switch (this.tipo) {
            case Type.STRING:
                return "string";
            case Type.NUMBER:
                return "number";
            case Type.BOOLEAN:
                return "boolean";
            case Type.VOID:
                return "void";
            case Type.TYPE:
                return "types";
            case Type.ARRAY:
                return "arryas";
        }
        return this.tipo.toString();
    }
}

