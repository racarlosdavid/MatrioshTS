import { Instruccion } from "../Abstract/Instruccion";
import { Declaracion } from "../Instruccion/Declaracion";
import { ErrorManager } from "../Reportes/ErrorManager";
import { R_TS } from "../Reportes/R_TS";
import { Entorno } from "../TablaSimbolos/Entorno";
import { TSCollector } from "../TablaSimbolos/TSCollector";  
import { StringBuilder } from "./StringBuilder";  
 
export class TypeTS extends Instruccion{      
    
    identificador:string;
    variables:Array<Declaracion>;   

    constructor(identificador:string, variables:Array<Declaracion>, fila:number, columna:number){
        super(fila,columna); 
        this.identificador = identificador;  
        this.variables = variables;
    }

    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        ent.AddType(this.identificador,this);
        return null;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodo:string = "nodo" + ++cont;
        builder.append(nodo+" [label=\" Funcion: "+this.identificador+"\"];\n");
        builder.append(parent+" -> "+nodo+";\n");

        let nodoVariables:string = "nodo" + ++cont;
        builder.append(nodoVariables+" [label=\"Variables\"];\n");
        builder.append(nodo+" -> "+nodoVariables+";\n");

        for (let instr of this.variables) {
            cont = instr.getDot(builder, nodoVariables, cont);
        }

        return cont;
    }

    traducir(builder: StringBuilder, parent: string) {
        let tempo = new StringBuilder (); 
        tempo.append("type "+this.identificador+" = ");
        // Traduccion de los parametros
        let v = new StringBuilder();
        if (this.variables.length == 0) {
            tempo.append("{ }");
        } else {
            tempo.append("{\n");
            for (let index = 0; index < this.variables.length; index++) {
                let element = this.variables[index];
                v.append(element.traducir(builder,parent));
                v.append(";\n");
                
            }
            tempo.append(v.toString());
            tempo.append("};\n");
        }
       // Fin 
       return tempo.toString();
    }

}