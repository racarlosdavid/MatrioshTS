
var If = /** @class */ (function () {
    function If(condicion, listaintrucciones, listaelseif, listaelse, isElse, isElseIf) {
        this.condicion = condicion;
        this.listaInstrucciones = listaintrucciones;
        this.listaelseif = listaelseif;
        this.listaelse = listaelse;
        this.isElse = isElse;
        this.isElseIf = isElseIf;
    }
    If.prototype.getF = function () {
        console.log("HELL YEAH");
    };
    If.prototype.ejecutar = function () {
        if (this.condicion.ejecutar()) {
            for (var index = 0; index < this.listaInstrucciones.length; index++) {
                var element = this.listaInstrucciones[index];
                var r = element.ejecutar();
                if (r != null) {
                    return r;
                }
            }
        }
        else if (this.isElseIf) {
            for (var index = 0; index < this.listaelseif.length; index++) {
                var element = this.listaelseif[index];
                var condicion1 = element[0];
                var istrucciones1 = element[1];
                if (condicion1.ejecutar()) {
                    for (var index_1 = 0; index_1 < istrucciones1.length; index_1++) {
                        var element1 = istrucciones1[index_1];
                        var r = element1.ejecutar();
                        if (r != null) {
                            return r;
                        }
                    }
                }
            }
            if (this.isElse) {
                for (var index = 0; index < this.listaelse.length; index++) {
                    var element = this.listaelse[index];
                    var r = element.ejecutar();
                    if (r != null) {
                        return r;
                    }
                }
            }
        }
        else if (this.isElse) {
            for (var index = 0; index < this.listaelse.length; index++) {
                var element = this.listaelse[index];
                var r = element.ejecutar();
                if (r != null) {
                    return r;
                }
            }
        }
        else {
            return null;
        }
    };
    return If;
}());
