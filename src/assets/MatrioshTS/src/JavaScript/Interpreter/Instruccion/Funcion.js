class Funcion extends Instruccion {
    constructor(identificador, padre, parametros, tipoRetorno, instrucciones, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
        this.padre = padre;
        this.parametros = parametros;
        this.tipoRetorno = tipoRetorno;
        this.instrucciones = instrucciones;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let ok = ent.AddFunction(this.identificador, this);
        if (ok == false) {
            er.addError(new NodoError(TipoError.SEMANTICO, "La funcion " + this.identificador + " ya existe. ", this.fila, this.columna, ambito));
        }
        let r = null;
        return r;
    }
    getDot(builder, parent, cont) {
        let nodo = "nodo" + ++cont;
        builder.append(nodo + " [label=\" Funcion: " + this.identificador + "\"];\n");
        builder.append(parent + " -> " + nodo + ";\n");
        let nodoParametros = "nodo" + ++cont;
        builder.append(nodoParametros + " [label=\"Parametros\"];\n");
        builder.append(nodo + " -> " + nodoParametros + ";\n");
        for (let instr of this.parametros) {
            cont = instr.getDot(builder, nodoParametros, cont);
        }
        let nodoInstrucciones = "nodo" + ++cont;
        builder.append(nodoInstrucciones + " [label=\"Instrucciones\"];\n");
        builder.append(nodo + " -> " + nodoInstrucciones + ";\n");
        for (const instr of this.instrucciones) {
            cont = instr.getDot(builder, nodoInstrucciones, cont);
        }
        return cont;
    }
    traducir(builder, parent) {
        let tempo = new StringBuilder();
        tempo.append("function ");
        if (this.padre != null) {
            let nuevo_id = this.generarNombre(this.identificador, this.padre);
            Manager.getManager().addF(this.identificador, nuevo_id);
            tempo.append(nuevo_id);
            // Traduccion de los parametros
            let param = new StringBuilder();
            if (this.parametros.length == 0) {
                tempo.append("( )");
            }
            else {
                tempo.append("(");
                for (let index = 0; index < this.parametros.length; index++) {
                    let element = this.parametros[index];
                    param.append(element.traducir(builder, parent));
                    if (index < this.parametros.length - 1) {
                        param.append(",");
                    }
                }
                tempo.append(param.toString());
                tempo.append(")");
            }
            // Fin
            this.tipoRetorno != null ? tempo.append(":" + this.getTipoToString(this.tipoRetorno)) : console.log("");
            tempo.append(" {\n");
            for (const instr of this.instrucciones) {
                try {
                    if (instr instanceof Funcion) {
                        builder.append(instr.traducir(builder, parent));
                    }
                    else {
                        tempo.append(instr.traducir(builder, nuevo_id));
                    }
                }
                catch (error) {
                    console.log(`Error en la funcion ${this.identificador}: ${error}`);
                }
            }
            tempo.append("}\n");
        }
        else {
            tempo.append(this.identificador);
            // Traduccion de los parametros
            let param = new StringBuilder();
            if (this.parametros.length == 0) {
                tempo.append("( )");
            }
            else {
                tempo.append("(");
                for (let index = 0; index < this.parametros.length; index++) {
                    let element = this.parametros[index];
                    param.append(element.traducir(builder, parent));
                    if (index < this.parametros.length - 1) {
                        param.append(",");
                    }
                }
                tempo.append(param.toString());
                tempo.append(")");
            }
            // Fin
            this.tipoRetorno != null ? tempo.append(":" + this.getTipoToString(this.tipoRetorno)) : console.log("");
            tempo.append(" {\n");
            for (const instr of this.instrucciones) {
                try {
                    if (instr instanceof Funcion) {
                        builder.append(instr.traducir(builder, parent));
                    }
                    else {
                        tempo.append(instr.traducir(builder, parent));
                    }
                }
                catch (error) {
                    console.log(`Error en la funcion ${this.identificador}: ${error}`);
                }
            }
            tempo.append("}\n");
        }
        return tempo.toString();
    }
    generarNombre(id, id_padre) {
        return id_padre + "_" + id;
    }
}
