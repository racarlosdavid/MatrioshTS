import { Instruccion } from "../Abstract/Instruccion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "../Edd/StringBuilder";
import { NodoError, TipoError } from "../Reportes/NodoError";
import { Funcion } from "./Funcion";
import { TSCollector } from "../TablaSimbolos/TSCollector";
import { R_TS } from "../Reportes/R_TS";
import { Incremento } from "../FuncionesNativas/Incremento";
import { Manager } from "../Reportes/Manager";

export class Bloque extends Instruccion{
    
    instrucciones:Array<Instruccion>;

    constructor(instrucciones:Array<Instruccion>, linea:number, columna:number){
        super(linea, columna);
        this.instrucciones = instrucciones;  
    } 

    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        let nuevo = new Entorno(ent);
        reporte_ts.addEntorno(nuevo);
        for(const instr of this.instrucciones){  
            try {
                let element = instr.ejecutar(nuevo,er,consola,tsCollector,reporte_ts,ambito,padre); 
                if(element != undefined || element != null){ 
                    /*Si no hay recursividad agrego la tabla del entorno al colector para el reporte de todos los entorno
                    Si hay recursividad no agrego nada porque se encicla ya que son muchos valores */
                    if (Manager.getManager().getBanderaRecursividad() == false) {
                        reporte_ts.addLista(nuevo.getReporte(ambito, padre));
                    }
                    return element;       
                }
                             
            } catch (error) {
                er.addError(new NodoError(TipoError.SEMANTICO, ""+error+"", this.fila, this.columna,ambito));
        
            }
        }
        reporte_ts.addLista(nuevo.getReporte(ambito, padre));
        return null;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodo:string = "nodo" + ++cont;
        builder.append(nodo+" [label=\"Instrucciones\"];\n");
        builder.append(parent+" -> "+nodo+";\n");
    
        for (const instr of this.instrucciones) {
            cont = instr.getDot(builder, nodo, cont);
        }
        
        return cont;
    }

    traducir(builder: StringBuilder, parent: string) {
        let nuevo = new StringBuilder();
        for(const instr of this.instrucciones){ 
            try {
                //if (instr instanceof Funcion) { 
                  //  builder.append(instr.traducir(builder,parent));
                //} else {
                    nuevo.append(instr.traducir(builder,parent)+"\n");
                //}
            } catch (error) {
                console.log(`Error en la traduccion Bloque: ${error}`);
                //er.addError(new NodoError(TipoError.SEMANTICO, ""+error+"", this.fila, this.columna));
            }
        }
        return nuevo.toString();
    }

    
}