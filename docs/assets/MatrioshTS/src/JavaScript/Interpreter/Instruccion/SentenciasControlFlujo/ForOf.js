class ForOf extends Instruccion {
    constructor(tipoDeclaracion, variable, expresion, instrucciones, fila, columna) {
        super(fila, columna);
        this.tipoDeclaracion = tipoDeclaracion;
        this.variable = variable;
        this.expresion = expresion;
        this.instrucciones = instrucciones;
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let nuevo = new Entorno(ent);
        let vari = this.expresion.ejecutar(ent, er, consola, tsCollector, reporte_ts, "Local: ForOf", ambito);
        if (vari.valor instanceof Arreglo) {
            for (let index = 0; index < vari.valor.getTamaño(); index++) {
                const element = vari.valor.getValor(index);
                if (index == 0) {
                    nuevo.Add(this.variable, element, vari.tipo, 0, this.tipoDeclaracion);
                }
                else {
                    nuevo.ChangeValue(this.variable, element);
                }
                let r = this.instrucciones.ejecutar(nuevo, er, consola, tsCollector, reporte_ts, "Local: ForOf", ambito);
                if (r != null || r != undefined) {
                    if (r instanceof Break) {
                        break;
                    }
                    else if (r instanceof Continue) {
                        continue;
                    }
                    else {
                        return r;
                    }
                }
            }
        }
        reporte_ts.addLista(nuevo.getReporte("Local: ForOf", padre));
        return null;
    }
    getDot(builder, parent, cont) {
        return cont;
    }
    traducir(builder, parent) {
        let trad = new StringBuilder();
        trad.append("for ( ");
        if (this.tipoDeclaracion == TipoDeclaracion.LET) {
            trad.append("let ");
        }
        else if (this.tipoDeclaracion == TipoDeclaracion.CONST) {
            trad.append("const ");
        }
        trad.append(this.variable + " of " + this.expresion.traducir(builder) + ") {\n");
        trad.append(this.instrucciones.traducir(builder, parent));
        trad.append("}\n");
        return trad.toString();
    }
}
