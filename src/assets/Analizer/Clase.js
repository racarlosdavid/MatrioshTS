"use strict";
exports.__esModule = true;
var Clase = /** @class */ (function () {
    function Clase(modificadores, id, idextends, listainstrucciones) {
        this.modificadores = modificadores;
        this.id = id;
        this.idextends = idextends;
        this.listainstrucciones = listainstrucciones;
    }
    Clase.prototype.ejecutar = function () {
        for (var index = 0; index < this.listainstrucciones.length; index++) {
            var element = this.listainstrucciones[index];
            element.ejecutar();
        }
        return null;
    };
    return Clase;
}());
module.exports = Clase;
