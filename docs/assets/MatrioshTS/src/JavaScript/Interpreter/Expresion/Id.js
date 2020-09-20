class Id extends Expresion {
    constructor(identificador, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
    }
    ejecutar(ent, er) {
        let obj = ent.GetValue(this.identificador);
        //console.log("estas haciendo un acceso de tipo ID del id "+ this.identificador);
        if (obj != null) {
            //Primero compruebo que la variable tenga un valor sino hay que reportar error de acceso a variable sin haber asignado un valor
            if (obj.valor == "null") {
                er.addError(new NodoError(TipoError.SEMANTICO, "No se puede usar la variable " + this.identificador + " sin haber asignado un valor", this.fila, this.columna));
                return "null";
            }
            else {
                return {valor:obj.valor, tipo:obj.tipo};
            }
        }
        return "null";
    }
    getDot(builder, parent, cont) {
        let nodoId = "nodo" + ++cont;
        builder.append(nodoId + " [label=\"" + this.identificador + "\"];\n");
        builder.append(parent + " -> " + nodoId + "[color=\"red:black;0.50:red\"];\n");
        return cont;
    }
    traducir(builder) {
        return this.identificador;
    }
}
