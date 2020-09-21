import { Instruccion } from "../Abstract/Instruccion";
import { StringBuilder } from "../Edd/StringBuilder";
import { Declaracion } from "../Instruccion/Declaracion";
import { Funcion } from "../Instruccion/Funcion";
import { ErrorManager } from "../Reportes/ErrorManager";
import { R_TS } from "../Reportes/R_TS";
import { Entorno } from "../TablaSimbolos/Entorno";
import { Type } from "../TablaSimbolos/Tipo";
import { TSCollector } from "../TablaSimbolos/TSCollector";

export class Graficar_ts extends Funcion{

    constructor(identificador:string, padre:string|null, parametros:Array<Declaracion>, tipoRetorno:Type|string|null, instrucciones:Array<Instruccion>, fila:number, columna:number){
        super(identificador,padre,parametros,tipoRetorno,instrucciones,fila,columna);
    }

    ejecutar(ent: Entorno, er: ErrorManager, consola: StringBuilder, tsCollector: TSCollector, reporte_ts: R_TS, ambito: string, padre: string) {
        let r = ent.getReporte(ambito,padre);
        let data = "";
        for (const tempo of r) {
            data += tempo.identificador+" "+tempo.tipo+" "+tempo.ambito+" "+tempo.descripcion+"\n"
        }
        consola.append(data);
        return null;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        return cont;
    }

    traducir(builder: StringBuilder, parent: string) {
        return "";
    }



}