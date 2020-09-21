import { Instruccion } from "../../Abstract/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { StringBuilder } from "../../Edd/StringBuilder";
import { Continue } from "../SentenciasTransferencia/Continue";
import { NodoError, TipoError } from "../../Reportes/NodoError";
import { TSCollector } from "../../TablaSimbolos/TSCollector";
import { R_TS } from "../../Reportes/R_TS";

export class Default extends Instruccion{
    private instrucciones:Array<Instruccion> ;

    constructor(instrucciones:Array<Instruccion> , fila:number, columna:number) {
        super(fila,columna);
        this.instrucciones = instrucciones;
    }
    
    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        let nuevo=new Entorno(ent);
        for(let inst of this.instrucciones){
            let r = inst.ejecutar(nuevo,er,consola,tsCollector,reporte_ts,ambito,padre);
            if(r!=null){
                if(r instanceof Continue){
                    er.addError(new NodoError(TipoError.SEMANTICO, " Continue no es valido en switch", inst.fila, inst.columna));
                    continue;
                }else{ 
                    return r;
                }
                
            }
        }
        
        return null;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodo:string = "nodo" + ++cont;
        builder.append(nodo+" [label=\"Default\"];\n");
        builder.append(parent+" -> "+nodo+";\n");

        for (let instr of this.instrucciones) {
            cont = instr.getDot(builder, nodo, cont);
        }
        
        return cont;
    }

    traducir(builder: StringBuilder, parent: string) {
        let trad = new StringBuilder();

        trad.append("default : \n");
        
        for (let instr of this.instrucciones) {
            trad.append(instr.traducir(builder,parent));
        }
        
        return trad.toString();
    }
    
    
}
