import { Expresion } from "../Abstract/Expresion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "../Edd/StringBuilder";
import { Simbolo } from "../TablaSimbolos/Simbolo";
import { ArrayTS } from "../Edd/ArrayTS";
import { Retorno } from "../Abstract/Retorno";
import { Type } from "../TablaSimbolos/Tipo";
import { NodoError, TipoError } from "../Reportes/NodoError";

export class Acceso extends Expresion{
  
    identificador:string;
    tipoacceso:TipoAcceso;
    accesos:Array<Expresion>;

    constructor(identificador:string, tipoacceso:TipoAcceso, accesos:Array<Expresion>, fila:number, columna:number) {
        super(fila,columna);
        this.identificador = identificador;
        this.tipoacceso = tipoacceso;
        this.accesos = accesos;
    }

    ejecutar(ent: Entorno, er: ErrorManager) { 
        let obj:Simbolo|null = ent.GetValue(this.identificador);
        if (this.tipoacceso == TipoAcceso.ID) { 
            //console.log("estas haciendo un acceso de tipo ID del id "+ this.identificador);
            if(obj!=null){ 
                //Primero compruebo que la variable tenga un valor sino hay que reportar error de acceso a variable sin haber asignado un valor
                if (obj.valor == "null") { 
                    er.addError(new NodoError(TipoError.SEMANTICO,"No se puede usar la variable "+this.identificador+" sin haber asignado un valor", this.fila, this.columna));
                    return null;  
                } else {
                    
                    return new Retorno(obj.valor,obj.tipo); 
                }
                
                /*
                if (obj instanceof ArrayTS) {
                    let a:ArrayTS = obj;
                    return a.valores;
                } else {
                    
                }
                */
                
            }
        } 
        
        
        return null;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        return cont;
    }

    traducir(builder: StringBuilder) {
        if (this.tipoacceso == TipoAcceso.ID) {
            return this.identificador;
        }
        return ""; //falta implementar los otros tipos de acceso
    }
}

export enum TipoAcceso {
    ID,
    ARRAY,
    TYPE
}