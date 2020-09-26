import { Expresion } from "../Abstract/Expresion";
import { Retorno } from "../Abstract/Retorno";
import { MiType } from "../Edd/MiType";
import { StringBuilder } from "../Edd/StringBuilder";
import { ErrorManager } from "../Reportes/ErrorManager";
import { NodoError, TipoError } from "../Reportes/NodoError";
import { R_TS } from "../Reportes/R_TS";
import { Entorno } from "../TablaSimbolos/Entorno";
import { Simbolo } from "../TablaSimbolos/Simbolo";
import { TSCollector } from "../TablaSimbolos/TSCollector";

export class Id extends Expresion{
    identificador:string;

    constructor(identificador:string, fila:number, columna:number) {   
        super(fila,columna);
        this.identificador = identificador;
    }

    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        let obj:Simbolo|null = ent.GetValue(this.identificador);
            //console.log("estas haciendo un acceso de tipo ID del id "+ this.identificador);
            if(obj!=null){ 
                //Primero compruebo que la variable tenga un valor sino hay que reportar error de acceso a variable sin haber asignado un valor
                if (obj.valor == "umdefined") { 
                    er.addError(new NodoError(TipoError.SEMANTICO,"No se puede usar la variable "+this.identificador+" sin haber asignado un valor", this.fila, this.columna));
                    return "null";  
                } else { 
                     return new Retorno(obj.valor,obj.tipo);
                }
            }else{
                er.addError(new NodoError(TipoError.SEMANTICO,"No se puede usar la variable \""+this.identificador+"\" si no ha sido declarada", this.fila, this.columna));
                return "null";  
            }
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodoId:string = "nodo" + ++cont;
        builder.append(nodoId+" [label=\""+this.identificador+"\"];\n");
        builder.append(parent+" -> "+nodoId+"[color=\"red:black;0.50:red\"];\n");
        return cont;
    }

    traducir(builder: StringBuilder) {
        return this.identificador;
    }
    
}