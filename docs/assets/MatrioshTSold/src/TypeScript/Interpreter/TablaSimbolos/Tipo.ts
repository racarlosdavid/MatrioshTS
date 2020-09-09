export enum Type {
    INTEGER,
    DOUBLE,
    BOOLEAN,
    CHAR,
    STRING,
    ESTRUCTURA,
    VOID,
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
                return "String";
            case Type.CHAR:
                return "char";
            case Type.INTEGER:
                return "integer";
            case Type.DOUBLE:
                return "double";
            case Type.BOOLEAN:
                return "boolean";
            case Type.VOID:
                return "void";
        }
        return this.tipo.toString();
    }
}

