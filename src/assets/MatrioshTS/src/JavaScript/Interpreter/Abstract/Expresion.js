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
                return "NUMBER";
            case Type.STRING:
                return "STRING";
            case Type.BOOLEAN:
                return "BOOLEAN";
            case Type.NULL:
                return "NULL";
            case Type.ARRAY:
                return "ARRAY";
            case Type.VOID:
                return "VOID";
            case Type.TYPE:
                return "TYPE";
            default:
                return "INDEF";
        }
    }
}
