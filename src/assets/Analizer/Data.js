var Data = /** @class */ (function () {
    function Data(id) {
        this.id = id;
    }
    Data.prototype.getI = function () {
        if (1 > 3) {
            return "hola";
        }
        else {
            return null;
        }
    };
    return Data;
}());
