class Incremento extends Instruccion {
    constructor(identificador, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
    }
    ejecutar(ent, er, consola, tsCollector) {
        let obj = ent.GetValue(this.identificador);
        if (obj instanceof Simbolo) {
            if (obj.valor instanceof Retorno) {
                if (obj.valor.tipo == Type.NUMBER) {
                    obj.valor.valor = obj.valor.valor + 1;
                    ent.ChangeValue(this.identificador, obj.valor);
                }
                else {
                    //Error no es de tipo number para hacer ++
                }
            }
        }
        return null;
    }
    getDot(builder, parent, cont) {
        throw new Error("Method not implemented. getdot Incremento");
    }
    traducir(builder, parent) {
        throw new Error("Method not implemented.traducir incrementos");
    }
}
