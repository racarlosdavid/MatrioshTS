import { Instruccion } from "../../Abstract/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { StringBuilder } from "../../Edd/StringBuilder";
import { Expresion } from "../../Abstract/Expresion";
import { NodoError, TipoError } from "../../Reportes/NodoError";
import { Retorno } from "../../Abstract/Retorno";
import { Type } from "../../TablaSimbolos/Tipo";

export class If extends Instruccion { 
    
    condicion:Expresion ; 
    instrucciones:Instruccion;
    ins_else:Instruccion|null; 
    tipo:TipoIf;


    constructor( condicion:Expresion, instrucciones:Instruccion, ins_else: Instruccion | null, tipo:TipoIf, fila:number, columna:number) {
        super(fila,columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.ins_else = ins_else;
        this.tipo = tipo;
    }

    ejecutar(ent: Entorno, er: ErrorManager) { 
        let rcondicion:any = this.condicion.ejecutar(ent,er);
        if(rcondicion instanceof Retorno){
            if (rcondicion.tipo != Type.BOOLEAN) {
                er.addError(new NodoError(TipoError.SEMANTICO, "Se esperaba una condicional booleana en la instruccion if "+rcondicion+" no es boolean", this.fila, this.columna));
                return null;
            }
            if (rcondicion.valor == true) {
                return this.instrucciones.ejecutar(ent,er);
            }else{
                return this.ins_else?.ejecutar(ent,er);
            }
        }else{
            er.addError(new NodoError(TipoError.SEMANTICO, "Se esperaba una condicional booleana en la instruccion if "+rcondicion+" no es boolean", this.fila, this.columna));
        }
        return null;

    }

    getDot(builder: StringBuilder, parent: string, cont: number): number { 
        if (this.tipo == TipoIf.IF) {
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
            
        } else if (this.tipo == TipoIf.IFELSEIF) { console.log(" if else if ");
        
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
            
            if (this.ins_else!=null) {
                cont = this.ins_else.getDot(builder,nodoElse,cont);
            }
            
        } else if(this.tipo == TipoIf.IFELSE){ 
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
            
            if (this.ins_else!=null) {
                cont = this.ins_else.getDot(builder,nodoElse,cont);
            }
        }
        
        return cont;
    }

    traducir(builder: StringBuilder) {
        let trad:string;

        trad = "\n"

        return trad;
    }

    getTipoIF(t:TipoIf):string{
        switch (t) {
            case TipoIf.IF:
                return "if";
            case TipoIf.IFELSEIF:
                return "else if";
            case TipoIf.IFELSE:
                return "else"; 
            default:
                return "error"; 
        }
    }

 }

 export enum TipoIf {
    IF,
    IFELSEIF,
    IFELSE
}