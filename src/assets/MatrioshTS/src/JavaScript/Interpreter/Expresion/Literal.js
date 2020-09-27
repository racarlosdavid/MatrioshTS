class Literal extends Expresion {
    constructor(valor, tipo, tipoString, fila, columna) {
        super(fila, columna);
        this.valor = valor;
        this.tipo = tipo;
        this.tipoString = tipoString;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        if (this.tipoString == TipoString.STRING3) {
            let s = this.procesar(ent, this.valor);
            return new Retorno(s, this.tipo);
        }
        else {
            return new Retorno(this.valor, this.tipo);
        }
    }
    getDot(builder, parent, cont) {
        let nodoOp = "nodo" + ++cont;
        builder.append(nodoOp + " [label=\"" + this.valor + "\"];\n");
        builder.append(parent + " -> " + nodoOp + "[color=\"red:black;0.50:red\"];\n");
        return cont;
    }
    traducir(builder) {
        if (this.tipoString == TipoString.STRING1) {
            return "\"" + this.valor.toString() + "\"";
        }
        else if (this.tipoString == TipoString.STRING2) {
            return "\'" + this.valor.toString() + "\'";
        }
        else if (this.tipoString == TipoString.STRING3) {
            return "\`" + this.valor.toString() + "\`";
        }
        return this.valor.toString();
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
}
var TipoString;
(function (TipoString) {
    TipoString[TipoString["STRING1"] = 0] = "STRING1";
    TipoString[TipoString["STRING2"] = 1] = "STRING2";
    TipoString[TipoString["STRING3"] = 2] = "STRING3";
    TipoString[TipoString["INDEF"] = 3] = "INDEF";
})(TipoString || (TipoString = {}));
