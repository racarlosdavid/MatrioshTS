import { Expresion } from "../Abstract/Expresion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "../Edd/StringBuilder";
import { Type } from "../TablaSimbolos/Tipo";
import { NodoError, TipoError } from "../Reportes/NodoError";
import { Retorno } from "../Abstract/Retorno";
import { TSCollector } from "../TablaSimbolos/TSCollector";
import { R_TS } from "../Reportes/R_TS";

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

    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        let left: any = (this.operadorIzq == null) ? null : this.operadorIzq.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
        let right: any = (this.operadorDer == null) ? null : this.operadorDer.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
        
        switch (this.tipoOperacion) {
            case TipoOperacionRelacional.IGUALQUE:
                return this.igualQue(left, right, er, ambito);
            case TipoOperacionRelacional.DIFERENTE:
                return this.diferente(left, right, er, ambito);
            case TipoOperacionRelacional.MAYORQUE:
                return this.mayorQue(left, right, er, ambito);
            case TipoOperacionRelacional.MENORQUE:
                return this.menorQue(left, right, er, ambito);
            case TipoOperacionRelacional.MAYORIGUAL:
                return this.mayorIgual(left, right, er, ambito);
            case TipoOperacionRelacional.MENORIGUAL:
                return this.menorIgual(left, right, er, ambito);
            default:
                return null;
        }
    }

    igualQue(left:any ,right:any, er:ErrorManager, padre:string) { 
        if(typeof left.valor === "number" && typeof right.valor === "number"){
            return new Retorno((left.valor == right.valor),Type.BOOLEAN);
        }
        else if(typeof left.valor === "string" && typeof right.valor === "string"){
            return new Retorno((left.valor == right.valor),Type.BOOLEAN);
        }
        else if(typeof left.valor === "boolean" && typeof right.valor === "boolean"){ 
            return new Retorno((left.valor == right.valor),Type.BOOLEAN);
        }
        else if(left.tipo == this.getTipoToString(left.tipo) && ( typeof right.valor === "string" || typeof right.valor === "number")){ 
            let alfa = right.valor == "null"?null:right.valor;
            return new Retorno((left.valor == alfa),Type.BOOLEAN);
        }
        else if((typeof left.valor === "string" || typeof left.valor === "number")  && right.tipo == this.getTipoToString(left.tipo) ){ 
            let alfa = left.valor == "null"?null:left.valor;
            return new Retorno((alfa == right.valor),Type.BOOLEAN);
        }
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible la comparacion == entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo), this.fila, this.columna,padre));
        return null;
    }

    diferente(left:any ,right:any, er:ErrorManager, padre:string) {
        if(typeof left.valor === "number" && typeof right.valor === "number"){
            return new Retorno((left.valor != right.valor),Type.BOOLEAN);
        }
        else if(typeof left.valor === "string" && typeof right.valor === "string"){
            return new Retorno((left.valor != right.valor),Type.BOOLEAN);
        }
        else if(typeof left.valor === "boolean" && typeof right.valor === "boolean"){
            return new Retorno((left.valor != right.valor),Type.BOOLEAN);
        }
        else if(left.tipo == this.getTipoToString(left.tipo) && ( typeof right.valor === "string" || typeof right.valor === "number")){ 
            let alfa = right.valor == "null"?null:right.valor;
            return new Retorno((left.valor != alfa),Type.BOOLEAN);
        }
        else if((typeof left.valor === "string" || typeof left.valor === "number")  && right.tipo == this.getTipoToString(left.tipo) ){ 
            let alfa = left.valor == "null"?null:left.valor;
            return new Retorno((alfa != right.valor),Type.BOOLEAN);
        }
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible la comparacion != entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo), this.fila, this.columna, padre));
        return null;
    }

    mayorQue(left:any ,right:any, er:ErrorManager, padre:string) { 
        //console.log(left.valor + " " + right.valor)
        if(typeof left.valor === "number" && typeof right.valor === "number"){
            return new Retorno((left.valor > right.valor),Type.BOOLEAN);
        }
        else if (typeof left.valor === "string" && typeof right.valor === "string"){ 
            return new Retorno((left.valor.length > left.valor.length),Type.BOOLEAN);
        }
        else if(left.tipo == this.getTipoToString(left.tipo) && ( typeof right.valor === "string" || typeof right.valor === "number")){ 
            let alfa = right.valor == "null"?null:right.valor;
            return new Retorno((left.valor > alfa),Type.BOOLEAN);
        }
        else if((typeof left.valor === "string" || typeof left.valor === "number") && right.tipo == this.getTipoToString(left.tipo) ){ 
            let alfa = left.valor == "null"?null:left.valor;
            return new Retorno((alfa > right.valor),Type.BOOLEAN);
        }
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible la comparacion > entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo), this.fila, this.columna,padre));
        return null; 
    }

    menorQue(left:any ,right:any, er:ErrorManager, padre:string) {  
        //console.log(left.valor + " " + right.valor)
        if(typeof left.valor === "number" && typeof right.valor === "number"){
            return new Retorno((left.valor < right.valor),Type.BOOLEAN);
        }
        else if (typeof left.valor === "string" && typeof right.valor === "string"){ 
            return new Retorno((left.valor.length < left.valor.length),Type.BOOLEAN);
        }
        else if(left.tipo == this.getTipoToString(left.tipo) && ( typeof right.valor === "string" || typeof right.valor === "number")){ 
            let alfa = right.valor == "null"?null:right.valor;
            return new Retorno((left.valor < alfa),Type.BOOLEAN); 
        }
        else if((typeof left.valor === "string" || typeof left.valor === "number" ) && right.tipo == this.getTipoToString(left.tipo) ){ 
            let alfa = left.valor == "null"?null:left.valor;
            return new Retorno((alfa < right.valor),Type.BOOLEAN);
        }
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible la comparacion < entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo), this.fila, this.columna, padre));
        return null;
    }

    mayorIgual(left:any ,right:any, er:ErrorManager, padre:string) {
        if(typeof left.valor === "number" && typeof right.valor === "number"){
            return new Retorno((left.valor >= right.valor),Type.BOOLEAN);
        }
        else if (typeof left.valor === "string" && typeof right.valor === "string"){ 
            return new Retorno((left.valor.length >= left.valor.length),Type.BOOLEAN);
        }

        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible la comparacion >= entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo), this.fila, this.columna,padre));
        return null;
    }

    menorIgual(left:any ,right:any, er:ErrorManager, padre:string) {
        if(typeof left.valor === "number" && typeof right.valor === "number"){
            return new Retorno((left.valor <= right.valor),Type.BOOLEAN);
        }
        else if (typeof left.valor === "string" && typeof right.valor === "string"){ 
            return new Retorno((left.valor.length <= left.valor.length),Type.BOOLEAN);
        }
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible la comparacion <= entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo), this.fila, this.columna, padre));
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
        return "("+this.operadorIzq?.traducir(builder)+" "+this.getOperacionSimbolo(this.tipoOperacion)+" "+this.operadorDer?.traducir(builder) +")";
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