import { Entorno } from "../TablaSimbolos/Entorno";
import { NTS } from "./NTS";

export class R_TS {
    lista_reporte_ts:NTS[];
    lista_entornos:Array<Entorno>;
    
    constructor() {
        this.lista_reporte_ts = [];
        this.lista_entornos = [];
    }

    addListaR_TS(list:NTS[]){
        this.lista_reporte_ts = this.lista_reporte_ts.concat(list);
    }

    addLista(list:NTS[]){
        this.lista_reporte_ts = this.lista_reporte_ts.concat(list);
    }
    
    getListaR_TS(){
        return this.lista_reporte_ts;
    }
    
    addNTS(simbolo:NTS){
        this.lista_reporte_ts.push(simbolo);
    }

    addEntorno(ent:Entorno){
        this.lista_entornos.push(ent);
    }

    getEntornos(){
        return this.lista_entornos;
    }
    
}