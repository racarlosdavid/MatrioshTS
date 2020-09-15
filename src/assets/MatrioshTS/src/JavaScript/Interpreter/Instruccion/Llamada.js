class Llamada extends Instruccion {
    constructor(identificador, argumentos, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
        this.argumentos = argumentos;
    }
    ejecutar(ent, er, consola, tsCollector) {
        let funcion = ent.GetFuncion(this.identificador);
        if (funcion != null) {
            let nuevo = new Entorno(ent);
            //tsCollector.addTS(this.identificador,new Entorno(ent));
            if (funcion.parametros.length == this.argumentos.length) {
                for (let index = 0; index < this.argumentos.length; index++) {
                    const param = funcion.parametros[index];
                    let v = this.argumentos[index].ejecutar(ent, er);
                    if (v.tipo != param.tipo) { //Si tipo del valor del parametro es igual al tipo de la variable de la funcion todo ok.
                        er.addError(new NodoError(TipoError.SEMANTICO, "El tipo del parametro " + v.tipo + " no coinciden con el tipo " + param.tipo + " de la funcion", this.fila, this.columna));
                        return null;
                    }
                    nuevo.Add(param.identificador, v.valor, param.tipo != null ? param.tipo : Type.INDEF, param.dimensiones, param.tipoDeclaracion);
                }
            }
            else {
                er.addError(new NodoError(TipoError.SEMANTICO, "La cantidad de parametros de la funcion " + this.identificador + " no coinciden", this.fila, this.columna));
                return null;
            }
            Manager.getManager().addListaR_TS(nuevo.getReporte("global", ""));
            for (const inst of funcion.instrucciones) {
                let result = inst.ejecutar(nuevo, er, consola, tsCollector);
                if (result != null) {
                    //Compruebo que el tipo de retorno sea igual que el tipo de retorno de la funcion
                    if (result.tipo == funcion.tipoRetorno || funcion.tipoRetorno == null) {
                        return result;
                    }
                    else {
                        console.log("error en el retorno de llamada");
                        er.addError(new NodoError(TipoError.SEMANTICO, "El tipo de retorno " + result.tipo + " no coinciden con el tipo de retorno" + funcion.tipoRetorno + " de la funcion", this.fila, this.columna));
                        return null;
                    }
                }
            }
        }
        else {
            er.addError(new NodoError(TipoError.SEMANTICO, "Funcion " + this.identificador + " no encontrada en la tabla de simbolos", this.fila, this.columna));
            return null;
        }
    }
    getDot(builder, parent, cont) {
        let nodo = "nodo" + ++cont;
        builder.append(nodo + " [label=\"Call Funcion\"];\n");
        builder.append(parent + " -> " + nodo + ";\n");
        let nodoId = "nodo" + ++cont;
        builder.append(nodoId + " [label=\"" + this.identificador + "\"];\n");
        builder.append(nodo + " -> " + nodoId + ";\n");
        let nodoParametros = "nodo" + ++cont;
        builder.append(nodoParametros + " [label=\"Argumentos\"];\n");
        builder.append(nodo + " -> " + nodoParametros + ";\n");
        for (let instr of this.argumentos) {
            cont = instr.getDot(builder, nodoParametros, cont);
        }
        return cont;
    }
    traducir(builder, parent) {
        let tempo = new StringBuilder();
        tempo.append(this.identificador);
        // Traduccion de los parametros
        let param = new StringBuilder();
        if (this.argumentos.length == 0) {
            tempo.append("( )");
        }
        else {
            tempo.append("(");
            for (let index = 0; index < this.argumentos.length; index++) {
                let element = this.argumentos[index];
                param.append(element.traducir(builder));
                if (index < this.argumentos.length - 1) {
                    param.append(",");
                }
            }
            tempo.append(param.toString());
            tempo.append(")");
        }
        // Fin
        return tempo.toString();
    }
}