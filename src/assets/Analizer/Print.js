
var Print = /** @class */ (function () {
    function Print(contenido) {
        this.contenido = contenido;
    }
    Print.prototype.ejecutar = function () {
        try {
            console.log("> " + this.contenido.ejecutar());
        }
        catch (error) {
            return null;
        }
        return null;
    };
    return Print;
}());

