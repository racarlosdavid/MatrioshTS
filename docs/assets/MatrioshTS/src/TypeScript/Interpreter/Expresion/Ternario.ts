import { Expresion } from "../Abstract/Expresion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "../Edd/StringBuilder";
import { NodoError, TipoError } from "../Reportes/NodoError";
import { Type } from "../TablaSimbolos/Tipo";

export class Ternario extends Expresion{
    
    condicion:Expresion;
    retornarTrue:Expresion;
    retornarFalse:Expresion;

    constructor(condicion:Expresion, retornarTrue:Expresion, retornarFalse:Expresion, fila:number, columna:number ){
        super(fila,columna);
        this.condicion = condicion;
        this.retornarTrue = retornarTrue;
        this.retornarFalse= retornarFalse;
    }

    ejecutar(ent: Entorno, er: ErrorManager) {
        let condicional = this.condicion.ejecutar(ent,er);
        if (condicional.tipo != Type.BOOLEAN) {
            er.addError(new NodoError(TipoError.SEMANTICO, "Se esperaba una condicional booleana en el operador ternario", this.fila, this.columna));
        } else { 
            if(condicional.valor == true){
                return this.retornarTrue.ejecutar(ent,er);
            }
            return this.retornarFalse.ejecutar(ent,er);
        }
        return null; 
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodo:string = "nodo" + ++cont;
        builder.append(nodo+" [label=\"Expresion Ternaria\"];\n");
        builder.append(parent+" -> "+nodo+"[color=\"red:black;0.50:red\"];\n");

        cont = this.condicion.getDot(builder, nodo, cont);

        let nodoOp:string = "nodo" + ++cont;
        builder.append(nodoOp+" [label=\""+"?"+"\"];\n");
        builder.append(nodo+" -> "+nodoOp+"[color=\"red:black;0.50:red\"];\n");

        cont = this.retornarTrue.getDot(builder, nodo, cont);

        let nodoOp1:string = "nodo" + ++cont;
        builder.append(nodoOp1+" [label=\""+":"+"\"];\n");
        builder.append(nodo+" -> "+nodoOp1+"[color=\"red:black;0.50:red\"];\n");

        cont = this.retornarFalse.getDot(builder, nodo, cont);
        return cont;
    }

    traducir(builder: StringBuilder) { 
        return this.condicion.traducir(builder)+" ? "+this.retornarTrue.traducir(builder)+" : "+this.retornarFalse.traducir(builder);
    }
}