import { Instruccion } from "../Abstract/Instruccion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "../Edd/StringBuilder";
import { NodoError, TipoError } from "../Reportes/NodoError";
import { Funcion } from "./Funcion";
import { TSCollector } from "../TablaSimbolos/TSCollector";

export class Bloque extends Instruccion{
    
    instrucciones:Array<Instruccion>;

    constructor(instrucciones:Array<Instruccion>, linea:number, columna:number){
        super(linea, columna);
        this.instrucciones = instrucciones; 
    }

    ejecutar(ent: Entorno, er: ErrorManager, consola:StringBuilder, tsCollector: TSCollector) {
        let nuevo = new Entorno(ent);
        for(const instr of this.instrucciones){
            try {
                const element = instr.ejecutar(nuevo,er,consola,tsCollector); 
                if(element != undefined || element != null)
                    return element;                
            } catch (error) {
                er.addError(new NodoError(TipoError.SEMANTICO, ""+error+"", this.fila, this.columna));
        
            }
        }
        return null;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodo:string = "nodo" + ++cont;
        builder.append(nodo+" [label=\"Instrucciones\"];\n");
        builder.append(parent+" -> "+nodo+";\n");
    
        for (const instr of this.instrucciones) {
            cont = instr.getDot(builder, nodo, cont);
        }
        
        return cont;
    }

    traducir(builder: StringBuilder, parent: string) {
        let nuevo = new StringBuilder();
        for(const instr of this.instrucciones){ 
            try {
                //if (instr instanceof Funcion) { 
                  //  builder.append(instr.traducir(builder,parent));
                //} else {
                    nuevo.append(instr.traducir(builder,parent)+"\n");
                //}
            } catch (error) {
                console.log(`Error en la traduccion Bloque: ${error}`);
                //er.addError(new NodoError(TipoError.SEMANTICO, ""+error+"", this.fila, this.columna));
            }
        }
        return nuevo.toString();
    }

    
}