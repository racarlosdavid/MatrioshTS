import { Expresion } from "../Abstract/Expresion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "../Edd/StringBuilder";
import { Simbolo } from "../TablaSimbolos/Simbolo";
import { ArrayTS } from "../Edd/ArrayTS";
import { Retorno } from "../Abstract/Retorno";
import { NodoError, TipoError } from "../Reportes/NodoError";
import { Arreglo } from "../Edd/Arreglo";
import { Type } from "../TablaSimbolos/Tipo";
import { TSCollector } from "../TablaSimbolos/TSCollector";
import { R_TS } from "../Reportes/R_TS";
import { MiType } from "../Edd/MiType";
import { Id } from "./Id";

export class Acceso extends Expresion{
  
    identificador:string;
    accesos:Array<Expresion>;

    constructor(identificador:string, accesos:Array<Expresion>, fila:number, columna:number) {
        super(fila,columna);
        this.identificador = identificador;
        this.accesos = accesos;
    }

    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) { 
        let result:Simbolo|null = ent.GetValue(this.identificador);
        if (result !=null) {
                let r = result.valor;  
                let t = result.tipo;
                let pos ;
                try{
                for (let index = 0; index < this.accesos.length; index++) {
                    if (r instanceof Arreglo) {  
                        let tempo = this.accesos[index];
                        if (tempo instanceof Id){
                            if(tempo.identificador == "length"){
                                r = r.getTamaño();
                            }else{
                                let tempo = this.accesos[index].ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
                                pos = tempo.valor;
                                if (tempo.tipo == Type.NUMBER) {
                                    r = r.getValor(pos);
                                    if(r == undefined){
                                        t = Type.INDEF;
                                    }
                                } else {
                                    er.addError(new NodoError(TipoError.SEMANTICO,"Se esperaba un valor de tipo number ", this.fila, this.columna,ambito));
                                    return "null"; 
                                }
                            }

                        }else{
                            let tempo = this.accesos[index].ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
                            pos = tempo.valor; 
                            if (tempo.tipo == Type.NUMBER) {
                                r = r.getValor(pos);
                                if(r == undefined){
                                    t = Type.INDEF;
                                }
                            } else {
                                er.addError(new NodoError(TipoError.SEMANTICO,"Se esperaba un valor de tipo number ", this.fila, this.columna,ambito));
                                return "null"; 
                            }
                        }
                        
                        
                    }else if(r instanceof MiType ){
                        const tempo = this.accesos[index];
                        let tempo2:MiType = r;
                        if (tempo instanceof Id){
                            r = tempo2.getValor(tempo.identificador);
                            t = tempo2.getTipo(tempo.identificador);
                        }
                    }
                }
            }catch(er){
                console.log("error aqui en acceso "+er)
            }
            return new Retorno (r,t);
        
            
        }else{
            er.addError(new NodoError(TipoError.SEMANTICO,"La variable "+this.identificador+" no existe ", this.fila, this.columna,ambito));
            return "null"; 
        }
    }

    esEntero(numero:number) {
        if (numero - Math.floor(numero) == 0) {
            return numero;
        } else {
            return Math.floor(numero);
        }
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        return cont;
    }

    traducir(builder: StringBuilder) {
        let tempo = new StringBuilder (); 
        tempo.append(this.identificador);
        // Traduccion de los accesos
        let v = new StringBuilder();
            for (let index = 0; index < this.accesos.length; index++) {
                let element = this.accesos[index];
                if (index < this.accesos.length) {
                    v.append(".");
                }
                v.append(element.traducir(builder));
                
            }
            tempo.append(v.toString());
       // Fin 
       return tempo.toString();
    }
}

