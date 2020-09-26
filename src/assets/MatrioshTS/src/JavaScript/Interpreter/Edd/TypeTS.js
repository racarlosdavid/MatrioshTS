class TypeTS extends Instruccion {
    constructor(identificador, variables, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
        this.variables = variables;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        ent.AddType(this.identificador, this);
        return null;
    }
    getDot(builder, parent, cont) {
        let nodo = "nodo" + ++cont;
        builder.append(nodo + " [label=\" Funcion: " + this.identificador + "\"];\n");
        builder.append(parent + " -> " + nodo + ";\n");
        let nodoVariables = "nodo" + ++cont;
        builder.append(nodoVariables + " [label=\"Variables\"];\n");
        builder.append(nodo + " -> " + nodoVariables + ";\n");
        for (let instr of this.variables) {
            cont = instr.getDot(builder, nodoVariables, cont);
        }
        return cont;
    }
    traducir(builder, parent) {
        let tempo = new StringBuilder();
        tempo.append("type " + this.identificador + " = ");
        // Traduccion de los parametros
        let v = new StringBuilder();
        if (this.variables.length == 0) {
            tempo.append("{ }");
        }
        else {
            tempo.append("{\n");
            for (let index = 0; index < this.variables.length; index++) {
                let element = this.variables[index];
                v.append(element.traducir(builder, parent));
                v.append(";\n");
            }
            tempo.append(v.toString());
            tempo.append("};\n");
        }
        // Fin 
        return tempo.toString();
    }
}
