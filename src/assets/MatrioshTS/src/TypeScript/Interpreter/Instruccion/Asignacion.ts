import { Expresion } from "../Abstract/Expresion";
import { Instruccion } from "../Abstract/Instruccion";
import { Arreglo } from "../Edd/Arreglo";
import { MiType } from "../Edd/MiType";
import { StringBuilder } from "../Edd/StringBuilder";
import { TypeTS } from "../Edd/TypeTS";
import { TypeTSDefinicion } from "../Edd/TypeTSDefinicion";
import { Id } from "../Expresion/Id";
import { ErrorManager } from "../Reportes/ErrorManager";
import { NodoError, TipoError } from "../Reportes/NodoError";
import { R_TS } from "../Reportes/R_TS";
import { Entorno } from "../TablaSimbolos/Entorno";
import { Simbolo } from "../TablaSimbolos/Simbolo";
import { Type } from "../TablaSimbolos/Tipo";
import { TSCollector } from "../TablaSimbolos/TSCollector";
import { TipoDeclaracion } from "./Declaracion";
import { Llamada } from "./Llamada";


export class Asignacion extends Instruccion{
    identificador:string;
    accesos:Array<Expresion>;
    valor:Expresion;
    
    constructor(identificador:string, accesos:Array<Expresion>,valor:Expresion, fila:number, columna:number) {
        super(fila,columna);
        this.identificador = identificador;
        this.accesos = accesos;
        this.valor = valor;
    }

    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        let result:Simbolo|null = ent.GetValue(this.identificador);
        if (result !=null) {
            if (result.tipodeclaracion==TipoDeclaracion.CONST && !(result.valor instanceof Arreglo)) {
                er.addError(new NodoError(TipoError.SEMANTICO,"Asignacion no permitida la variable "+this.identificador+" es const ", this.fila, this.columna));
                return null; 
            } else {
                let new_val = this.valor.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre); 
      
                
                if (result.valor instanceof Arreglo) {
                    if(new_val.valor == undefined){
                        er.addError(new NodoError(TipoError.SEMANTICO,"No se puede asignar un undefined al arreglo, se va a sustituir por 0 para que no se quede trabado", this.fila, this.columna));
                        
                        if (result.tipo == Type.NUMBER) { //Si es un arreglo de number intento recuperarme asignadole 0 al undefined
                            new_val.valor = 0;
                            new_val.tipo = Type.NUMBER;
                        }
                        if (result.tipo == Type.STRING) { //Si es un arreglo de number intento recuperarme asignadole "" al undefined
                            new_val.valor = "";
                            new_val.tipo = Type.STRING;
                        }
                    }
                    let r:Arreglo = result.valor; 
                    let pos = null;
                    for (let index = 0; index < this.accesos.length; index++) {
                        const tempo = this.accesos[index].ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
                        pos = tempo.valor;
                        if (tempo.tipo == Type.NUMBER) {
                            if (index < this.accesos.length-1) {
                                r = r.getValor(pos);
                            } 
                        } else {
                            er.addError(new NodoError(TipoError.SEMANTICO,"Se esperaba un valor de tipo number ", this.fila, this.columna));
                            return null; 
                        }
                    }
                    
                    if (new_val.tipo == r.tipo || new_val.tipo == Type.ARRAY || r.tipo == Type.ARRAY) {
                        if (pos!=null) {
                            r.setValor(pos,new_val.valor); 
                        } else { 
                            r.setValores(new_val.valor.valores);
                        }
                         
                    } else {
                        er.addError(new NodoError(TipoError.SEMANTICO,"La variable \""+this.identificador+"\" es de tipo "+this.getTipoToString(r.tipo)+" y el nuevo valor \""+new_val.valor+"\" es de tipo "+this.getTipoToString(new_val.tipo), this.fila, this.columna));
                        return null; 
                    }
              
                }else if(result.valor instanceof MiType || new_val .valor instanceof TypeTSDefinicion){ 
                    if (typeof result.tipo == "string") {
                        let bandera:boolean = true;
                        let type_estructura:TypeTS|null = ent.GetType(result.tipo);
                        let type_guardar:TypeTSDefinicion = new_val.valor;
                        let datos_estructura:Map<String, any> = new Map();
                        let datos_guardar:Map<String, any> = new Map();
                        //Si el esqueleton del type exite puedo seguir
                        if (type_estructura != null) {
                            for (let index = 0; index < type_estructura.variables.length; index++) {
                                const element = type_estructura.variables[index];
                                let identificador = element.identificador;
                                let tipo = element.tipo;
                                datos_estructura.set(identificador,tipo);
                            }

                            for (let index = 0; index < type_guardar.valores.length; index++) {
                                const element = type_guardar.valores[index];
                                let identificador = element.identificador;
                                let valo =element.valor?.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
                                datos_guardar.set(identificador,valo);
                            }

                            // verifico que los los dos contengas los mismos ids
                            if (datos_estructura.size == datos_guardar.size) {
                                datos_estructura.forEach(function(v, clave) {
                                    if (!datos_guardar.has(clave) ) {
                                        bandera = false;
                                    }
                                });
                            }else{ 
                                er.addError(new NodoError(TipoError.SEMANTICO,"Los valores a asignar no coinciden con los valores del type ", this.fila, this.columna));
                                return null;   
                            }

                            //Si bandera es true en este momento puedo guardar los valores
                            try{
                            if (bandera == true && this.accesos.length==0) { 
                                let mi_type:Map<String, any> = new Map();
                                for (let index = 0; index < type_estructura.variables.length; index++) {
                                    const element = type_estructura.variables[index];
                                    let ide = element.identificador;

                                    let va = datos_guardar.get(ide);

                                    let tipo = datos_estructura.get(ide);

                                    if (va.tipo == tipo || va.tipo == Type.NULL) {
                                        mi_type.set(ide,va.valor);
                                    } else {// Error no son del mismo tipo
                                        er.addError(new NodoError(TipoError.SEMANTICO,"El tipo declarado "+this.getTipoToString(va.tipo)+" no coincide con el tipo del valor "+this.getTipoToString(tipo), this.fila, this.columna));
                                        return null;  
                                    }
                                }//Todo ok. guardo la variable
                                ent.ChangeValue(this.identificador,new MiType(mi_type,datos_estructura));
                            }else if(this.accesos.length != 0){
                                let r:MiType = result.valor; 
                              
                                for (let index = 0; index < this.accesos.length; index++) {
                                    const tempo = this.accesos[index];
                                    if (tempo instanceof Id){
                                        r = r.getValor(tempo.identificador);
                                    }
                                }
                            }
                        }catch(er){console.log("error aqui en asignacion")}
                        }
                    }
                    
                }else{
                    if (new_val.tipo == result.tipo) {
                        ent.ChangeValue(this.identificador,new_val.valor);
                    } else {
                        er.addError(new NodoError(TipoError.SEMANTICO,"La variable \""+this.identificador+"\" es de tipo "+this.getTipoToString(result.tipo)+" y el nuevo valor \""+new_val.valor+"\" es de tipo "+this.getTipoToString(new_val.tipo), this.fila, this.columna));
                        return null; 
                    }
                    
                }
                
            }
            
        } else {
            er.addError(new NodoError(TipoError.SEMANTICO,"La variable "+this.identificador+" no existe ", this.fila, this.columna));
            return null; 
        }
       
        return null;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        //console.log("Method not implemented. ASIGNACION");
        return cont;
    }

    traducir(builder: StringBuilder, parent: string) {
       
        let trad = new StringBuilder();
        if (this.accesos.length == 0) {
            trad.append(this.identificador+" = "+this.valor.traducir(builder)+";\n");
        } else {
            trad.append(this.identificador);

            for (let index = 0; index < this.accesos.length; index++) {
                const element = this.accesos[index];
                if (element instanceof Llamada) {
                    trad.append(element.traducir(builder));
                }else if(element instanceof Id){
                    trad.append("."+element.traducir(builder));
                }else{
                    trad.append("["+element.traducir(builder)+"]");
                }
            }
            
            trad.append(" = "+this.valor.traducir(builder)+";\n");

        }
        
        
        

        return trad.toString();
    }

}