
import { Tipo,Type } from "./Tipo";
import { Simbolo } from "./Simbolo";
import { TipoDeclaracion } from "../Instruccion/Declaracion";
import { Funcion } from "../Instruccion/Funcion";
import { NTS } from "../Reportes/NTS";
import { ArrayTS } from "../Edd/ArrayTS";
import { TypeTS } from "../Edd/TypeTS";
import { MiType } from "../Edd/MiType";
import { Arreglo } from "../Edd/Arreglo";

export class Entorno {
    
    private ts:Map<String, any> ;
    private anterior:Entorno | null;
    
    constructor (anterior:Entorno| null){
        this.ts = new Map();
        this.anterior = anterior;
    }
    
    public Add(id:string, value:any, tipo:Type|string, dimensiones : number, tipodeclaracion : TipoDeclaracion):void{
        //id = id.toLowerCase();
        if (!this.ts.has(id)){
            this.ts.set(id, new Simbolo(id,value,tipo,dimensiones,tipodeclaracion));
        }else{
            //("Ya existe el id: " + id);
        }
    }

    public  AddFunction(id:string, funcion:Funcion):boolean{
        //id = "$" + id.toLowerCase();
        id = "$" + id;
        if (!this.ts.has(id)){
            this.ts.set(id, funcion);
            return true;
        }else{
            //("Ya existe la funcion: " + id);
            return false;
        }
    }

    public GetFuncion(id:string):Funcion|null{
        let temp:Entorno|null = this;
        //id = "$" + id.toLowerCase();
        id = "$" + id;
        while (temp != null){
            if (temp.ts.has(id)){
                return temp.ts.get(id);
            }
            temp = temp.anterior;
        }
        //("No existe la funcion: " + id);
        return null;
    }

    public  AddType(id:string, type:TypeTS):void{
        //id = "#" + id.toLowerCase();
        id = "#" + id;
        if (!this.ts.has(id)){
            this.ts.set(id, type);
        }else{
            //("Ya existe la funcion: " + id);
        }
    }

    public GetType(id:string):TypeTS|null{
        let temp:Entorno|null = this;
        //id = "#" + id.toLowerCase();
        id = "#" + id;
        while (temp != null){
            if (temp.ts.has(id)){
                return temp.ts.get(id);
            }
            temp = temp.anterior;
        }
        //("No existe la funcion: " + id);
        return null;
    }
     
    public ChangeValue(id:any, value:any):void{ 
        let temp:Entorno | null = this;
        //id = id.toLowerCase();
        while(temp != null){
            if (temp.ts.has(id)){
                let s:Simbolo = temp.ts.get(id);
                s.valor = value; 
                break;
            }
            temp = temp.anterior;
        }
        //("No existe el id: " + id);
    }

    public GetValue(id:string):Simbolo|null{
        let temp:Entorno|null  = this;
        //id = id.toLowerCase();
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
        //id = id.toLowerCase();
        if (temp.ts.has(id)){
            result = true;
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


    getReporte(ambito:string, padre:string):Array<NTS>{
        let tabla:Array<NTS>  = []; 
        if (this.ts.size != 0){
            this.ts.forEach(function(valor, clave) {
                //console.log(clave + " = " + valor); 
                let nombre = clave+"";
                let tipo = "null";
                let sim = valor;
                let val = "";
                if (sim instanceof Funcion) {
                    tipo = "Funcion";
                }else if (sim instanceof TypeTS) {
                    tipo = "Type";
                }else if(sim instanceof Simbolo){
                    if (sim.valor instanceof Arreglo) {
                        tipo = "Arreglo: "+sim.getTipoToString();
                        val = sim.valor.imprimirArreglo(); 
                    }else if (sim.valor instanceof MiType) {
                        tipo = "Type: "+sim.getTipoToString();
                        val = sim.valor.imprimirType(); 
                    }else{
                        tipo = sim.getTipoToString();
                        val = sim.valor;
                    }
                
                }
                //console.log(nombre, tipo, ambito, padre, descripcion)
                tabla.push(new NTS(nombre, tipo, ambito, padre, val));
             
            });
        } else {
            //console.log("No hay nada para reportar la tabla de simbolos esta vacia");   
        }
        return tabla;
    }

    imprimir(){
        let tabla:Array<NTS>  = []; 
        if (this.ts.size != 0){
            //console.log("ID", "TIPIO", "AMBITO", "PADRE", "DESCRIPCION","\n")
            console.log("ID          TIPO          AMBITO          PADRE          DESCRIPCION\n");
            
            this.ts.forEach(function(valor, clave) {
                //console.log(clave + " = " + valor);
                let nombre = clave+"";
                let tipo = "null";
                let sim = valor;
                if (sim instanceof Funcion) {
                    let f:Funcion = sim;
                    tipo = "Funcion";
                    
                }else if(sim instanceof Simbolo){
                    let simbol:Simbolo = sim;
                    let val = simbol.valor;
                 
                    //if (val instanceof ArrayTS) {
                        //Arreglo ar = (Arreglo)val;
                        //tipo = "Arreglo: "+ar.getTipo();
                    //}else{
                        tipo = sim.getTipoToString();
                    //}
                
                }
                
                let descripcion = valor.valor.toString();
                //console.log(nombre, tipo, "ambito", "padre", descripcion,"\n")
            console.log(`${nombre}   ${tipo}       AMBITO          PADRE          ${descripcion}\n`);
             
            });
        } else {
            console.log("No hay nada para reportar la tabla de simbolos esta vacia");   
        }
        return tabla;

    }
    
}

