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
import { R_TS } from "../../Reportes/R_TS";


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

    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        let nuevo = new Entorno(ent);
        this.inicio.ejecutar(nuevo,er,consola,tsCollector,reporte_ts,ambito,padre);

        let condicionFor = this.condicion.ejecutar(nuevo,er,consola,tsCollector,reporte_ts,ambito,padre);

        if(condicionFor.tipo != Type.BOOLEAN){
            er.addError(new NodoError(TipoError.SEMANTICO, "La condicion no es booleana", this.fila, this.columna));
            return null;
        }

        while(condicionFor.valor == true){ 
            let r = this.instrucciones.ejecutar(nuevo,er,consola,tsCollector,reporte_ts,ambito,padre);
            if(r != null || r != undefined){
                if(r instanceof Break){
                    break;
                }else if(r instanceof Continue){
                    this.actualizacion.ejecutar(nuevo,er,consola,tsCollector,reporte_ts,ambito,padre);
                    continue;
                }
            }

            this.actualizacion.ejecutar(nuevo,er,consola,tsCollector,reporte_ts,ambito,padre);
            condicionFor = this.condicion.ejecutar(nuevo,er,consola,tsCollector,reporte_ts,ambito,padre);
            if(condicionFor.tipo != Type.BOOLEAN){
                er.addError(new NodoError(TipoError.SEMANTICO, "La condicion no es booleana", this.fila, this.columna));
                return null;
            } 
        }
        
        return null;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodo:string = "nodo" + ++cont;
        builder.append(nodo+" [label=\"For\"];\n");
        builder.append(parent+" -> "+nodo+";\n");
        
        let nodoCondicion = "nodo" + ++cont;
        builder.append(nodoCondicion+" [label=\"Definicion\"];\n");
        builder.append(nodo+" -> "+nodoCondicion+";\n");
        
        cont = this.inicio.getDot(builder, nodoCondicion, cont);
        
        cont = this.condicion.getDot(builder, nodoCondicion, cont);

        cont = this.actualizacion.getDot(builder, nodoCondicion, cont);
        
        let nodoInstrucciones:string = "nodo" + ++cont;
        builder.append(nodoInstrucciones+" [label=\"Instrucciones\"];\n");
        builder.append(nodo+" -> "+nodoInstrucciones+";\n");

        cont = this.instrucciones.getDot(builder, nodoInstrucciones, cont);
        
        return cont;
    }
    
    traducir(builder: StringBuilder, parent: string) {
        let trad = new StringBuilder();
        
        trad.append("for ("+this.inicio.traducir(builder,parent)+" "+this.condicion.traducir(builder)+";"+this.actualizacion.traducir(builder,parent)+") {\n");

        trad.append(this.instrucciones.traducir(builder,parent));
        
        trad.append("}\n"); 

        return trad.toString();
    }



}