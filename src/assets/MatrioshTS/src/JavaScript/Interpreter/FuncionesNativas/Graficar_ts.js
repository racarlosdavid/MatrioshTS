class Graficar_ts extends Funcion {
    constructor(identificador, padre, parametros, tipoRetorno, dimensiones, instrucciones, fila, columna) {
        super(identificador, padre, parametros, tipoRetorno, dimensiones, instrucciones, fila, columna);
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let r = ent.getReporte(ambito, padre);
        let data = " > " + "Graficar TS :\n";
        data += " > " + "ID                        TIPO          AMBITO            PADRE               VALOR\n";
        for (const tempo of r) {
            let tab = 25 - tempo.identificador.length;
            let t = "";
            for (let index = 0; index < tab; index++) {
                t += " ";
            }
            let tab2 = 15 - tempo.tipo.length;
            let t2 = "";
            for (let index = 0; index < tab2; index++) {
                t2 += " ";
            }
            let tab3 = 20 - tempo.ambito.length;
            let t3 = "";
            for (let index = 0; index < tab3; index++) {
                t3 += " ";
            }
            let tab4 = 20 - tempo.padre.length;
            let t4 = "";
            for (let index = 0; index < tab4; index++) {
                t4 += " ";
            }
            let tab5 = 15 - tempo.valor.length;
            let t5 = "";
            for (let index = 0; index < tab5; index++) {
                t5 += " ";
            }
            data += " > " + `${tempo.identificador + t}${tempo.tipo + t2}${tempo.ambito + t3}${tempo.padre + t4}${tempo.valor + t5}\n`;
        }
        consola.append(data);
        return null;
    }
    getDot(builder, parent, cont) {
        return cont;
    }
    traducir(builder, parent) {
        return "graficar_ts()";
    }
}
