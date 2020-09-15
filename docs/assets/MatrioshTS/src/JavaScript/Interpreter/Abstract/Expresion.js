class Expresion {
    constructor(fila, columna) {
        this.fila = fila;
        this.columna = columna;
    }
    getTipoResultante(tipo1, tipo2) {
        const type = tipos[tipo1][tipo2];
        return type;
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
            default:
                return tipo + "";
        }
    }
}
