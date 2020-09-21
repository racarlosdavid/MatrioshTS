class R_TS {
    constructor() {
        this.lista_reporte_ts = [];
    }
    addListaR_TS(list) {
        this.lista_reporte_ts = this.lista_reporte_ts.concat(list);
    }
    addLista(list) {
        this.lista_reporte_ts = this.lista_reporte_ts.concat(list);
    }
    getListaR_TS() {
        return this.lista_reporte_ts;
    }
    addNTS(simbolo) {
        this.lista_reporte_ts.push(simbolo);
    }
}
