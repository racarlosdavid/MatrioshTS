import { NTS } from "./NTS";

export class R_TS {
    lista_reporte_ts:NTS[];
    
    constructor() {
        this.lista_reporte_ts = [];
    }

    addListaR_TS(list:NTS[]){
        this.lista_reporte_ts = this.lista_reporte_ts.concat(list);
    }
    
    getListaR_TS(){
        return this.lista_reporte_ts;
    }
    
    addNTS(simbolo:NTS){
        this.lista_reporte_ts.push(simbolo);
    }
    
}