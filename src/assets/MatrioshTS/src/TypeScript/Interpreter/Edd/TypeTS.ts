import { Instruccion } from "../Abstract/Instruccion";
import { ErrorManager } from "../Reportes/ErrorManager";
import { Entorno } from "../TablaSimbolos/Entorno";
import { TSCollector } from "../TablaSimbolos/TSCollector";
import { StringBuilder } from "./StringBuilder";


export class TypeTS extends Instruccion{

    identificador:string;
    variables:Array<Instruccion>;

    constructor(identificador:string, variables:Array<Instruccion>, fila:number, columna:number){
        super(fila,columna);
        this.identificador = identificador;
        this.variables = variables;
    }

    ejecutar(ent: Entorno, er: ErrorManager, consola: StringBuilder, tsCollector: TSCollector) {
        throw new Error("Method EJECUTAR not implemented. TypeTS");
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        console.log("Method getDot not implemented. TypeTS");
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
                if (index<this.variables.length-1) {
                    v.append(",\n");
                }else{
                    v.append("\n");
                }
            }
            tempo.append(v.toString());
            tempo.append("};\n");
        }
       // Fin
       return tempo.toString();
    }

}