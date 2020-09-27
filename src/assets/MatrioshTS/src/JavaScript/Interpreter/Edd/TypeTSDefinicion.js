class TypeTSDefinicion extends Expresion {
    constructor(valores, fila, columna) {
        super(fila, columna);
        this.valores = valores;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        return new Retorno(this, Type.TYPE);
    }
    getDot(builder, parent, cont) {
        console.log("Method not implemented. TYPETS DEFINITION");
        return cont;
    }
    traducir(builder) {
        let tempo = new StringBuilder();
        // Traduccion de los parametros
        let v = new StringBuilder();
        if (this.valores.length == 0) {
            tempo.append("{ }");
        }
        else {
            tempo.append("{");
            for (let index = 0; index < this.valores.length; index++) {
                let element = this.valores[index];
                v.append(element.traducir(builder, ""));
                if (index != this.valores.length - 1) {
                    v.append(",");
                }
            }
            tempo.append(v.toString());
            tempo.append("}\n");
        }
        // Fin 
        return tempo.toString();
    }
}
