import { Instruccion } from "../Abstract/Instruccion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { StringBuilder } from "../Edd/StringBuilder";
import { Expresion } from "../Abstract/Expresion";
import { ErrorManager } from "../Reportes/ErrorManager";
import { TSCollector } from "../TablaSimbolos/TSCollector";
import { Arreglo } from "../Edd/Arreglo";
import { R_TS } from "../Reportes/R_TS";
import { Type } from "../TablaSimbolos/Tipo";
import { MiType } from "../Edd/MiType";



export class Log extends Instruccion{

    valor:Array<Expresion>;

    constructor(valor:Array<Expresion>, fila:number, columna:number){
        super(fila,columna);
        this.valor = valor;
    }

    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        
        let salida = "";
        for (let index = 0; index < this.valor.length; index++) {
            const element = this.valor[index];
            let val = element.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
            if (val != null) {
                if (val.valor instanceof Arreglo) {
                   salida += val.valor.imprimirArreglo();
                } else if (val.valor instanceof MiType) {
                    salida += val.valor.imprimirType();
                } else {
                    if (val.tipo == Type.STRING && val.valor.includes("${")) {
                        let s = this.procesar(ent,val.valor);
                        salida += s;
                    }else{
                        salida += val.valor;
                    }
                    
                }
            }
        }
        if (salida!="") {
            consola.append(" > "+salida+"\n");
        }
        
        
        
        return null;
    }

    procesar(ent:Entorno,cadena:string){
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
            let element = ent.GetValue(variables[index]);
            let valor = element?.valor;
            s = s.replace("$"+index,valor);
        }
        return s;
    }
    
    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodo:string = "nodo" + ++cont;
        builder.append(nodo+" [label=\"Console.log\"];\n");
        builder.append(parent+" -> "+nodo+";\n");
        
        for (let index = 0; index < this.valor.length; index++) {
            const element = this.valor[index];
            cont = element.getDot(builder, parent, cont);
            
        }
        
        return cont;
    }

    traducir(builder: StringBuilder, parent: string) {
        let salida = "";
        for (let index = 0; index < this.valor.length; index++) {
            const element = this.valor[index];
            salida += element.traducir(builder);
            
        }
        return "console.log("+salida+");\n";
    }
   

   

}
