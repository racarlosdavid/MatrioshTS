import { Instruccion } from "../../Abstract/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { StringBuilder } from "../../Edd/StringBuilder";
import { Expresion } from "../../Abstract/Expresion";
import { Retorno } from "../../Abstract/Retorno";
import { Type } from "../../TablaSimbolos/Tipo";
import { NodoError, TipoError } from "../../Reportes/NodoError";
import { TSCollector } from "../../TablaSimbolos/TSCollector";

export class If extends Instruccion {
        
    condicion:Expresion ; 
    instrucciones:Instruccion;

    constructor( condicion:Expresion, instrucciones:Instruccion, fila:number, columna:number) {
        super(fila,columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    ejecutar(ent: Entorno, er: ErrorManager, consola:StringBuilder, tsCollector:TSCollector) {
        let rcondicion:any = this.condicion.ejecutar(ent,er);
        
            if (rcondicion.tipo != Type.BOOLEAN) {
                er.addError(new NodoError(TipoError.SEMANTICO, "Se esperaba una condicional booleana en la instruccion if "+rcondicion+" no es boolean", this.fila, this.columna));
                return null;
            }
            if (rcondicion.valor == true) {
                return this.instrucciones.ejecutar(ent,er,consola,tsCollector);
            }
      
        return null;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodo:string = "nodo" + ++cont;
        builder.append(nodo+" [label=\"If\"];\n");
        builder.append(parent+" -> "+nodo+";\n");
        
        let nodoCondicion:string = "nodo" + ++cont;
        builder.append(nodoCondicion+" [label=\"Condicion\"];\n");
        builder.append(nodo+" -> "+nodoCondicion+";\n");
        
        cont = this.condicion.getDot(builder, nodoCondicion, cont);
        
        let nodoInstrucciones:string = "nodo" + ++cont;
        builder.append(nodoInstrucciones+" [label=\"Instrucciones\"];\n");
        builder.append(nodo+" -> "+nodoInstrucciones+";\n");

        cont = this.instrucciones.getDot(builder, nodoInstrucciones, cont);
        
        return cont;
    }
    
    traducir(builder: StringBuilder, parent: string) {
        return "if ("+this.condicion.traducir(builder)+") {"+this.instrucciones.traducir(builder,parent)+"}\n";
    } 
}