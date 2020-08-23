
var Return = /** @class */ (function () {
    function Return(valorRetorno) {
        this.valorRetorno = valorRetorno;
    }
    Return.prototype.ejecutar = function () {
        if (this.valorRetorno == null) {
            return this;
        }
        else {
            return this.valorRetorno.ejecutar();
        }
    };
    return Return;
}());
