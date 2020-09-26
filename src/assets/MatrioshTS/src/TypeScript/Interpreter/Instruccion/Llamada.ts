import { Expresion } from "../Abstract/Expresion";
import { Instruccion } from "../Abstract/Instruccion";
import { StringBuilder } from "../Edd/StringBuilder";
import { Graficar_ts } from "../FuncionesNativas/Graficar_ts";
import { Pop } from "../FuncionesNativas/Pop";
import { Push } from "../FuncionesNativas/Push";
import { ErrorManager } from "../Reportes/ErrorManager";
import { Manager } from "../Reportes/Manager";
import { NodoError, TipoError } from "../Reportes/NodoError";
import { R_TS } from "../Reportes/R_TS";
import { Entorno } from "../TablaSimbolos/Entorno";
import { Type } from "../TablaSimbolos/Tipo";
import { TSCollector } from "../TablaSimbolos/TSCollector";
import { Declaracion, TipoDeclaracion } from "./Declaracion";
import { Funcion } from "./Funcion";
import { Return } from "./SentenciasTransferencia/Return";

export class Llamada extends Instruccion {

    identificador:string;
    argumentos:Array<Expresion>;

    constructor(identificador:string,argumentos:Array<Expresion>, fila:number, columna:number){
        super(fila,columna);
        this.identificador = identificador;
        this.argumentos = argumentos;
    }

    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        let funcion:Funcion|null = ent.GetFuncion(this.identificador);
    
        let tiene_herencia = this.identificador.includes("_");
        //console.log(tiene_herencia+" ddddddd");
        if (funcion!=null && funcion.parametros.length == this.argumentos.length) {
            let nuevo:Entorno = new Entorno(ent);
            //tsCollector.addTS(this.identificador,new Entorno(ent));
            if(funcion instanceof Graficar_ts){

            }else{
           
                for (let index = 0; index < this.argumentos.length; index++) {
                    const param:Declaracion = funcion.parametros[index];
                    let v = this.argumentos[index].ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
                    if (v.tipo != param.tipo && !(this.identificador == "pop" || this.identificador == "push")) { //Si tipo del valor del parametro es igual al tipo de la variable de la funcion todo ok.
                        er.addError(new NodoError(TipoError.SEMANTICO,"El tipo del parametro "+v.tipo+" no coinciden con el tipo "+param.tipo+" de la funcion", this.fila, this.columna));
                        return null; 
                    }
                    nuevo.Add(param.identificador,v.valor,param.tipo!=null?param.tipo:this.getElTipo(v.valor),param.dimensiones,param.tipoDeclaracion);
                    
                }
            }
            if (funcion instanceof Graficar_ts) {
                let gra = funcion;
                gra.fila = this.fila;
                gra.columna = this.columna;
                let obj = gra.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
                if(obj !=null){
                    return obj;
                } 
                
            } else if (funcion instanceof Pop || funcion instanceof Push) {
                funcion.fila = this.fila;
                funcion.columna = this.columna;
                let obj = funcion.ejecutar(nuevo,er,consola,tsCollector,reporte_ts,ambito,padre);
                if(obj !=null){
                    return obj;
                } 
            }else {
                //Manager.getManager().addListaR_TS(nuevo.getReporte("global",""));
                for (const inst of funcion.instrucciones) {
                    let result = inst.ejecutar(nuevo,er,consola,tsCollector,reporte_ts,ambito,padre);
                    if(result !=null){
                        //Compruebo que el tipo de retorno sea igual que el tipo de retorno de la funcion
                        if (result.tipo == funcion.tipoRetorno) {
                            return result;
                        } else if(result instanceof Return){
                            return null;
                        }else { 
                            er.addError(new NodoError(TipoError.SEMANTICO,"El tipo de retorno "+result.tipo+" no coinciden con el tipo de retorno"+funcion.tipoRetorno+" de la funcion", this.fila, this.columna));
                            return null; 
                        }
                    } 
                }
                if(funcion.tipoRetorno == null || funcion.tipoRetorno == Type.VOID){ 
                    return null;
                }
            }
            reporte_ts.addLista(nuevo.getReporte("Local: "+this.identificador,padre));
        } else {
            er.addError(new NodoError(TipoError.SEMANTICO,"Funcion "+this.identificador+" no encontrada en la tabla de simbolos", this.fila, this.columna));
            return null; 
        }
        return null;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodo:string = "nodo" + ++cont;
        builder.append(nodo+" [label=\"Call Funcion\"];\n");
        builder.append(parent+" -> "+nodo+";\n");
        
        let nodoId:string = "nodo" + ++cont;
        builder.append(nodoId+" [label=\""+this.identificador+"\"];\n");
        builder.append(nodo+" -> "+nodoId+";\n");

        let nodoParametros:string = "nodo" + ++cont;
        builder.append(nodoParametros+" [label=\"Argumentos\"];\n");
        builder.append(nodo+" -> "+nodoParametros+";\n");

        for (let instr of this.argumentos) {
            cont = instr.getDot(builder, nodoParametros, cont);
        }
        
        return cont;
    }

    traducir(builder: StringBuilder, parent: string) {
        let tempo = new StringBuilder (); 
        tempo.append(this.identificador);
        // Traduccion de los parametros
        let param = new StringBuilder();
        if (this.argumentos.length == 0) {
            tempo.append("( )");
        } else {
            tempo.append("(");
            for (let index = 0; index < this.argumentos.length; index++) {
                let element = this.argumentos[index];
                param.append(element.traducir(builder));
                if (index<this.argumentos.length-1) {
                    param.append(",");
                }
            }
            tempo.append(param.toString());
            tempo.append(")");
        }
        // Fin
        return tempo.toString();
    }

    
}