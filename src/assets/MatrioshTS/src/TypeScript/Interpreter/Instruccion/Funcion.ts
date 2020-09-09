import { Instruccion } from "../Abstract/Instruccion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "../Edd/StringBuilder";
import { Declaracion } from "./Declaracion";

export class Funcion extends Instruccion{
    identificador:string;
    padre:string|null;
    parametros:Array<Declaracion>;
    instrucciones:Instruccion; 

    constructor(identificador:string, padre:string|null, parametros:Array<Declaracion>,instrucciones:Instruccion, fila:number, columna:number){
        super(fila,columna);
        this.identificador = identificador;
        this.padre = padre;
        this.parametros = parametros;
        this.instrucciones = instrucciones; 
    }

    ejecutar(ent: Entorno, er: ErrorManager) {
        
        //console.log("SOY UNA FUNCION "+this.identificador+" "+this.padre);
        /*
        let t = new StringBuilder();
        if (this.padre!=null) {
            let nuevo_id  = this.generarNombre(this.identificador,this.padre);
            console.log( nuevo_id +"( ) {\n"+this.instrucciones.traducir(t)+"\n}\n" );
        }
        */

       var str = "Suma_Resta"; 
       var splitted = str.split("_"); 
       console.log("Yo soy "+splitted[1] +" y mi padre es "+splitted[0])
       console.log(" El id de la funcion "+this.identificador);
        
        this.instrucciones.ejecutar(ent,er);
        return null;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        throw new Error("Method not implemented.");
    }

    traducir(builder: StringBuilder) {
        let tempo ; 
        if (this.padre!=null) { 
            let nuevo_id  = this.generarNombre(this.identificador,this.padre);
            tempo = nuevo_id +"( ) {\n"+this.instrucciones.traducir(builder)+"\n}\n";
        }else{
            tempo= this.identificador +"( ) {\n"+this.instrucciones.traducir(builder)+"\n}\n";
        }
        
        return tempo;
    }

    generarNombre(id:string, id_padre:string):string{
        return id_padre+"_"+id;
    }
    
}