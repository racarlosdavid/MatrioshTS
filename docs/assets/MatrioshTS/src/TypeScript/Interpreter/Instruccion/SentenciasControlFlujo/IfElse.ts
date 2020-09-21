import { Instruccion } from "../../Abstract/Instruccion";
import { Expresion } from "../../Abstract/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { StringBuilder } from "../../Edd/StringBuilder";
import { Retorno } from "../../Abstract/Retorno";
import { NodoError, TipoError } from "../../Reportes/NodoError";
import { Type } from "../../TablaSimbolos/Tipo";
import { TSCollector } from "../../TablaSimbolos/TSCollector";
import { R_TS } from "../../Reportes/R_TS";

export class IfElse extends Instruccion {
    
    condicion:Expresion;
    instrucciones:Instruccion;
    _else:Instruccion;

    constructor(condicion:Expresion, instrucciones:Instruccion, _else:Instruccion, fila:number, columna:number){
        super(fila,columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this._else = _else;
    }

    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        let rcondicion:any = this.condicion.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
        if(rcondicion instanceof Retorno){
            if (rcondicion.tipo != Type.BOOLEAN) {
                er.addError(new NodoError(TipoError.SEMANTICO, "Se esperaba una condicional booleana en la instruccion if else "+rcondicion+" no es boolean", this.fila, this.columna));
                return null;
            }
            if (rcondicion.valor == true) {
                return this.instrucciones.ejecutar(ent,er,consola,tsCollector,reporte_ts,"local: if",padre);
            }else{
                return this._else.ejecutar(ent,er,consola,tsCollector,reporte_ts,"local: if",padre);
            }
        }else{
            er.addError(new NodoError(TipoError.SEMANTICO, "Se esperaba una condicional booleana en la instruccion if else "+rcondicion+" no es boolean", this.fila, this.columna));
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

        cont = this.instrucciones.getDot(builder, nodo, cont);

        let nodoElse:string = "nodo" + ++cont;
        builder.append(nodoElse+" [label=\"Else\"];\n");
        builder.append(nodo+" -> "+nodoElse+";\n");
        
        cont = this._else.getDot(builder, nodoElse, cont);
        
        return cont;
    }

    traducir(builder: StringBuilder, parent: string) {
        return "if ("+this.condicion.traducir(builder)+") {\n"+this.instrucciones.traducir(builder,parent)+"} else "+this._else.traducir(builder,parent);
    }
}