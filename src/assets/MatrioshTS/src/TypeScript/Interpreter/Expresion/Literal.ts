import { Expresion } from "../Abstract/Expresion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "../Edd/StringBuilder";
import { Type } from "../TablaSimbolos/Tipo";
import { Retorno } from "../Abstract/Retorno";
import { TSCollector } from "../TablaSimbolos/TSCollector";
import { R_TS } from "../Reportes/R_TS";
const parser2 = require('../../../Gramatica/Auxiliar');

export class Literal extends Expresion{
    valor:any;
    tipo:Type;
    tipoString:TipoString;

    constructor(valor:any,tipo:Type,tipoString:TipoString,fila:number,columna:number){
        super(fila,columna);
        this.valor = valor;
        this.tipo = tipo;
        this.tipoString = tipoString;
    }
    
    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        if (this.tipoString == TipoString.STRING3) {
            let s = this.procesar(ent,er,consola,tsCollector,reporte_ts,ambito,padre,this.valor);
            return new Retorno(s,this.tipo);
        }else{
            return new Retorno(this.valor,this.tipo);
        }
        
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodoOp:string = "nodo" + ++cont;
        builder.append(nodoOp+" [label=\""+this.valor+"\"];\n");
        builder.append(parent+" -> "+nodoOp+"[color=\"red:black;0.50:red\"];\n");
        return cont;
    }

    traducir(builder: StringBuilder) { 
        if (this.tipoString == TipoString.STRING1) {
            return "\""+this.valor.toString()+"\"";
        } else if (this.tipoString == TipoString.STRING2) {
            return "\'"+this.valor.toString()+"\'";
        } else if (this.tipoString == TipoString.STRING3) {
            return "\`"+this.valor.toString()+"\`";
        }
        return this.valor.toString();
    }

    procesar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string,cadena:string){
        let id:string = "";
        let variables = [];
        let s:string = "";
        let bandera:boolean = false;
        let cont = 0;
        for (let index = 0; index < cadena.length; index++) {
                const element = cadena[index];
                if (element == "$") {
                    s += "$"+cont;
                    cont++;
                } else if (element == "{"){
                    bandera = true;
                } else if (element == "}"){
                    bandera = false;
                    variables.push(id);
                    id = "";
                }
                if(bandera && element != "{"){
                    id += element;
                }
                if(!bandera && element != "$" && element != "}"){
                    s += element;
                }
        }
        
        for (let index = 0; index < variables.length; index++) {
            let exp:Expresion = parser2.parse(variables[index]);
            let valor = exp.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre)
            s = s.replace("$"+index,valor.valor);
        }
        return s;
    }
}

export enum TipoString {
    STRING1,
    STRING2,
    STRING3,
    INDEF
}