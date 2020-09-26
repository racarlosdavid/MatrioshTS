class Decremento extends Instruccion {
    constructor(identificador, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let obj = ent.GetValue(this.identificador);
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
        let nodoId = "nodo" + ++cont;
        builder.append(nodoId + " [label=\"" + this.identificador + "--\"];\n");
        builder.append(parent + " -> " + nodoId + "[color=\"red:black;0.50:red\"];\n");
        return cont;
    }
    traducir(builder, parent) {
        return this.identificador + "--";
    }
}
