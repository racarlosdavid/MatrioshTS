import { Expresion } from "../Abstract/Expresion";
export class Acceso extends Expresion {
    constructor(identificador, tipoacceso, accesos, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
        this.tipoacceso = tipoacceso;
        this.accesos = accesos;
    }
    ejecutar(ent, er) {
        let obj = ent.GetValue(this.identificador);
        if (this.tipoacceso == TipoAcceso.ID) {
            //console.log("estas haciendo un acceso de tipo ID del id "+ this.identificador);
            if (obj != null) {
                return obj.valor;
                /*
                if (obj instanceof ArrayTS) {
                    let a:ArrayTS = obj;
                    return a.valores;
                } else {
                    
                }
                */
            }
        }
        return null;
    }
    getDot(builder, parent, cont) {
        return cont;
    }
    traducir(builder) {
        if (this.tipoacceso == TipoAcceso.ID) {
            return this.identificador;
        }
        return ""; //falta implementar los otros tipos de acceso
    }
}
export var TipoAcceso;
(function (TipoAcceso) {
    TipoAcceso[TipoAcceso["ID"] = 0] = "ID";
    TipoAcceso[TipoAcceso["ARRAY"] = 1] = "ARRAY";
    TipoAcceso[TipoAcceso["TYPE"] = 2] = "TYPE";
})(TipoAcceso || (TipoAcceso = {}));
