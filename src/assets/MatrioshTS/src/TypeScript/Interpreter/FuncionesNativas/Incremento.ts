import { Instruccion } from "../Abstract/Instruccion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "../Edd/StringBuilder";
import { Simbolo } from "../TablaSimbolos/Simbolo";
import { Retorno } from "../Abstract/Retorno";
import { Type } from "../TablaSimbolos/Tipo";


export class Incremento extends Instruccion{
    identificador:string;

    constructor(identificador:string, fila:number, columna:number){
        super(fila,columna);
        this.identificador = identificador;
    }
    ejecutar(ent: Entorno, er: ErrorManager) {
        let obj:Simbolo|null = ent.GetValue(this.identificador);

        if (obj instanceof Simbolo) {  
           if (obj.valor instanceof Retorno) {
               if (obj.valor.tipo == Type.NUMBER) { 
                obj.valor.valor = obj.valor.valor+1;
                ent.ChangeValue(this.identificador,obj.valor);
               } else {
                   //Error no es de tipo number para hacer ++
               }
           }
            
        }
        return null;
    }
    getDot(builder: StringBuilder, parent: string, cont: number): number {
        throw new Error("Method not implemented. getdot Incremento");
    }
    traducir(builder: StringBuilder) {
        throw new Error("Method not implemented.traducir incrementos");
    }


}