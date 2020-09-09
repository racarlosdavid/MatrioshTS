import { Expresion } from "../Abstract/Expresion";
import { Funcion } from "../Instruccion/Funcion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { Instruccion } from "../Abstract/Instruccion";

export class ConsoleLog extends Funcion {

    private valor:Expresion|null = null;

    constructor(identificador:string, parametros:Array<any> , instrucciones:Array<Instruccion>, fila:number, columna:number) {
        super(identificador, parametros, instrucciones, fila, columna);
    }

    ejecutar(ent: Entorno) {
        throw new Error("Method not implemented.");
    }

    public getValor():Expresion|null {
        return this.valor;
    }

    public setValor(valor:Expresion):void {
        this.valor = valor;
    }
}