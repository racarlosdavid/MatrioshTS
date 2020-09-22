var Type;
(function (Type) {
    Type[Type["NUMBER"] = 0] = "NUMBER";
    Type[Type["STRING"] = 1] = "STRING";
    Type[Type["BOOLEAN"] = 2] = "BOOLEAN";
    Type[Type["NULL"] = 3] = "NULL";
    Type[Type["ARRAY"] = 4] = "ARRAY";
    Type[Type["VOID"] = 5] = "VOID";
    Type[Type["TYPE"] = 6] = "TYPE";
    Type[Type["INDEF"] = 7] = "INDEF";
})(Type || (Type = {}));
class Tipo {
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
