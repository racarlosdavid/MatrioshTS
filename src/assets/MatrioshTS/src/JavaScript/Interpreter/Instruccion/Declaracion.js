import { Instruccion } from "../Abstract/Instruccion";
import { Type } from "../TablaSimbolos/Tipo";
import { NodoError, TipoError } from "../Reportes/NodoError";
export class Declaracion extends Instruccion {
    constructor(tipoDeclaracion, identificador, tipo, dimensiones, valor, fila, columna) {
        super(fila, columna);
        this.tipoDeclaracion = tipoDeclaracion;
        this.identificador = identificador;
        this.tipo = tipo;
        this.dimensiones = dimensiones;
        this.valor = valor;
    }
    ejecutar(ent, er) {
        var _a;
        const myArray = [];
        myArray.push([["hola"]]);
        myArray.push([["hola1"]]);
        myArray.push([["hola2"]]);
        myArray[0][0][0] = "P";
        console.log("el array es " + myArray);
        /*
        
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
*/ let fruits = [['Apple', 'Orange', 'Banana'], ["hola"]];
        if (this.tipo == Type.ARRAY || this.dimensiones > 0) {
            console.log("es un arreglo de " + this.dimensiones + " esta inicializado " + (this.valor == null ? true : false));
        }
        if (this.valor != null) { // Si la variable esta inicializada entra a este if, 
            let val = (_a = this.valor) === null || _a === void 0 ? void 0 : _a.ejecutar(ent, er);
            if (this.tipo != null) { // Si se declaron con un tipo hay que comprobar que el valor sea del mismo tipo
                if (this.tipo == val.tipo) { // Ok. se guarda en la TS
                    ent.Add(this.identificador, val, this.tipo, true, this.tipoDeclaracion);
                }
                else { // Error no son del mismo tipo
                    er.addError(new NodoError(TipoError.SEMANTICO, "El tipo declarado " + this.getTipoToString(this.tipo) + " no coincide con el tipo del valor " + this.getTipoToString(val.tipo), this.fila, this.columna));
                    return null;
                }
            }
            else {
                ent.Add(this.identificador, val, val.tipo, true, this.tipoDeclaracion);
            }
        }
        else { // Si la variable no esta inicializada solo puede ser let ya que const tiene que ser inicializada
            if (this.tipo != null) {
                ent.Add(this.identificador, null, this.tipo, false, this.tipoDeclaracion);
            }
            else {
                ent.Add(this.identificador, null, Type.INDEF, false, this.tipoDeclaracion);
            }
        }
        return null;
    }
    getDot(builder, parent, cont) {
        throw new Error("Method not implemented.");
    }
    traducir(builder) {
        throw new Error("Method not implemented. en Declaracion");
    }
}
export var TipoDeclaracion;
(function (TipoDeclaracion) {
    TipoDeclaracion[TipoDeclaracion["LET"] = 0] = "LET";
    TipoDeclaracion[TipoDeclaracion["CONST"] = 1] = "CONST";
})(TipoDeclaracion || (TipoDeclaracion = {}));
