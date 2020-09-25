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
        let data = " > "+"Graficar TS :\n";
        data +=" > "+"ID                        TIPO          AMBITO         PADRE        DESCRIPCION\n";
        for (const tempo of r) {
            
            let tab = 25-tempo.identificador.length
            let t = "";
            for (let index = 0; index < tab; index++) {
                t += " ";
            }

            let tab2 = 15-tempo.tipo.length
            let t2 = "";
            for (let index = 0; index < tab2; index++) {
                t2 += " ";
            }

            let tab3 = 15-tempo.ambito.length
            let t3 = "";
            for (let index = 0; index < tab3; index++) {
                t3 += " ";
            }

            let tab4 = 15-tempo.padre.length
            let t4 = "";
            for (let index = 0; index < tab4; index++) {
                t4 += " ";
            }

            let tab5 = 15-tempo.descripcion.length
            let t5 = "";
            for (let index = 0; index < tab5; index++) {
                t5 += " ";
            }

            data +=" > "+`${tempo.identificador+t}${tempo.tipo+t2}${tempo.ambito+t3}${tempo.padre+t4}${tempo.descripcion+t5}\n`;
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