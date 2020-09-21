class Graficar_ts extends Funcion {
    constructor(identificador, padre, parametros, tipoRetorno, instrucciones, fila, columna) {
        super(identificador, padre, parametros, tipoRetorno, instrucciones, fila, columna);
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        let r = ent.getReporte(ambito, padre);
        let data = "";
        for (const tempo of r) {
            data += tempo.identificador + " " + tempo.tipo + " " + tempo.ambito + " " + tempo.descripcion + "\n";
        }
        consola.append(data);
        return null;
    }
    getDot(builder, parent, cont) {
        return cont;
    }
    traducir(builder, parent) {
        return "";
    }
}
