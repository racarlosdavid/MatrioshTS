import { Expresion } from "../Abstract/Expresion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "../Edd/StringBuilder";
import { Retorno } from "../Abstract/Retorno";
import { Type } from "../TablaSimbolos/Tipo";
import { NodoError,TipoError } from "../Reportes/NodoError";

export class Logica extends Expresion{

    not:boolean;
    tipoOperacion:TipoOperacionLogica;
    operadorIzq:Expresion | null;
    operadorDer:Expresion | null;
    operadorU:Expresion | null;
    
    constructor(tipoOperacion:TipoOperacionLogica, operadorIzq:Expresion | null, operadorDer:Expresion | null, operadorU:Expresion | null, not:boolean, fila:number, columna:number) {
        super(fila,columna);
        this.tipoOperacion = tipoOperacion;
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
        this.operadorU = operadorU;
        this.not = not;
    }

    ejecutar(ent: Entorno, er: ErrorManager) {
        if (this.not) {
            let valorUnario = (this.operadorU == null) ? null : this.operadorU.ejecutar(ent,er);
            switch (this.tipoOperacion) {                
                case TipoOperacionLogica.NOT:
                    return this.notOperacion(valorUnario,ent,er);
                default:
                    return null;
                 
            }
        } else {
            let left = (this.operadorIzq == null) ? null : this.operadorIzq.ejecutar(ent,er);
            let right = (this.operadorDer == null) ? null : this.operadorDer.ejecutar(ent,er);
            switch (this.tipoOperacion) {
                case TipoOperacionLogica.AND:
                    return this.and(left,right,ent,er);
                case TipoOperacionLogica.OR:
                    return this.or(left,right,ent,er);
                default:
                    return null;
            }
        }
    }


    and(left:any, right:any, ent:Entorno, er:ErrorManager):any { 
     
        let tipoResultante = this.getTipoResultante(left.tipo,right.tipo);
        if (tipoResultante == Type.BOOLEAN) {
            return new Retorno((left.valor && right.valor),tipoResultante);
        } 
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible el and entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo), this.fila, this.columna));
        return null; 
    }

    or(left:any, right:any, ent:Entorno, er:ErrorManager):any { 
        let tipoResultante = this.getTipoResultante(left.tipo,right.tipo);
        if (tipoResultante == Type.BOOLEAN) {
            return new Retorno((left.valor || right.valor),tipoResultante);
        } 
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible el or entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo), this.fila, this.columna));
        return null; 
    }

    notOperacion(unario:any, ent:Entorno, er:ErrorManager):any { 
        if (unario.tipo == Type.BOOLEAN) {
            return new Retorno(!(unario.valor),unario.tipo);
        } 
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible realizar not de "+this.getTipoToString(unario.tipo), this.fila, this.columna));
        return null; 
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        throw new Error("Method not implemented.");
    }
    traducir(builder: StringBuilder) {
        throw new Error("Method not implemented.");
    }

}

export enum TipoOperacionLogica {
    AND,
    OR,
    NOT
}