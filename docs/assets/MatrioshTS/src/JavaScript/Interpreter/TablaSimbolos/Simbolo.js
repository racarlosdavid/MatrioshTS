class Simbolo {
    constructor(id, valor, tipo, dimensiones, tipodeclaracion) {
        this.id = id;
        this.valor = valor;
        this.tipo = tipo;
        this.dimensiones = dimensiones;
        this.tipodeclaracion = tipodeclaracion;
    }
    getTipoToString() {
        switch (this.tipo) {
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
                return this.tipo + "";
        }
    }
}
