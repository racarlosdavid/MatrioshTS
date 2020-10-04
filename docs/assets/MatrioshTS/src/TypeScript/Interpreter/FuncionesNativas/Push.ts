import { Expresion } from "../Abstract/Expresion";
import { Instruccion } from "../Abstract/Instruccion";
import { Arreglo } from "../Edd/Arreglo";
import { StringBuilder } from "../Edd/StringBuilder";
import { Acceso } from "../Expresion/Acceso";
import { ErrorManager } from "../Reportes/ErrorManager";
import { NodoError, TipoError } from "../Reportes/NodoError";
import { R_TS } from "../Reportes/R_TS";
import { Entorno } from "../TablaSimbolos/Entorno";
import { Simbolo } from "../TablaSimbolos/Simbolo";
import { Type } from "../TablaSimbolos/Tipo";
import { TSCollector } from "../TablaSimbolos/TSCollector";

export class Push extends Instruccion{
    identificador:string;
    valor:Expresion;

    constructor(identificador:string, valor:Expresion, fila:number, columna:number){
        super(fila,columna);
        this.identificador = identificador;
        this.valor = valor; 
    }

    ejecutar(ent: Entorno, er: ErrorManager, consola: StringBuilder, tsCollector: TSCollector, reporte_ts: R_TS, ambito: string, padre: string) {
        let r:Simbolo|null = ent.GetValue(this.identificador); 
            if (r!=null && r.valor instanceof Arreglo) { 
                
                let val = this.valor.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
                if (r.valor.getTamaño() == 0) {
                    r.valor.setTipo(val.tipo);
                }
                if (val !=null) {
                    if ((r.tipo == val.tipo || val.valor instanceof Arreglo || r.tipo == Type.ARRAY) && r.valor != null) {
                        r.valor.Add(val.valor);
                    }else{
                        er.addError(new NodoError(TipoError.SEMANTICO,"El tipo del arreglo "+this.getTipoToString(r.tipo)+" no coinciden con el tipo "+this.getTipoToString(val.tipo)+" del valor que se quiere agregar", this.fila, this.columna,padre));
                        return null; 
                    }
                }
            }else {
                er.addError(new NodoError(TipoError.SEMANTICO,"El arreglo "+this.identificador+" no se ha inicializado", this.fila, this.columna,padre));
            }
    }
    getDot(builder: StringBuilder, parent: string, cont: number): number {
        //console.log("Method not implemented. PUSH 2");
        return cont;
    }

    traducir(builder: StringBuilder, parent: string) {
        let tempo = new StringBuilder (); 
        tempo.append(this.identificador+".push(");
        tempo.append(this.valor.traducir(builder));
        tempo.append(")");
        return tempo.toString();
    }
  
    

}