import { Expresion } from "../Abstract/Expresion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { StringBuilder } from "../Edd/StringBuilder";
import { ErrorManager } from "../Reportes/ErrorManager";
import { Type } from "../TablaSimbolos/Tipo";
import { Retorno } from "../Abstract/Retorno";
import { NodoError, TipoError } from "../Reportes/NodoError";

export class Aritmetica extends Expresion{

    unario:boolean ;
    tipoOperacion:TipoOperacionAritmetica ;
    operadorIzq:Expresion | null;
    operadorDer:Expresion | null;
    operadorU:Expresion | null;

    constructor(tipoOperacion:TipoOperacionAritmetica, operadorIzq:Expresion|null,  operadorDer:Expresion|null, operadorU:Expresion|null,unario:boolean, fila:number, columna:number) {
        super(fila,columna);
        this.unario = unario;
        this.tipoOperacion = tipoOperacion;
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
        this.operadorU = operadorU;
    }

    ejecutar(ent: Entorno, er: ErrorManager) {
        if (this.unario) {
            let valorUnario: any = (this.operadorU == null) ? null : this.operadorU.ejecutar(ent,er);
            
            switch (this.tipoOperacion) {                
                case TipoOperacionAritmetica.NEGACION:
                    return this.negacion(valorUnario,er);
                    //mensajes.add(new NodoError("Semantico", "No es posible la multiplicacion (1) de una variable "+getTipoLegible(valorUnario),archivo, fila, columna));
                default:
                    return null;
                 
            }
        } else {
            let left: any = (this.operadorIzq == null) ? null : this.operadorIzq.ejecutar(ent,er);
            let right: any = (this.operadorDer == null) ? null : this.operadorDer.ejecutar(ent,er);
            
            switch (this.tipoOperacion) {
                case TipoOperacionAritmetica.SUMA:
                    return this.suma(left,right,er);
                case TipoOperacionAritmetica.RESTA:
                    return this.resta(left,right,er);
                case TipoOperacionAritmetica.MULTIPLICACION:
                    return this.multiplicacion(left,right,er);
                case TipoOperacionAritmetica.DIVISION:
                    return this.division(left,right,er);
                case TipoOperacionAritmetica.POTENCIA:
                    return this.potencia(left,right,er);
                case TipoOperacionAritmetica.MODULO:
                    return this.modulo(left,right,er);
                default:
                    return null;
            }
        }
    }


    suma(left:any ,right:any, er:ErrorManager) {
        if(left.tipo == Type.NUMBER && right.tipo == Type.NUMBER){
            return new Retorno((left.valor + right.valor),Type.NUMBER);
        }
        else if(left.tipo == Type.STRING && right.tipo == Type.NUMBER){
            return new Retorno((left.valor + right.valor.toString()),Type.STRING);
        }
        else if(left.tipo == Type.NUMBER && right.tipo == Type.STRING){ 
            return new Retorno((left.valor.toString() + right.valor),Type.STRING);
        }
        else if(left.tipo == Type.STRING && right.tipo == Type.BOOLEAN){
            return new Retorno((left.valor + right.valor.toString()),Type.STRING);
        }
        else if(left.tipo == Type.BOOLEAN && right.tipo == Type.STRING){
            return new Retorno((left.valor.toString() + right.valor),Type.STRING);
        }
        else if(left.tipo == Type.STRING && right.tipo == Type.STRING){
            return new Retorno((left.valor + right.valor),Type.STRING);
        }
        /* Falta agregar las operaciones entre arreglos si es que se puede */
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible la suma entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo),this.fila,this.columna));
        return null;
    }

    resta(left:any ,right:any, er:ErrorManager) {
        if(left.tipo == Type.NUMBER && right.tipo == Type.NUMBER){
            return new Retorno((left.valor - right.valor),Type.NUMBER);
        }
        /* Falta agregar las operaciones entre arreglos si es que se puede */
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible la resta entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo),this.fila,this.columna));
        return null;

    }

    multiplicacion(left:any ,right:any, er:ErrorManager) {
        if(left.tipo == Type.NUMBER && right.tipo == Type.NUMBER){
            return new Retorno((left.valor * right.valor),Type.NUMBER);
        }
        /* Falta agregar las operaciones entre arreglos si es que se puede */
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible la multiplicacion entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo),this.fila,this.columna));
        return null;
    }

    division(left:any ,right:any, er:ErrorManager) {
        if(left.tipo == Type.NUMBER && right.tipo == Type.NUMBER){
            if (right.valor == 0){
                er.addError(new NodoError(TipoError.SEMANTICO, "No es posible la division entre 0", this.fila, this.columna));
                return null;
            }else{
                return new Retorno((left.valor / right.valor),Type.NUMBER);
            }
        }
        /* Falta agregar las operaciones entre arreglos si es que se puede */
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible la division entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo),this.fila,this.columna));
        return null;
    }

    potencia(left:any ,right:any, er:ErrorManager) {
        if(left.tipo == Type.NUMBER && right.tipo == Type.NUMBER){
            return new Retorno((left.valor ** right.valor),Type.NUMBER);
        }
        /* Falta agregar las operaciones entre arreglos si es que se puede */
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible la potencia entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo),this.fila,this.columna));
        return null;
    }

    modulo(left:any ,right:any, er:ErrorManager) {
        if(left.tipo == Type.NUMBER && right.tipo == Type.NUMBER){
            return new Retorno((left.valor % right.valor),Type.NUMBER);
        }
        /* Falta agregar las operaciones entre arreglos si es que se puede */
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible el modulo entre "+this.getTipoToString(left.tipo)+" y "+this.getTipoToString(right.tipo),this.fila,this.columna));
        return null;
    }

    negacion(unario:any, er:ErrorManager) {
        if(unario.tipo == Type.NUMBER ){
            return new Retorno((unario.valor * -1),Type.NUMBER);
        }
        /* Falta agregar las operaciones entre arreglos si es que se puede */
        er.addError(new NodoError(TipoError.SEMANTICO,"No es posible la negacion de "+this.getTipoToString(unario.tipo),this.fila,this.columna));
        return null;
    }


    getDot(builder: StringBuilder, parent: string, cont: number): number {
        throw new Error("Method not implemented.");
    }

    traducir(builder: StringBuilder) {
        let trad:string ;
        if (this.unario) {
            trad = "-"+this.operadorU?.traducir(builder);    
        } else {
            trad = this.operadorIzq?.traducir(builder)+" "+this.getOperacionSimbolo(this.tipoOperacion)+" "+this.operadorDer?.traducir(builder);
        }
        return trad;
    }

    getOperacionSimbolo(t:TipoOperacionAritmetica):string{
        switch (t) {
            case TipoOperacionAritmetica.SUMA:
                return "+";
            case TipoOperacionAritmetica.RESTA:
                return "-";
            case TipoOperacionAritmetica.MULTIPLICACION:
                return "*";
            case TipoOperacionAritmetica.DIVISION:
                return "/";
            case TipoOperacionAritmetica.POTENCIA:
                return "**";
            case TipoOperacionAritmetica.MODULO:
                return "%";
            default:
                return "-";
        }
    }
    
}

export enum TipoOperacionAritmetica {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    POTENCIA,
    MODULO,
    NEGACION
}
