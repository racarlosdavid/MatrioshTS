class Declaracion extends Instruccion {
    constructor(tipoDeclaracion, identificador, tipo, dimensiones, valor, fila, columna) {
        super(fila, columna);
        this.tipoDeclaracion = tipoDeclaracion;
        this.identificador = identificador;
        this.tipo = tipo;
        this.dimensiones = dimensiones;
        this.valor = valor;
    }
    ejecutar(ent, er, consola, tsCollector) {
        var _a;
        //if (this.tipoDeclaracion == TipoDeclaracion.LET) {
        if (this.valor != null) { // Si la variable esta inicializada entra a este if, 
            let val = (_a = this.valor) === null || _a === void 0 ? void 0 : _a.ejecutar(ent, er);
            if (this.tipo != null) { // Si se declaron con un tipo hay que comprobar que el valor sea del mismo tipo
                if (this.tipo == val.tipo) { // Ok. se guarda en la TS
                    ent.Add(this.identificador, val.valor, this.tipo, this.dimensiones, this.tipoDeclaracion);
                }
                else { // Error no son del mismo tipo
                    er.addError(new NodoError(TipoError.SEMANTICO, "El tipo declarado " + this.getTipoToString(this.tipo) + " no coincide con el tipo del valor " + this.getTipoToString(val.tipo), this.fila, this.columna));
                    return null;
                }
            }
            else { // No se declaro con tipo
                ent.Add(this.identificador, val.valor, val.tipo, this.dimensiones, this.tipoDeclaracion);
            }
        }
        else { // Si la variable no esta inicializada entra aqui
            if (this.tipo != null) {
                ent.Add(this.identificador, "null", this.tipo, this.dimensiones, this.tipoDeclaracion);
            }
            else {
                ent.Add(this.identificador, "null", Type.INDEF, this.dimensiones, this.tipoDeclaracion);
            }
        }
        //} else if (this.tipoDeclaracion == TipoDeclaracion.CONST){
        //}
        /*
 const myArray: string[][][] = [];
 myArray.push([["hola"]]);
 myArray.push([["hola1"]]);
 myArray.push([["hola2"]]);
 myArray[0][0][0]="P";
 console.log("el array es "+myArray);

 
myArray.push([["hola"]]);
myArray.push([["hola1"]]);
myArray.push([["hola2"]]);
myArray[1][2][0]="P";
console.log("el array es "+myArray);
console.log("POSICION 0,0 "+myArray[0][0]);
console.log("POSICION 0,1 "+myArray[0][1]);
console.log("POSICION 1,0 "+myArray[1][0]);
console.log("POSICION 1,1 "+myArray[1][1]);
console.log("POSICION 1,2 "+myArray[1][5]);
*/
        /*
        let fruits: string[][] = [['Apple', 'Orange', 'Banana'],["hola"]];
                if (this.tipo == Type.ARRAY || this.dimensiones > 0) {
                    console.log("es un arreglo de "+this.dimensiones+" esta inicializado "+ (this.valor == null ? true : false) );
                     
                }
                
                
                */
        return null;
    }
    getDot(builder, parent, cont) {
        return cont;
    }
    traducir(builder, parent) {
        if (this.tipoDeclaracion == TipoDeclaracion.PARAM) {
            return this.identificador + ":" + this.getTipoToString(this.tipo);
        }
        else {
        }
        return "traduccion de declaracion no implementado \n";
    }
}
 var TipoDeclaracion;
(function (TipoDeclaracion) {
    TipoDeclaracion[TipoDeclaracion["LET"] = 0] = "LET";
    TipoDeclaracion[TipoDeclaracion["CONST"] = 1] = "CONST";
    TipoDeclaracion[TipoDeclaracion["PARAM"] = 2] = "PARAM";
})(TipoDeclaracion || (TipoDeclaracion = {}));
