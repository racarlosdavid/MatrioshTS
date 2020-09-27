import { Expresion } from "../Abstract/Expresion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "../Edd/StringBuilder";
import { Retorno } from "../Abstract/Retorno";
import { Type } from "../TablaSimbolos/Tipo";
import { NodoError,TipoError } from "../Reportes/NodoError";
import { TSCollector } from "../TablaSimbolos/TSCollector";
import { R_TS } from "../Reportes/R_TS";

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

    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        if (this.not) {
            let valorUnario = (this.operadorU == null) ? null : this.operadorU.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
            switch (this.tipoOperacion) {                
                case TipoOperacionLogica.NOT:
                    return this.notOperacion(valorUnario,er,ambito);
                default:
                    return null;
                 
            }
        } else {
            let left = (this.operadorIzq == null) ? null : this.operadorIzq.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
            let right = (this.operadorDer == null) ? null : this.operadorDer.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
            switch (this.tipoOperacion) {
                case TipoOperacionLogica.AND:
                    return this.and(left,right,er,ambito);
                case TipoOperacionLogica.OR:
                    return this.or(left,right,er,ambito);
                default:
                    return null;
            }
        }
    }


    and(left:any, right:any, er:ErrorManager, padre:string):any { 
     
        //let tipoResultante = this.getTipoResultante(left.tipo,right.tipo);
        if (left.tipo == Type.BOOLEAN && right.tipo == Type.BOOLEAN) {
            return new Retorno((left.valor && right.valor),left.tipo);
        } 
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible el and entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo), this.fila, this.columna, padre));
        return null; 
    }

    or(left:any, right:any, er:ErrorManager, padre:string):any { 
        //let tipoResultante = this.getTipoResultante(left.tipo,right.tipo);
        if (left.tipo == Type.BOOLEAN && right.tipo == Type.BOOLEAN) {
            return new Retorno((left.valor || right.valor),left.tipo);
        } 
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible el or entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo), this.fila, this.columna, padre));
        return null; 
    }

    notOperacion(unario:any, er:ErrorManager, padre:string):any { 
        if (unario.tipo == Type.BOOLEAN) {
            return new Retorno(!(unario.valor),unario.tipo);
        } 
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible realizar not de "+this.getTipoToString(unario.tipo), this.fila, this.columna,padre));
        return null; 
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        if (this.not) {
            let nodoOp:string = "nodo" + ++cont;
            builder.append(nodoOp+" [label=\""+this.getOperacionSimbolo(this.tipoOperacion)+"\"];\n");
            builder.append(parent+" -> "+nodoOp+";\n");
            
            if (this.operadorU!=null) {
                cont = this.operadorU?.getDot(builder, nodoOp, cont);
            }
        } else {
            let nodoOp:string = "nodo" + ++cont;
            builder.append(nodoOp+" [label=\""+this.getOperacionSimbolo(this.tipoOperacion)+"\"];\n");
            builder.append(parent+" -> "+nodoOp+";\n");

            if (this.operadorIzq!=null && this.operadorDer!=null) {
                cont = this.operadorIzq?.getDot(builder, nodoOp, cont);
                cont = this.operadorDer?.getDot(builder, nodoOp, cont);
            }
        
        }
        return cont; 

    }
   
    traducir(builder: StringBuilder) { 
        let trad:string ;
        if (this.not) {
            trad = "("+"!"+this.operadorU?.traducir(builder)+")";    
        } else {
            trad = "("+this.operadorIzq?.traducir(builder)+" "+this.getOperacionSimbolo(this.tipoOperacion)+" "+this.operadorDer?.traducir(builder)+")";
        }
        return trad;
    }

    getOperacionSimbolo(t:TipoOperacionLogica):string{
        switch (t) {
            case TipoOperacionLogica.AND:
                return "&&";
            case TipoOperacionLogica.OR:
                return "||";
            case TipoOperacionLogica.NOT:
                return "!";
            default:
                return "!";
        }
    }

}

export enum TipoOperacionLogica {
    AND,
    OR,
    NOT
}