import { Expresion } from "../Abstract/Expresion";
import { Instruccion } from "../Abstract/Instruccion";
import { Retorno } from "../Abstract/Retorno";
import { Declaracion } from "../Instruccion/Declaracion";
import { ErrorManager } from "../Reportes/ErrorManager";
import { R_TS } from "../Reportes/R_TS";
import { Entorno } from "../TablaSimbolos/Entorno";
import { Type } from "../TablaSimbolos/Tipo";
import { TSCollector } from "../TablaSimbolos/TSCollector";
import { StringBuilder } from "./StringBuilder";

export class TypeTSDefinicion extends Expresion{

    valores:Array<Declaracion>;

    constructor(valores:Array<Declaracion>, fila:number, columna:number){   
        super(fila,columna);
        this.valores = valores;
    }

    ejecutar(ent: Entorno, er: ErrorManager, consola: StringBuilder, tsCollector: TSCollector, reporte_ts: R_TS, ambito: string, padre: string) {
        return new Retorno(this,Type.TYPE);
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodoValores:string = "nodo" + ++cont;
        builder.append(nodoValores+" [label=\"Valores\"];\n");
        builder.append(parent+" -> "+nodoValores+";\n");

        for (let instr of this.valores) {
            cont = instr.getDot(builder, nodoValores, cont);
        }
        return cont;
    }

    traducir(builder: StringBuilder) {
        let tempo = new StringBuilder (); 
        // Traduccion de los parametros
        let v = new StringBuilder();
        if (this.valores.length == 0) {
            tempo.append("{ }");
        } else {
            tempo.append("{");
            for (let index = 0; index < this.valores.length; index++) {
                let element = this.valores[index];
                v.append(element.traducir(builder,""));
                if (index != this.valores.length-1) {
                    v.append(",");
                }
            }
            tempo.append(v.toString());
            tempo.append("}\n");
        }
       // Fin 
       return tempo.toString();
    } 

    
}