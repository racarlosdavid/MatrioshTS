import { Instruccion } from "../Abstract/Instruccion";
import { Tipo, Type } from "../TablaSimbolos/Tipo";
import { Entorno } from "../TablaSimbolos/Entorno";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "../Edd/StringBuilder";
import { Expresion } from "../Abstract/Expresion";
import { NodoError, TipoError } from "../Reportes/NodoError";
import { TSCollector } from "../TablaSimbolos/TSCollector";
import { Arreglo } from "../Edd/Arreglo";

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

    ejecutar(ent: Entorno, er: ErrorManager, consola:StringBuilder, tsCollector: TSCollector) {
        if (!ent.Existe(this.identificador)) {
        //if (this.tipoDeclaracion == TipoDeclaracion.LET) {
            if (this.valor!=null) { // Si la variable esta inicializada entra a este if, 
                let val = this.valor?.ejecutar(ent,er);
                if (this.tipo!=null) { // Si se declaron con un tipo hay que comprobar que el valor sea del mismo tipo
                    if (this.tipo == val.tipo || val.tipo == Type.ARRAY) { // Ok. se guarda en la TS
                        if (val.valor instanceof Arreglo) {
                            let tempo:Arreglo = val.valor;
                            tempo.setTipo(this.tipo);
                            //console.log(tempo.tipo + " ss "+ val.valor + " el tamaño del array es "+tempo.getTamaño())
                            ent.Add(this.identificador,tempo,this.tipo,tempo.getTamaño(),this.tipoDeclaracion);
                        } else {
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
    PARAM
}