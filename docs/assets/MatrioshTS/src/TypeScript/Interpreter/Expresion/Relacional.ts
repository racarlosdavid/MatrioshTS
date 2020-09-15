import { Expresion } from "../Abstract/Expresion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "../Edd/StringBuilder";
import { Type } from "../TablaSimbolos/Tipo";
import { NodoError, TipoError } from "../Reportes/NodoError";
import { Retorno } from "../Abstract/Retorno";

export class Relacional extends Expresion{
    tipoOperacion:TipoOperacionRelacional;
    operadorIzq:Expresion;
    operadorDer:Expresion;

    constructor(tipoOperacion:TipoOperacionRelacional, operadorIzq:Expresion, operadorDer:Expresion, fila:number, columna:number, archivo:string) {
        super(fila,columna);
        this.tipoOperacion = tipoOperacion;
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
    }

    ejecutar(ent: Entorno, er: ErrorManager) {
        let left: any = (this.operadorIzq == null) ? null : this.operadorIzq.ejecutar(ent,er);
        let right: any = (this.operadorDer == null) ? null : this.operadorDer.ejecutar(ent,er);
        
        switch (this.tipoOperacion) {
            case TipoOperacionRelacional.IGUALQUE:
                return this.igualQue(left, right, er);
            case TipoOperacionRelacional.DIFERENTE:
                return this.diferente(left, right, er);
            case TipoOperacionRelacional.MAYORQUE:
                return this.mayorQue(left, right, er);
            case TipoOperacionRelacional.MENORQUE:
                return this.menorQue(left, right, er);
            case TipoOperacionRelacional.MAYORIGUAL:
                return this.mayorIgual(left, right, er);
            case TipoOperacionRelacional.MENORIGUAL:
                return this.menorIgual(left, right, er);
            default:
                return null;
        }
    }

    igualQue(left:any ,right:any, er:ErrorManager) { 
        if(left.tipo == Type.NUMBER && right.tipo == Type.NUMBER){
            return new Retorno((left.valor == right.valor),Type.BOOLEAN);
        }
        else if(left.tipo == Type.STRING && right.tipo == Type.STRING){
            return new Retorno((left.valor == right.valor),Type.BOOLEAN);
        }
        else if(left.tipo == Type.BOOLEAN && right.tipo == Type.BOOLEAN){
            return new Retorno((left.valor == right.valor),Type.BOOLEAN);
        }
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible la comparacion == entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo), this.fila, this.columna));
        return null;
    }

    diferente(left:any ,right:any, er:ErrorManager) {
        if(left.tipo == Type.NUMBER && right.tipo == Type.NUMBER){
            return new Retorno((left.valor != right.valor),Type.BOOLEAN);
        }
        else if(left.tipo == Type.STRING && right.tipo == Type.STRING){
            return new Retorno((left.valor != right.valor),Type.BOOLEAN);
        }
        else if(left.tipo == Type.BOOLEAN && right.tipo == Type.BOOLEAN){
            return new Retorno((left.valor != right.valor),Type.BOOLEAN);
        }
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible la comparacion != entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo), this.fila, this.columna));
        return null;
    }

    mayorQue(left:any ,right:any, er:ErrorManager) { 

        if(left.tipo == Type.NUMBER && right.tipo == Type.NUMBER){
            return new Retorno((left.valor > right.valor),Type.BOOLEAN);
        }
        else if (left.tipo == Type.STRING && right.tipo == Type.STRING){ 
            return new Retorno((left.valor.length > left.valor.length),Type.BOOLEAN);
        }
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible la comparacion > entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo), this.fila, this.columna));
        return null; 
    }

    menorQue(left:any ,right:any, er:ErrorManager) {
        if(left.tipo == Type.NUMBER && right.tipo == Type.NUMBER){
            return new Retorno((left.valor < right.valor),Type.BOOLEAN);
        }
        else if (left.tipo == Type.STRING && right.tipo == Type.STRING){ 
            return new Retorno((left.valor.length < left.valor.length),Type.BOOLEAN);
        }
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible la comparacion < entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo), this.fila, this.columna));
        return null;
    }

    mayorIgual(left:any ,right:any, er:ErrorManager) {
        if(left.tipo == Type.NUMBER && right.tipo == Type.NUMBER){
            return new Retorno((left.valor >= right.valor),Type.BOOLEAN);
        }
        else if (left.tipo == Type.STRING && right.tipo == Type.STRING){ 
            return new Retorno((left.valor.length >= left.valor.length),Type.BOOLEAN);
        }
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible la comparacion >= entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo), this.fila, this.columna));
        return null;
    }

    menorIgual(left:any ,right:any, er:ErrorManager) {
        if(left.tipo == Type.NUMBER && right.tipo == Type.NUMBER){
            return new Retorno((left.valor <= right.valor),Type.BOOLEAN);
        }
        else if (left.tipo == Type.STRING && right.tipo == Type.STRING){ 
            return new Retorno((left.valor.length <= left.valor.length),Type.BOOLEAN);
        }
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible la comparacion <= entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo), this.fila, this.columna));
        return null;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodoOp:string = "nodo" + ++cont;
        builder.append(nodoOp+" [label=\""+this.getOperacionSimbolo(this.tipoOperacion)+"\"];\n");
        builder.append(parent+" -> "+nodoOp+"[color=\"red:black;0.50:red\"];\n");
        
        cont = this.operadorIzq.getDot(builder, nodoOp, cont);

        cont = this.operadorDer.getDot(builder, nodoOp, cont);
        
        return cont;
    }

    traducir(builder: StringBuilder) {
        return this.operadorIzq?.traducir(builder)+" "+this.getOperacionSimbolo(this.tipoOperacion)+" "+this.operadorDer?.traducir(builder);
    }

    getOperacionSimbolo(t:TipoOperacionRelacional):string{
        switch (t) {
            case TipoOperacionRelacional.DIFERENTE:
                return "!=";
            case TipoOperacionRelacional.IGUALQUE:
                return "==";
            case TipoOperacionRelacional.MAYORIGUAL:
                return ">=";
            case TipoOperacionRelacional.MAYORQUE:
                return ">";
            case TipoOperacionRelacional.MENORIGUAL:
                return "<=";
            case TipoOperacionRelacional.MENORQUE:
                return "<";
            default:
                return "null";
        }
    }
}

export enum TipoOperacionRelacional {
    MAYORQUE,
    MENORQUE,
    MAYORIGUAL,
    MENORIGUAL,
    IGUALQUE,
    DIFERENTE
}