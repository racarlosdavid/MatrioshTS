import { Instruccion } from "../Abstract/Instruccion";
import { Retorno } from "../Abstract/Retorno";
import { Arreglo } from "../Edd/Arreglo";
import { StringBuilder } from "../Edd/StringBuilder";
import { Declaracion } from "../Instruccion/Declaracion";
import { Funcion } from "../Instruccion/Funcion";
import { ErrorManager } from "../Reportes/ErrorManager";
import { R_TS } from "../Reportes/R_TS";
import { Entorno } from "../TablaSimbolos/Entorno";
import { Simbolo } from "../TablaSimbolos/Simbolo";
import { Type } from "../TablaSimbolos/Tipo";
import { TSCollector } from "../TablaSimbolos/TSCollector";

export class Pop extends Funcion{

    constructor(identificador:string, padre:string|null, parametros:Array<Declaracion>, tipoRetorno:Type|string|null, instrucciones:Array<Instruccion>, fila:number, columna:number){
        super(identificador,padre,parametros,tipoRetorno,instrucciones,fila,columna);
    }

    ejecutar(ent: Entorno, er: ErrorManager, consola: StringBuilder, tsCollector: TSCollector, reporte_ts: R_TS, ambito: string, padre: string) {
        
        let result:Simbolo|null = ent.GetValue("Nativa_Pop_Arg1");
        if (result !=null) {
            let r:Simbolo|null = ent.GetValue(result.valor);
            if (r!=null && r.valor instanceof Arreglo) {
                let val = r.valor.popArreglo();
                return new Retorno(val,r.tipo);
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