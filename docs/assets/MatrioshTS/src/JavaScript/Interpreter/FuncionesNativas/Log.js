class Log extends Instruccion {
    constructor(valor, fila, columna) {
        super(fila, columna);
        this.valor = valor;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let salida = "";
        for (let index = 0; index < this.valor.length; index++) {
            const element = this.valor[index];
            let val = element.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
            if (val != null) {
                if (val.valor instanceof Arreglo) {
                    salida += val.valor.imprimirArreglo();
                }
                else if (val.valor instanceof MiType) {
                    salida += val.valor.imprimirType();
                }
                else {
                    if (val.tipo == Type.STRING && val.valor.includes("${")) {
                        let s = this.procesar(ent, val.valor);
                        salida += s;
                    }
                    else {
                        salida += val.valor;
                    }
                }
            }
        }
        if (salida != "") {
            consola.append(" > " + salida + "\n");
        }
        return null;
    }
    procesar(ent, cadena) {
        let id = "";
        let variables = [];
        let s = "";
        let bandera = false;
        let cont = 0;
        for (let index = 0; index < cadena.length; index++) {
            const element = cadena[index];
            if (element == "$") {
                s += "$" + cont;
                cont++;
            }
            else if (element == "{") {
                bandera = true;
            }
            else if (element == "}") {
                bandera = false;
                variables.push(id);
                id = "";
            }
            if (bandera && element != "{") {
                id += element;
            }
            if (!bandera && element != "$" && element != "}") {
                s += element;
            }
        }
        for (let index = 0; index < variables.length; index++) {
            let element = ent.GetValue(variables[index]);
            let valor = element === null || element === void 0 ? void 0 : element.valor;
            s = s.replace("$" + index, valor);
        }
        return s;
    }
    getDot(builder, parent, cont) {
        let nodo = "nodo" + ++cont;
        builder.append(nodo + " [label=\"Console.log\"];\n");
        builder.append(parent + " -> " + nodo + ";\n");
        for (let index = 0; index < this.valor.length; index++) {
            const element = this.valor[index];
            cont = element.getDot(builder, parent, cont);
        }
        return cont;
    }
    traducir(builder, parent) {
        let salida = "";
        for (let index = 0; index < this.valor.length; index++) {
            const element = this.valor[index];
            salida += element.traducir(builder);
        }
        return "console.log(" + salida + ");\n";
    }
}
