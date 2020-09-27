import { Instruccion } from "../../Abstract/Instruccion";
import { Expresion } from "../../Abstract/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { StringBuilder } from "../../Edd/StringBuilder";
import { Break } from "../SentenciasTransferencia/Break";
import { Continue } from "../SentenciasTransferencia/Continue";
import { Type } from "../../TablaSimbolos/Tipo";
import { TipoError, NodoError } from "../../Reportes/NodoError";
import { TSCollector } from "../../TablaSimbolos/TSCollector";
import { R_TS } from "../../Reportes/R_TS";

export class DoWhile extends Instruccion{

    private instrucciones:Instruccion;
    private condicion:Expresion;

    constructor(instrucciones:Instruccion, condicion:Expresion, fila:number, columna:number) {
        super(fila,columna);
        this.instrucciones = instrucciones;
        this.condicion = condicion;
    }

    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        let rcondicion;
        do {    
            let r = this.instrucciones.ejecutar(ent,er,consola,tsCollector,reporte_ts,"local: do while",ambito);
            
            if(r != null || r != undefined){
                if(r instanceof Break){ 
                    break;
                } else if(r instanceof Continue){
                    continue;
                } 
            }
            rcondicion = this.condicion.ejecutar(ent,er,consola,tsCollector,reporte_ts,"local: do while",ambito);
            if(rcondicion.tipo != Type.BOOLEAN){ 
                er.addError(new NodoError(TipoError.SEMANTICO, "La condicion no es booleana", this.fila, this.columna,ambito));
                return null;
            }
        } while (rcondicion.valor);
        return null;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodo:string = "nodo" + ++cont;
        builder.append(nodo+" [label=\"Do While\"];\n");
        builder.append(parent+" -> "+nodo+";\n");
        
        let nodoInstrucciones:string = "nodo" + ++cont;
        builder.append(nodoInstrucciones+" [label=\"Instrucciones\"];\n");
        builder.append(nodo+" -> "+nodoInstrucciones+";\n");

        cont = this.instrucciones.getDot(builder, nodoInstrucciones, cont);

        let nodoCondicion:string = "nodo" + ++cont;
        builder.append(nodoCondicion+" [label=\"Condicion\"];\n");
        builder.append(nodo+" -> "+nodoCondicion+";\n");
        
        cont = this.condicion.getDot(builder, nodoCondicion, cont);
        
        return cont;
    }

    traducir(builder: StringBuilder, parent: string) {
        let trad = new StringBuilder();
        
        trad.append("do {\n");

        trad.append(this.instrucciones.traducir(builder,parent));
        
        trad.append("}while("+this.condicion.traducir(builder)+")\n"); 

        return trad.toString();
    }
    
}