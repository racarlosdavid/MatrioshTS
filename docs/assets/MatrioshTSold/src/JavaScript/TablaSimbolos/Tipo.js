export var Type;
(function (Type) {
    Type[Type["INTEGER"] = 0] = "INTEGER";
    Type[Type["DOUBLE"] = 1] = "DOUBLE";
    Type[Type["BOOLEAN"] = 2] = "BOOLEAN";
    Type[Type["CHAR"] = 3] = "CHAR";
    Type[Type["STRING"] = 4] = "STRING";
    Type[Type["ESTRUCTURA"] = 5] = "ESTRUCTURA";
    Type[Type["VOID"] = 6] = "VOID";
    Type[Type["INDEF"] = 7] = "INDEF";
})(Type || (Type = {}));
export class Tipo {
    constructor(tipo) {
        this.esArreglo = false;
        this.tipo = tipo;
    }
    getTipo() {
        return this.tipo;
    }
    getEsArreglo() {
        return this.esArreglo;
    }
    setEsArreglo(esArreglo) {
        this.esArreglo = esArreglo;
    }
    getTipoToString() {
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
