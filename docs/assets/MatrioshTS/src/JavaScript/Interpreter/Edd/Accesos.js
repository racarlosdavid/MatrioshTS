 class Accesos {
    constructor(valor, tipo, fila, columna) {
        this.valor = valor;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }
}
 var TipoAcceso;
(function (TipoAcceso) {
    TipoAcceso[TipoAcceso["ID"] = 0] = "ID";
    TipoAcceso[TipoAcceso["ARRAY"] = 1] = "ARRAY";
    TipoAcceso[TipoAcceso["CALL"] = 2] = "CALL";
})(TipoAcceso || (TipoAcceso = {}));
