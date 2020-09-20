import { Expresion } from "../Abstract/Expresion";
import { Instruccion } from "../Abstract/Instruccion";
import { StringBuilder } from "../Edd/StringBuilder";
import { ErrorManager } from "../Reportes/ErrorManager";
import { Manager } from "../Reportes/Manager";
import { NodoError, TipoError } from "../Reportes/NodoError";
import { Entorno } from "../TablaSimbolos/Entorno";
import { Type } from "../TablaSimbolos/Tipo";
import { TSCollector } from "../TablaSimbolos/TSCollector";
import { Declaracion, TipoDeclaracion } from "./Declaracion";
import { Funcion } from "./Funcion";

export class Llamada extends Instruccion {

    identificador:string;
    argumentos:Array<Expresion>;

    constructor(identificador:string,argumentos:Array<Expresion>, fila:number, columna:number){
        super(fila,columna);
        this.identificador = identificador;
        this.argumentos = argumentos;
    }

    ejecutar(ent: Entorno, er: ErrorManager, consola: StringBuilder, tsCollector: TSCollector) {
        let funcion:Funcion|null = ent.GetFuncion(this.identificador);
        if (funcion!=null) {
            let nuevo:Entorno = new Entorno(ent);
            //tsCollector.addTS(this.identificador,new Entorno(ent));
       
            if (funcion.parametros.length == this.argumentos.length) {
                for (let index = 0; index < this.argumentos.length; index++) {
                    const param:Declaracion = funcion.parametros[index];
                    let v = this.argumentos[index].ejecutar(ent,er);
                    if (v.tipo != param.tipo) { //Si tipo del valor del parametro es igual al tipo de la variable de la funcion todo ok.
                        er.addError(new NodoError(TipoError.SEMANTICO,"El tipo del parametro "+v.tipo+" no coinciden con el tipo "+param.tipo+" de la funcion", this.fila, this.columna));
                        return null; 
                    }
                    nuevo.Add(param.identificador,v.valor,param.tipo!=null?param.tipo:Type.INDEF,param.dimensiones,param.tipoDeclaracion);
                    
                }
            } else {
                er.addError(new NodoError(TipoError.SEMANTICO,"La cantidad de parametros de la funcion "+this.identificador+" no coinciden", this.fila, this.columna));
                return null; 
            }
            Manager.getManager().addListaR_TS(nuevo.getReporte("global",""));
            for (const inst of funcion.instrucciones) {
                let result = inst.ejecutar(nuevo,er,consola,tsCollector);
                if(result !=null){
                    //Compruebo que el tipo de retorno sea igual que el tipo de retorno de la funcion
                    if (result.tipo == funcion.tipoRetorno || funcion.tipoRetorno == null) {
                        return result;
                    } else { 
                        er.addError(new NodoError(TipoError.SEMANTICO,"El tipo de retorno "+result.tipo+" no coinciden con el tipo de retorno"+funcion.tipoRetorno+" de la funcion", this.fila, this.columna));
                        return null; 
                    }
                } 
            }
            
        } else {
            er.addError(new NodoError(TipoError.SEMANTICO,"Funcion "+this.identificador+" no encontrada en la tabla de simbolos", this.fila, this.columna));
            return null; 
        }
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