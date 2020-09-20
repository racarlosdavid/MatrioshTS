import { Instruccion } from "../../Abstract/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { StringBuilder } from "../../Edd/StringBuilder";
import { TSCollector } from "../../TablaSimbolos/TSCollector";
import { Declaracion } from "../Declaracion";
import { Asignacion } from "../Asignacion";
import { Expresion } from "../../Abstract/Expresion";
import { Type } from "../../TablaSimbolos/Tipo";
import { NodoError, TipoError } from "../../Reportes/NodoError";
import { Break } from "../SentenciasTransferencia/Break";
import { Continue } from "../SentenciasTransferencia/Continue";


export class For extends Instruccion {
    
    inicio:Instruccion; //Es una declaracion o una asignacion
    condicion:Expresion;
    actualizacion:Instruccion; // Es una asignacion o aumento o incremento
    instrucciones:Instruccion;

    constructor(inicio:Instruccion, condicion:Expresion, actualizacion:Instruccion, instrucciones:Instruccion, fila:number, columna:number) {
        super(fila,columna);
        this.inicio = inicio;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.instrucciones = instrucciones;
    }

    ejecutar(ent: Entorno, er: ErrorManager, consola: StringBuilder, tsCollector: TSCollector) {
        let nuevo = new Entorno(ent);
        this.inicio.ejecutar(nuevo,er,consola,tsCollector);

        let condicionFor = this.condicion.ejecutar(nuevo,er);

        if(condicionFor.tipo != Type.BOOLEAN){
            er.addError(new NodoError(TipoError.SEMANTICO, "La condicion no es booleana", this.fila, this.columna));
            return null;
        }

        while(condicionFor.valor == true){ 
            let r = this.instrucciones.ejecutar(nuevo,er,consola,tsCollector);
            if(r != null || r != undefined){
                if(r instanceof Break){
                    break;
                }else if(r instanceof Continue){
                    this.actualizacion.ejecutar(nuevo,er,consola,tsCollector);
                    continue;
                }
            }

            this.actualizacion.ejecutar(nuevo,er,consola,tsCollector);
            condicionFor = this.condicion.ejecutar(nuevo,er);
            if(condicionFor.tipo != Type.BOOLEAN){
                er.addError(new NodoError(TipoError.SEMANTICO, "La condicion no es booleana", this.fila, this.columna));
                return null;
            } 
        }
        
        return null;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        console.log("Method not implemented. FOR");
        return cont;
    }
    
    traducir(builder: StringBuilder, parent: string) {
        console.log("Method not implemented.FOR ");
    }



}