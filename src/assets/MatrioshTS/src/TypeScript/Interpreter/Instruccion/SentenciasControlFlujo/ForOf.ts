import { Expresion } from "../../Abstract/Expresion";
import { Instruccion } from "../../Abstract/Instruccion";
import { Arreglo } from "../../Edd/Arreglo";
import { MiType } from "../../Edd/MiType";
import { StringBuilder } from "../../Edd/StringBuilder";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { NodoError, TipoError } from "../../Reportes/NodoError";
import { R_TS } from "../../Reportes/R_TS";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { TSCollector } from "../../TablaSimbolos/TSCollector";
import { TipoDeclaracion } from "../Declaracion";
import { Break } from "../SentenciasTransferencia/Break";
import { Continue } from "../SentenciasTransferencia/Continue"; 

 export class ForOf extends Instruccion{

    tipoDeclaracion:TipoDeclaracion;
    variable:string ;
    expresion:Expresion;
    instrucciones:Instruccion;

    constructor(tipoDeclaracion:TipoDeclaracion, variable:string, expresion:Expresion, instrucciones:Instruccion,fila:number,columna:number){
        super(fila,columna);
        this.tipoDeclaracion = tipoDeclaracion;
        this.variable = variable;
        this.expresion = expresion;
        this.instrucciones = instrucciones;
    }

    ejecutar(ent: Entorno, er: ErrorManager, consola: StringBuilder, tsCollector: TSCollector, reporte_ts: R_TS, ambito: string, padre: string) {
        let nuevo = new Entorno(ent);
        let vari = this.expresion.ejecutar(ent,er,consola,tsCollector,reporte_ts,"Local: ForOf",ambito);

        if (vari.valor instanceof Arreglo) { 
            for (let index = 0; index < vari.valor.getTamaño(); index++) {
                const element = vari.valor.getValor(index);
                if (index==0) {
                    nuevo.Add(this.variable,element,vari.tipo,0,this.tipoDeclaracion);
                }else{
                    nuevo.ChangeValue(this.variable,element);
                }
                let r = this.instrucciones.ejecutar(nuevo,er,consola,tsCollector,reporte_ts,"Local: ForOf",ambito);
                if(r != null || r != undefined){
                    if(r instanceof Break){
                        break;
                    }else if(r instanceof Continue){
                        continue;
                    }else{
                        return r;
                    }
                }

            }    
        }else if (typeof vari.valor == "string"){ 
            for (let index = 0; index < vari.valor.length; index++) {
                if (index==0) {
                    nuevo.Add(this.variable,vari.valor.charAt(index),vari.tipo,0,this.tipoDeclaracion);
                }else{
                    nuevo.ChangeValue(this.variable,vari.valor.charAt(index));
                }
                let r = this.instrucciones.ejecutar(nuevo,er,consola,tsCollector,reporte_ts,"Local: ForOf",ambito);
                if(r != null || r != undefined){
                    if(r instanceof Break){
                        break;
                    }else if(r instanceof Continue){
                        continue;
                    }else{
                        return r;
                    }
                }
            } 
        }else{
            er.addError(new NodoError(TipoError.SEMANTICO, "La variable "+this.variable+" no es de tipo arreglo ni tipo string", this.fila, this.columna,ambito));
            return null;
        }
        reporte_ts.addLista(nuevo.getReporte("Local: ForOf",padre));
        return null;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        return cont;
    }

    traducir(builder: StringBuilder, parent: string) {
        let trad = new StringBuilder();
        
        trad.append("for ( ");

        if (this.tipoDeclaracion == TipoDeclaracion.LET) {
            trad.append("let ");
        }else if (this.tipoDeclaracion == TipoDeclaracion.CONST) {
            trad.append("const ");
        }

        trad.append(this.variable+" of "+this.expresion.traducir(builder)+") {\n");

        trad.append(this.instrucciones.traducir(builder,parent));
        
        trad.append("}\n"); 

        return trad.toString();
    }

 }