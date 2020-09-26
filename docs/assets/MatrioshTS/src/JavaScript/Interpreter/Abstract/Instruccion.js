class Instruccion {
    constructor(fila, columna) {
        this.fila = fila;
        this.columna = columna;
    }
    getTipoToString(tipo) {
        switch (tipo) {
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
            case Type.INDEF:
                return "undefined";
            default:
                return tipo + "";
        }
    }
    getElTipo(val) {
        if (typeof val === "number") {
            return Type.NUMBER;
        }
        else if (typeof val === "string") {
            return Type.STRING;
        }
        else if (typeof val === "boolean") {
            return Type.BOOLEAN;
        }
        else if (val instanceof Arreglo) {
            return Type.ARRAY;
        }
        else if (val instanceof MiType) {
            return Type.TYPE;
        }
        else {
            return val;
        }
    }
}
