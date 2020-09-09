import { Instruccion } from "../../Abstract/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { StringBuilder } from "../../Edd/StringBuilder";
import { Expresion } from "../../Abstract/Expresion";
import { Type } from "../../TablaSimbolos/Tipo";
import { NodoError, TipoError } from "../../Reportes/NodoError";
import { Continue } from "../SentenciasTransferencia/Continue";
import { Break } from "../SentenciasTransferencia/Break";


export class While extends Instruccion{
    
    private condicion:Expresion;
    private instrucciones:Instruccion;

    constructor(condicion:Expresion, instrucciones:Instruccion, fila:number, columna:number) {
        super(fila,columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    ejecutar(ent: Entorno, er: ErrorManager) {
        let rcondicion = this.condicion.ejecutar(ent,er);
        
        if(rcondicion.tipo != Type.BOOLEAN){
            er.addError(new NodoError(TipoError.SEMANTICO, "La condicion no es booleana", this.fila, this.columna));
            return null;
        }
        while(rcondicion.valor == true){ 
            let r = this.instrucciones.ejecutar(ent,er);
            if(r != null || r != undefined){
                
                if(r instanceof Break)
                    break;
                else if(r instanceof Continue)
                    continue;
            }
            rcondicion = this.condicion.ejecutar(ent,er);
            if(rcondicion.tipo != Type.BOOLEAN){
                er.addError(new NodoError(TipoError.SEMANTICO, "La condicion no es booleana", this.fila, this.columna));
                return null;
            } 
        }
        return null;
        /*
        let bandera:boolean=false; console.log(this.condicion.ejecutar(ent,er).valor);
        while (this.condicion.ejecutar(ent,er).valor) {            
       
            if(bandera){
                bandera = false;
                continue;
            }
            let res = this.instrucciones.ejecutar(ent,er); 
   
            if(res != null || res != undefined){
                console.log(res);
                if(res instanceof Break)
                    break;
                else if(res instanceof Continue)
                    continue;
            }
            
        }
        return null;
        */
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        throw new Error("Method not implemented.");
    }

    traducir(builder: StringBuilder) {
        throw new Error("Method not implemented.");
    }

}