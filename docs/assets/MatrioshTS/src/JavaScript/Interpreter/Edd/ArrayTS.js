class ArrayTS extends Expresion {
    constructor(valores, fila, columna) {
        super(fila, columna);
        this.valores = valores;
    }
    ejecutar(ent, er) {
        let lista = [];
        let lista_tipos = [];
        if (this.valores.length != 0) {
            //console.log(this.valores);
            for (let i = 0; i < this.valores.length; i++) {
                const element = this.valores[i].ejecutar(ent, er);
                lista.push(element.valor);
                lista_tipos.push(element.tipo);
            }
            let bandera = true;
            for (let i = 0; i < lista_tipos.length - 1; i++) {
                if (lista_tipos[i] == lista_tipos[i + 1]) {
                    console.log(lista_tipos[i] + " " + lista_tipos[i + 1]);
                    continue;
                }
                else {
                    bandera = false;
                    break;
                }
            }
            if (!bandera) {
                er.addError(new NodoError(TipoError.SEMANTICO, "Los valores del arreglo, son de diferente tipo de dato ", this.fila, this.columna));
                return "null";
            }
            return new Retorno(new Arreglo(lista, lista_tipos[0]), lista_tipos[0]);
        }
        return new Retorno(new Arreglo(lista, Type.ARRAY), Type.ARRAY);
    }
    getDot(builder, parent, cont) {
        console.log("Method not implemented. ARRAY TS");
        return cont;
    }
    traducir(builder) {
        throw new Error("Method not implemented. ARRAY TS");
    }
}
