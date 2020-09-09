import { tipos } from "../Vault/MatrizTipos";
export class Expresion {
    constructor(fila, columna) {
        this.fila = fila;
        this.columna = columna;
    }
    getTipoResultante(tipo1, tipo2) {
        const type = tipos[tipo1][tipo2];
        return type;
    }
}
