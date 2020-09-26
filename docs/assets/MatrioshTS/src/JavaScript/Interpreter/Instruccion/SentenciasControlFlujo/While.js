class While extends Instruccion {
    constructor(condicion, instrucciones, fila, columna) {
        super(fila, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let rcondicion = this.condicion.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
        if (rcondicion == null) {
            return null;
        }
        if (rcondicion.tipo != Type.BOOLEAN) {
            er.addError(new NodoError(TipoError.SEMANTICO, "La condicion no es booleana", this.fila, this.columna));
            return null;
        }
        while (rcondicion.valor == true) {
            let r = this.instrucciones.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
            if (r != null || r != undefined) {
                if (r instanceof Break || r instanceof Return)
                    break;
                else if (r instanceof Continue)
                    continue;
            }
            rcondicion = this.condicion.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
            if (rcondicion == null) {
                return null;
            }
            if (rcondicion.tipo != Type.BOOLEAN) {
                er.addError(new NodoError(TipoError.SEMANTICO, "La condicion no es booleana", this.fila, this.columna));
                return null;
            }
        }
        return null;
        /*
        let bandera:boolean=false; console.log(this.condicion.ejecutar(ent,er).valor);
        while (this.condicion.ejecutar(ent,er).valor) {
       
            if(bandera){
                bandera = false;
                continue;
            }
            let res = this.instrucciones.ejecutar(ent,er);
   
            if(res != null || res != undefined){
                console.log(res);
                if(res instanceof Break)
                    break;
                else if(res instanceof Continue)
                    continue;
            }
            
        }
        return null;
        */
    }
    getDot(builder, parent, cont) {
        let nodo = "nodo" + ++cont;
        builder.append(nodo + " [label=\"While\"];\n");
        builder.append(parent + " -> " + nodo + ";\n");
        let nodoCondicion = "nodo" + ++cont;
        builder.append(nodoCondicion + " [label=\"Condicion\"];\n");
        builder.append(nodo + " -> " + nodoCondicion + ";\n");
        cont = this.condicion.getDot(builder, nodoCondicion, cont);
        let nodoInstrucciones = "nodo" + ++cont;
        builder.append(nodoInstrucciones + " [label=\"Instrucciones\"];\n");
        builder.append(nodo + " -> " + nodoInstrucciones + ";\n");
        cont = this.instrucciones.getDot(builder, nodoInstrucciones, cont);
        return cont;
    }
    traducir(builder, parent) {
        let trad = new StringBuilder();
        trad.append("while (" + this.condicion.traducir(builder) + ") {\n");
        trad.append(this.instrucciones.traducir(builder, parent));
        trad.append("}\n");
        return trad.toString();
    }
}
