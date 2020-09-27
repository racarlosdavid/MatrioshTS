class Id extends Expresion {
    constructor(identificador, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let obj = ent.GetValue(this.identificador);
        //console.log("estas haciendo un acceso de tipo ID del id "+ this.identificador);
        if (obj != null) {
            //Primero compruebo que la variable tenga un valor sino hay que reportar error de acceso a variable sin haber asignado un valor
            if (obj.valor == "umdefined") {
                er.addError(new NodoError(TipoError.SEMANTICO, "No se puede usar la variable " + this.identificador + " sin haber asignado un valor", this.fila, this.columna, ambito));
                return "null";
            }
            else {
                return new Retorno(obj.valor, obj.tipo);
            }
        }
        else {
            er.addError(new NodoError(TipoError.SEMANTICO, "No se puede usar la variable \"" + this.identificador + "\" si no ha sido declarada", this.fila, this.columna, ambito));
            return "null";
        }
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
