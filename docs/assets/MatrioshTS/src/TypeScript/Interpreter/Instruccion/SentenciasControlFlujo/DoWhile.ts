import { Instruccion } from "../../Abstract/Instruccion";
import { Expresion } from "../../Abstract/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { StringBuilder } from "../../Edd/StringBuilder";
import { Break } from "../SentenciasTransferencia/Break";
import { Continue } from "../SentenciasTransferencia/Continue";
import { Type } from "../../TablaSimbolos/Tipo";
import { TipoError, NodoError } from "../../Reportes/NodoError";

export class DoWhile extends Instruccion{

    private instrucciones:Instruccion;
    private condicion:Expresion;

    constructor(instrucciones:Instruccion, condicion:Expresion, fila:number, columna:number) {
        super(fila,columna);
        this.instrucciones = instrucciones;
        this.condicion = condicion;
    }

    ejecutar(ent: Entorno, er: ErrorManager) {
        let rcondicion;
        do {    
            let r = this.instrucciones.ejecutar(ent,er);
            
            if(r != null || r != undefined){
                if(r instanceof Break){ 
                    break;
                } else if(r instanceof Continue){
                    continue;
                } 
            }
            rcondicion = this.condicion.ejecutar(ent,er);
            if(rcondicion.tipo != Type.BOOLEAN){ 
                er.addError(new NodoError(TipoError.SEMANTICO, "La condicion no es booleana", this.fila, this.columna));
                return null;
            }
        } while (rcondicion.valor);
        return null;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        throw new Error("Method not implemented.");
    }

    traducir(builder: StringBuilder) {
        throw new Error("Method not implemented.");
    }
    
}