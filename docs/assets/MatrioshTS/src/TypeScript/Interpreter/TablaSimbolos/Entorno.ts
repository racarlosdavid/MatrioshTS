
import { Tipo,Type } from "./Tipo";
import { Simbolo } from "./Simbolo";
import { TipoDeclaracion } from "../Instruccion/Declaracion";


export class Entorno {
    
    private ts:Map<String, any> ;
    private anterior:Entorno | null;
    
    constructor (anterior:Entorno| null){
        this.ts = new Map();
        this.anterior = anterior;
    }
    
    public Add(id:string, value:any, tipo:Type, inicializado : boolean, tipodeclaracion : TipoDeclaracion):void{
        id = id.toLowerCase();
        if (!this.ts.has(id)){
            this.ts.set(id, new Simbolo(id,value,tipo,inicializado,tipodeclaracion));
        }else{
            //("Ya existe el id: " + id);
        }
    }
/*
    public  AddFunction(id:string, funcion:Funcion):void{
        id = "$" + id.toLowerCase();
        if (!this.ts.has(id)){
            this.ts.set(id, funcion);
        }else{
            //("Ya existe la funcion: " + id);
        }
    }

    public GetFuncion(id:string):Funcion|null{
        let temp:Entorno|null = this;
        id = "$" + id.toLowerCase();
        while (temp != null){
            if (temp.ts.has(id)){
                return temp.ts.get(id);
            }
            temp = temp.anterior;
        }
        //("No existe la funcion: " + id);
        return null;
    }
 */       
    public ChangeValue(id:any, value:any):void{
        let temp:Entorno | null = this;
        id = id.toLowerCase();
        while(temp != null){
            if (temp.ts.has(id)){
                let s:Simbolo = temp.ts.get(id);
                s.valor = value;
            }
            temp = temp.anterior;
        }
        //("No existe el id: " + id);
    }

    public GetValue(id:string):Simbolo|null{
        let temp:Entorno|null  = this;
        id = id.toLowerCase();
        while(temp != null){
            if (temp.ts.has(id)){
                return temp.ts.get(id);
            }
            temp = temp.anterior;
        }
        //("No existe el id: " + id);
        return null;
    }
    
    public Existe(id:string):boolean{
        let result:boolean  = false;
        let temp:Entorno|null  = this;
        id = id.toLowerCase();
        while(temp != null){
            if (temp.ts.has(id)){
                result = true;
            }
            temp = temp.anterior;
        }
        //("No existe el id: " + id);
        return result;
    }

    public  GetGlobal():Entorno{
        let temp:Entorno = this;
        while (temp.anterior != null)
            temp = temp.anterior;
        return temp;
    }

    public getTs():Map<String, any> {
        return this.ts;
    }

    public setTs(ts:Map<String, any>):void {
        this.ts = ts;
    }

    public getAnterior():Entorno|null {
        return this.anterior;
    }

    public setAnterior(anterior:Entorno):void {
        this.anterior = anterior;
    }
    
    public getTipo(valor:any):string {
        if (valor instanceof Number ) {
            return "numeric";
        } else if (valor instanceof String) {
            return "String";
        } else if (valor instanceof Boolean) {
            return "boolean";
        }
        return "null";
    }
    
}

