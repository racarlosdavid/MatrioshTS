class TypeTS extends Instruccion {
    constructor(identificador, variables, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
        this.variables = variables;
    }
    ejecutar(ent, er, consola, tsCollector) {
        throw new Error("Method EJECUTAR not implemented. TypeTS");
    }
    getDot(builder, parent, cont) {
        console.log("Method getDot not implemented. TypeTS");
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
                if (index < this.variables.length - 1) {
                    v.append(",\n");
                }
                else {
                    v.append("\n");
                }
            }
            tempo.append(v.toString());
            tempo.append("};\n");
        }
        // Fin
        return tempo.toString();
    }
}
