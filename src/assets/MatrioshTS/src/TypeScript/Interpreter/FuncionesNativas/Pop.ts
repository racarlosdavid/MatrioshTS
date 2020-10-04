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



export class Pop extends Instruccion{
    identificador:string;

    constructor(identificador:string, fila:number, columna:number){
        super(fila,columna);
        this.identificador = identificador;
    }
    
    ejecutar(ent: Entorno, er: ErrorManager, consola: StringBuilder, tsCollector: TSCollector, reporte_ts: R_TS, ambito: string, padre: string) {
        let r:Simbolo|null = ent.GetValue(this.identificador); 
        if (r!=null && r.valor instanceof Arreglo) { 
            let val = r.valor.popArreglo();
            return new Retorno(val,r.tipo);
        }
        return null;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        //throw new Error("Method not implemented.");
        return cont;
    }

    traducir(builder: StringBuilder, parent: string) {
        return this.identificador+".pop()";
    }

}
