import { Instruccion } from "../../Abstract/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { StringBuilder } from "../../Edd/StringBuilder";
import { Continue } from "../SentenciasTransferencia/Continue";
import { NodoError, TipoError } from "../../Reportes/NodoError";

export class Default extends Instruccion{
    private instrucciones:Array<Instruccion> ;

    constructor(instrucciones:Array<Instruccion> , fila:number, columna:number) {
        super(fila,columna);
        this.instrucciones = instrucciones;
    }
    
    ejecutar(ent: Entorno, er: ErrorManager) {
        let nuevo=new Entorno(ent);
        for(let inst of this.instrucciones){
            let r = inst.ejecutar(nuevo,er);
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
        throw new Error("Method not implemented.");
    }
    traducir(builder: StringBuilder) {
        throw new Error("Method not implemented.");
    }
    
    
}
