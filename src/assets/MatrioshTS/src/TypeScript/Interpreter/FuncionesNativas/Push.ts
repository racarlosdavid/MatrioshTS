import { Instruccion } from "../Abstract/Instruccion";
import { Retorno } from "../Abstract/Retorno";
import { Arreglo } from "../Edd/Arreglo";
import { MiType } from "../Edd/MiType";
import { StringBuilder } from "../Edd/StringBuilder";
import { Declaracion } from "../Instruccion/Declaracion";
import { Funcion } from "../Instruccion/Funcion";
import { Else } from "../Instruccion/SentenciasControlFlujo/Else";
import { ErrorManager } from "../Reportes/ErrorManager";
import { NodoError, TipoError } from "../Reportes/NodoError";
import { R_TS } from "../Reportes/R_TS";
import { Entorno } from "../TablaSimbolos/Entorno";
import { Simbolo } from "../TablaSimbolos/Simbolo";
import { Type } from "../TablaSimbolos/Tipo";
import { TSCollector } from "../TablaSimbolos/TSCollector";

export class Push extends Funcion{

    constructor(identificador:string, padre:string|null, parametros:Array<Declaracion>, tipoRetorno:Type|string|null, instrucciones:Array<Instruccion>, fila:number, columna:number){
        super(identificador,padre,parametros,tipoRetorno,instrucciones,fila,columna);
    }

    ejecutar(ent: Entorno, er: ErrorManager, consola: StringBuilder, tsCollector: TSCollector, reporte_ts: R_TS, ambito: string, padre: string) {
 
        let val:Simbolo|null = ent.GetValue("Nativa_Push_Arg1");
        let id:Simbolo|null = ent.GetValue("Nativa_Push_Arg2");
        if (id !=null) { 
            let r:Simbolo|null = ent.GetValue(id.valor);
            if (r!=null && r.valor instanceof Arreglo) { 
                if (val !=null) {
                    if ((r.tipo == val.tipo || val.valor instanceof Arreglo) && r.valor != null) {
                        r.valor.Add(val.valor);
                    }else{
                        er.addError(new NodoError(TipoError.SEMANTICO,"El tipo del arreglo "+this.getTipoToString(r.tipo)+" no coinciden con el tipo "+this.getTipoToString(val.tipo)+" del valor que se quiere agregar", this.fila, this.columna));
                        return null; 
                    }
                }
            }else {
                er.addError(new NodoError(TipoError.SEMANTICO,"El arreglo "+id.valor+" no se ha inicializado", this.fila, this.columna));
            }
        }
        return null;
    }

    

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        return cont;
    }

    traducir(builder: StringBuilder, parent: string) {
        return "";
    }

}