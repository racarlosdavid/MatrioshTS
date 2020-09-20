class Decremento extends Instruccion {
    constructor(identificador, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
    }
    ejecutar(ent, er, consola, tsCollector) {
        let obj = ent.GetValue(this.identificador);
        console.log(" en actualizacion " + this.identificador);
        if (obj instanceof Simbolo) {
            if (obj.tipo == Type.NUMBER) {
                ent.ChangeValue(this.identificador, obj.valor - 1);
            }
            else {
                //Error no es de tipo number para hacer ++
            }
        }
        return null;
    }
    getDot(builder, parent, cont) {
        throw new Error("Method not implemented. getdot Decementos");
    }
    traducir(builder, parent) {
        return "";
    }
}
