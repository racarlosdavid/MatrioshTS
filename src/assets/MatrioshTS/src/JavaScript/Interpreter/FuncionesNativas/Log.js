class Log extends Instruccion {
    constructor(valor, fila, columna) {
        super(fila, columna);
        this.valor = valor;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let val = this.valor.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
        if (val != "null") {
            if (val.valor instanceof Arreglo) {
                consola.append(" > " + val.valor.imprimirArreglo() + "\n");
            }
            else {
                if (val.tipo == Type.STRING && val.valor.includes("${")) {
                    let s = this.procesar(ent, val.valor);
                    consola.append(" > " + s + "\n");
                }
                else {
                    consola.append(" > " + val.valor + "\n");
                }
            }
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
        console.log("getDot de Log no esta implementado solo retorna el cont para que no de error");
        return cont;
    }
    traducir(builder, parent) {
        return "console.log(" + this.valor.traducir(builder) + ");\n";
    }
}
