class ArrayTS extends Expresion {
    constructor(valores, fila, columna) {
        super(fila, columna);
        this.valores = valores;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let lista = [];
        let lista_tipos = [];
        if (this.valores.length != 0) {
            //console.log(this.valores);
            for (let i = 0; i < this.valores.length; i++) {
                const element = this.valores[i].ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
                lista.push(element.valor);
                lista_tipos.push(element.tipo);
            }
            let bandera = true;
            for (let i = 0; i < lista_tipos.length - 1; i++) {
                if (lista_tipos[i] == lista_tipos[i + 1]) {
                    continue;
                }
                else {
                    bandera = false;
                    break;
                }
            }
            if (!bandera) {
                er.addError(new NodoError(TipoError.SEMANTICO, "Los valores del arreglo, son de diferente tipo de dato ", this.fila, this.columna, padre));
                return "null";
            }
            return new Retorno(new Arreglo(lista, lista_tipos[0]), lista_tipos[0]);
        }
        return new Retorno(new Arreglo(lista, Type.ARRAY), Type.ARRAY);
    }
    getDot(builder, parent, cont) {
        let nodoValores = "nodo" + ++cont;
        builder.append(nodoValores + " [label=\"Valores\"];\n");
        builder.append(parent + " -> " + nodoValores + ";\n");
        for (let instr of this.valores) {
            cont = instr.getDot(builder, nodoValores, cont);
        }
        return cont;
    }
    traducir(builder) {
        let tempo = new StringBuilder();
        // Traduccion de los parametros
        let v = new StringBuilder();
        if (this.valores.length == 0) {
            tempo.append("[]");
        }
        else {
            tempo.append("[");
            for (let index = 0; index < this.valores.length; index++) {
                let element = this.valores[index];
                v.append(element.traducir(builder));
                if (index != this.valores.length - 1) {
                    v.append(",");
                }
            }
            tempo.append(v.toString());
            tempo.append("]\n");
        }
        // Fin 
        return tempo.toString();
    }
}
