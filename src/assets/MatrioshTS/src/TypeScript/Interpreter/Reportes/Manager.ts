import { NodoError } from "./NodoError";
import { NTS } from "./NTS";
import { R_TS } from "./R_TS";

export class Manager {
    private static _instance: Manager = new Manager();
    private error_colector: NodoError[] = [];
    private traductor: Map<string,any> = new Map();
    private lista_reporte_ts:NTS[] =[];
    sizeActual: Array<number> = [];

    constructor() {
        if (Manager._instance) {
            throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
        }
        Manager._instance = this;
    }

    public static getManager(): Manager {
        return Manager._instance;
    }

    reiniciar(){
        this.error_colector = [];
        this.traductor = new Map();
        this.lista_reporte_ts = [];
    }

    getColectorErrores(){
        return this.error_colector;
    }

    addError(error:NodoError){
        this.error_colector.push(error);
    }

    addColectorErrores(error:NodoError[]){
        this.error_colector = this.error_colector.concat(error);
    }

    addF(id:string,nuevo_id:string){
        this.traductor.set(id,nuevo_id);
    }

    getFid(id:string):string|null{
        if (this.traductor.has(id)){
            return this.traductor.get(id);
        }
        return null;
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