import { Entorno } from "./Entorno";

export class TSCollector {
    private ts:Map<String,any>;

    constructor (){
        this.ts = new Map();
    }

    addTS(id:string, tabla:Entorno){
        id = id.toLowerCase();
        if (!this.ts.has(id)){
            this.ts.set(id,tabla);
        }else{
            //("Ya existe el id: " + id);
        }
    }

    public GetValue(id:string):Entorno|null{
        id = id.toLowerCase();
        let temp:Entorno|null  = null;
        if (this.ts.has(id)){
            let s:Entorno = this.ts.get(id);
            return s;
        }
        //("No existe el id: " + id);
        return null;
    }
    
    public Existe(id:string):boolean{
        let result:boolean  = false;
        if (this.ts.has(id)){
            result = true;
        }
        return result;
    }
}