import { Instruccion } from "../Abstract/Instruccion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "../Edd/StringBuilder";
import { Simbolo } from "../TablaSimbolos/Simbolo";
import { Retorno } from "../Abstract/Retorno";
import { Type } from "../TablaSimbolos/Tipo";
import { TSCollector } from "../TablaSimbolos/TSCollector";
import { R_TS } from "../Reportes/R_TS";


export class Incremento extends Instruccion{

    identificador:string;

    constructor(identificador:string, fila:number, columna:number){
        super(fila,columna);
        this.identificador = identificador; 
    }
    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        let obj:Simbolo|null = ent.GetValue(this.identificador);
        if (obj instanceof Simbolo) {  
            if (obj.tipo == Type.NUMBER) { 
                ent.ChangeValue(this.identificador,obj.valor+1);
            } else { 
                //Error no es de tipo number para hacer ++
            }
        }
        return null;
    }
    
    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodoId:string = "nodo" + ++cont;
        builder.append(nodoId+" [label=\""+this.identificador+"++\"];\n");
        builder.append(parent+" -> "+nodoId+"[color=\"red:black;0.50:red\"];\n");
        
        return cont;
    }

    traducir(builder: StringBuilder, parent: string) {
        return this.identificador+"++";
    }


}