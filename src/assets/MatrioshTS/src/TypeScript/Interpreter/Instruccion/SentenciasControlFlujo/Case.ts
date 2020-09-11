import { Instruccion } from "../../Abstract/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { StringBuilder } from "../../Edd/StringBuilder";
import { Expresion } from "../../Abstract/Expresion";
import { Break } from "../SentenciasTransferencia/Break";
import { Continue } from "../SentenciasTransferencia/Continue";
import { NodoError, TipoError } from "../../Reportes/NodoError";


export class Case extends Instruccion{
   
    private condicion:Expresion;
    private instrucciones:Array<Instruccion> ;

    constructor( condicion:Expresion, instrucciones:Array<Instruccion> , fila:number, columna:number) {
        super(fila,columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    
    ejecutar(ent: Entorno, er: ErrorManager) {
        let nuevo=new Entorno(ent);
        for(let inst of this.instrucciones){ 
            let r = inst.ejecutar(nuevo,er);
            if(r!=null){
                if(r instanceof Continue){
                    er.addError(new NodoError(TipoError.SEMANTICO, " Continue no es valido en switch", inst.fila, inst.columna));
                    continue;
                }else{ 
                    return r;
                }
            }
        }
        return null;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodo:string = "nodo" + ++cont;
        builder.append(nodo+" [label=\"Case\"];\n");
        builder.append(parent+" -> "+nodo+";\n");
        
        let nodoCondicion:string = "nodo" + ++cont;
        builder.append(nodoCondicion+" [label=\"Condicion\"];\n");
        builder.append(nodo+" -> "+nodoCondicion+";\n");
        
        cont = this.condicion.getDot(builder, nodoCondicion, cont);
        
        let nodoInstrucciones:string = "nodo" + ++cont;
        builder.append(nodoInstrucciones+" [label=\"Instrucciones\"];\n");
        builder.append(nodo+" -> "+nodoInstrucciones+";\n");

        for (let instr of this.instrucciones) {
            cont = instr.getDot(builder, nodoInstrucciones, cont);
        }
        
        return cont;
    }
    
    traducir(builder: StringBuilder) {
        let trad = new StringBuilder();
        trad.append("case "+this.condicion.traducir(builder)+" : \n");
        
        for (let instr of this.instrucciones) {
            trad.append(instr.traducir(builder));
        }
        
        return trad.toString();
    }

    getCondicion():Expresion {
        return this.condicion;
    }

    setCondicion(condicion:Expresion):void {
        this.condicion = condicion;
    }

    getInstrucciones():Array<Instruccion> {
        return this.instrucciones;
    }

    setInstrucciones(instrucciones:Array<Instruccion>):void {
        this.instrucciones = instrucciones;
    }

}