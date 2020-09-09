import { Funcion } from "../Instruccion/Funcion";
export class ConsoleLog extends Funcion {
    constructor(identificador, parametros, instrucciones, fila, columna) {
        super(identificador, parametros, instrucciones, fila, columna);
        this.valor = null;
    }
    ejecutar(ent) {
        throw new Error("Method not implemented.");
    }
    getValor() {
        return this.valor;
    }
    setValor(valor) {
        this.valor = valor;
    }
}
