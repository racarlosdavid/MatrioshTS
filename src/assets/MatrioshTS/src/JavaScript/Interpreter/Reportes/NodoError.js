 class NodoError {
    constructor(tipo, descripcion, fila, columna) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }
    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
    getDescripcion() {
        return this.descripcion;
    }
    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }
    getFila() {
        return this.fila;
    }
    setFila(fila) {
        this.fila = fila;
    }
    getColumna() {
        return this.columna;
    }
    setColumna(columna) {
        this.columna = this.columna;
    }
    getTipoErrorToString() {
        switch (this.tipo) {
            case TipoError.LEXICO:
                return "Lexico";
            case TipoError.SEMANTICO:
                return "Semantico";
            default:
                return "Sintactico";
        }
    }
}
 var TipoError;
(function (TipoError) {
    TipoError[TipoError["LEXICO"] = 0] = "LEXICO";
    TipoError[TipoError["SINTACTICO"] = 1] = "SINTACTICO";
    TipoError[TipoError["SEMANTICO"] = 2] = "SEMANTICO";
})(TipoError || (TipoError = {}));
