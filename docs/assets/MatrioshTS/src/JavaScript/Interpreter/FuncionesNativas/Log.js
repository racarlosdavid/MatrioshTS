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
                    salida += val.valor;
                }
            }
        }
        if (salida != "") {
            consola.append(" > " + salida + "\n");
        }
        return null;
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
            if (index < this.valor.length - 1) {
                salida += ",";
            }
        }
        return "console.log(" + salida + ");\n";
    }
}
