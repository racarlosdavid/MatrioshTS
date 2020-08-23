
var Funcion = /** @class */ (function () {
    function Funcion(id) {
        this.id = id;
    }
    Funcion.prototype.ejecutar = function () {
        throw new Error("Method not implemented.");
    };
    Funcion.prototype.Obtenerid = function () {
        return this.id;
    };
    return Funcion;
}());
