 class Dot {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
    }
    graficarAST() {
        let dot = "";
        if (this.instrucciones.length > 0) {
            let codigodot = new StringBuilder();
            let cont = 1;
            let root = "nodo" + cont;
            codigodot.append("digraph MatrioshTS_AST {\n");
            codigodot.append("node [fontcolor=red shape=egg style=dotted];");
            codigodot.append(root + " [label=\"Raiz\"];\n");
            for (const instr of this.instrucciones) {
                try {
                    cont = instr.getDot(codigodot, root, cont);
                }
                catch (error) {
                    console.log("Error en la interpretacion: " + error);
                }
            }
            codigodot.append("}");
            //console.log("EL CODIGO DOT DEL AST: \n"+codigodot);
            //graficar();
            dot = codigodot.toString();
        }
        else {
            console.log("No hay nada para graficar el AST aun no se ha creado");
        }
        return dot;
    }
    graficar() {
    }
    getInstrucciones() {
        return this.instrucciones;
    }
    setInstrucciones(instrucciones) {
        this.instrucciones = instrucciones;
    }
}
