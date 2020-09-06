import { Instruccion } from "../../Abstract/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { StringBuilder } from "../../Edd/StringBuilder";
import { Expresion } from "../../Abstract/Expresion";
import { NodoError, TipoError } from "../../Reportes/NodoError";
import { Retorno } from "../../Abstract/Retorno";
import { Type } from "../../TablaSimbolos/Tipo";

export class If extends Instruccion { 
    
    condicion:Expresion ; 
    instrucciones:Instruccion;
    ins_else:Instruccion|null; 


    constructor( condicion:Expresion, instrucciones:Instruccion, ins_else: Instruccion | null,  fila:number, columna:number) {
        super(fila,columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.ins_else = ins_else;
    }

    ejecutar(ent: Entorno, er: ErrorManager) {
        let rcondicion:any = this.condicion.ejecutar(ent,er);
        if(rcondicion instanceof Retorno){
            if (rcondicion.tipo != Type.BOOLEAN) {
                er.addError(new NodoError(TipoError.SEMANTICO, "Se esperaba una condicional booleana en la instruccion if "+rcondicion+" no es boolean", this.fila, this.columna));
                return null;
            }
            if (rcondicion.valor == true) {
                return this.instrucciones.ejecutar(ent,er);
            }else{
                return this.ins_else?.ejecutar(ent,er);
            }
        }else{
            er.addError(new NodoError(TipoError.SEMANTICO, "Se esperaba una condicional booleana en la instruccion if "+rcondicion+" no es boolean", this.fila, this.columna));
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