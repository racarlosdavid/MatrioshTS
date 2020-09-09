import { Instruccion } from "../Abstract/Instruccion";
export class Declaracion extends Instruccion {
    constructor(identificador, valor, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
        this.valor = valor;
    }
    ejecutar(ent) {
        var _a;
        const val = (_a = this.valor) === null || _a === void 0 ? void 0 : _a.ejecutar(ent);
        //ent.Add();
    }
    getDot(builder, parent, cont) {
        throw new Error("Method not implemented.");
    }
}
