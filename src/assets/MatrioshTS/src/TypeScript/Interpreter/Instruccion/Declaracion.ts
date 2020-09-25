import { Instruccion } from "../Abstract/Instruccion";
import { Type } from "../TablaSimbolos/Tipo";
import { Entorno } from "../TablaSimbolos/Entorno";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "../Edd/StringBuilder";
import { Expresion } from "../Abstract/Expresion";
import { NodoError, TipoError } from "../Reportes/NodoError";
import { TSCollector } from "../TablaSimbolos/TSCollector";
import { Arreglo } from "../Edd/Arreglo";
import { R_TS } from "../Reportes/R_TS";
import { TypeTSDefinicion } from "../Edd/TypeTSDefinicion";
import { TypeTS } from "../Edd/TypeTS";
import { MiType } from "../Edd/MiType"; 

export class Declaracion extends Instruccion{ 

    tipoDeclaracion:TipoDeclaracion;
    identificador:string;
    tipo:Type|string|null;
    dimensiones:number;
    valor:Expresion | null;

    constructor(tipoDeclaracion:TipoDeclaracion, identificador:string, tipo:Type|string|null, dimensiones:number, valor:Expresion | null, fila:number, columna:number){
        super(fila,columna);
        this.tipoDeclaracion = tipoDeclaracion;
        this.identificador = identificador;
        this.tipo = tipo;
        this.dimensiones = dimensiones;
        this.valor = valor;
    }

    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
       try{
        if (!ent.Existe(this.identificador)) {//Verifico que la variable no exista en el entorno actual
        //if (this.tipoDeclaracion == TipoDeclaracion.LET) {
            if (this.valor!=null) { // Si la variable esta inicializada entra a este if, 
                let val = this.valor?.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre); 
                if (this.tipo!=null) { // Si se declaron con un tipo hay que comprobar que el valor sea del mismo tipo
                    if (this.tipo == val.tipo || val.tipo == Type.ARRAY || val.tipo == Type.TYPE || val.tipo == Type.NULL) { // Ok. se guarda en la TS
                        if (val.valor instanceof Arreglo) {    
                            let tempo:Arreglo = val.valor; 
                            tempo.setTipo(this.tipo);
                            //console.log(tempo.tipo + " ss "+ val.valor + " el tamaño del array es "+tempo.getTamaño())
                            ent.Add(this.identificador,tempo,this.tipo,tempo.getTamaño(),this.tipoDeclaracion);
                        } else if(val.valor instanceof TypeTSDefinicion){
                            if (typeof this.tipo == "string" ) {
                                let bandera:boolean = true;
                                let type_estructura:TypeTS|null = ent.GetType(this.tipo);
                                let type_guardar:TypeTSDefinicion = val.valor;
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
                                    
                                    if (bandera == true) { 
                                        let mi_type:Map<String, any> = new Map();
                                        for (let index = 0; index < type_estructura.variables.length; index++) {
                                            const element = type_estructura.variables[index];
                                            let ide = element.identificador;

                                            let va = datos_guardar.get(ide);

                                            let tipo = datos_estructura.get(ide);

                                            if (va.tipo == tipo || va.tipo  == Type.NULL) {
                                                mi_type.set(ide,va.valor);
                                            }else {// Error no son del mismo tipo
                                                er.addError(new NodoError(TipoError.SEMANTICO,"El tipo declarado "+this.getTipoToString(va.tipo)+" no coincide con el tipo del valor "+this.getTipoToString(tipo), this.fila, this.columna));
                                                return null;  
                                            }
                                        }//Todo ok. guardo la variable
                                        ent.Add(this.identificador,new MiType(mi_type,datos_estructura),this.tipo,this.dimensiones,this.tipoDeclaracion);
                                    }
                                }
                            }
                            
                        }else {
                            ent.Add(this.identificador,val.valor,this.tipo,this.dimensiones,this.tipoDeclaracion);
                        }
                        
                    } else {// Error no son del mismo tipo
                        er.addError(new NodoError(TipoError.SEMANTICO,"El tipo declarado "+this.getTipoToString(this.tipo)+" no coincide con el tipo del valor "+this.getTipoToString(val.tipo), this.fila, this.columna));
                        return null;  
                    }
                } else { // No se declaro con tipo
                    ent.Add(this.identificador,val.valor,val.tipo,this.dimensiones,this.tipoDeclaracion);
                }
            } else { // Si la variable no esta inicializada entra aqui
                if (this.tipo!=null) {
                    ent.Add(this.identificador,"null",this.tipo,this.dimensiones,this.tipoDeclaracion);
                } else {
                    ent.Add(this.identificador,"null",Type.INDEF,this.dimensiones,this.tipoDeclaracion); 
                } 
            }
        }else{
            er.addError(new NodoError(TipoError.SEMANTICO,"La variable "+this.identificador+" ya exite en este entorno", this.fila, this.columna));
            return null;  
        }
   
     
    
        return null; 
    }catch(er){console.log("error aqui en declaracion")}
    }
    
    getDot(builder: StringBuilder, parent: string, cont: number): number {
        return cont;
    }

    traducir(builder: StringBuilder, parent: string) {
        let trad :string = "";
        if (this.tipoDeclaracion == TipoDeclaracion.PARAM) {
            trad += this.identificador+":"+this.getTipoToString(this.tipo);
        } else if (this.tipoDeclaracion == TipoDeclaracion.LET)  {
            trad += "let "+this.identificador;
            if (this.tipo!= null) {
                trad += ":"+this.getTipoToString(this.tipo);
                if (this.dimensiones!=0) {
                    for (let i = 0; i < this.dimensiones; i++) {
                        trad += "[]"
                    }
                }
            } 
            if (this.valor!=null) {
                trad += " = "+this.valor.traducir(builder);
            }
            trad += ";\n";
        }else if (this.tipoDeclaracion == TipoDeclaracion.CONST)  {
            trad += "const "+this.identificador;
            if (this.tipo!= null) {
                trad += ":"+this.getTipoToString(this.tipo);
                if (this.dimensiones!=0) {
                    for (let i = 0; i < this.dimensiones; i++) {
                        trad += " [] "
                    }
                }
            } 
            if (this.valor!=null) {
                trad += " = "+this.valor.traducir(builder);
            }
            trad += ";\n";
        }
        return trad;
    }
}

export enum TipoDeclaracion{
    LET,
    CONST,
    PARAM,
    TYPEVAL
}