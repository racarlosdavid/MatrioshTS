import { Instruccion } from "../../Abstract/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { StringBuilder } from "../../Edd/StringBuilder";
import { Expresion } from "../../Abstract/Expresion";
import { TSCollector } from "../../TablaSimbolos/TSCollector";
import { R_TS } from "../../Reportes/R_TS";

export class Return extends Instruccion{

    valor:Expresion|null;

    constructor(valor:Expresion|null, fila:number, columna:number){
        super(fila,columna);
        this.valor = valor;
    }
    
    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        if (this.valor != null) {
            return this.valor.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
        } else {
            return this;
        }
        
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodo:string = "nodo" + ++cont;
        builder.append(nodo+" [label=\"Return\"];\n");
        builder.append(parent+" -> "+nodo+";\n");
        
        
        if (this.valor != null) {
            cont = this.valor.getDot(builder, nodo, cont);
        }
        
        return cont;
    }
    
    traducir(builder: StringBuilder, parent: string) {
        if (this.valor != null) {
            return "return "+this.valor.traducir(builder)+";\n";
        } else {
            return "return ;\n";
        }
    }

}