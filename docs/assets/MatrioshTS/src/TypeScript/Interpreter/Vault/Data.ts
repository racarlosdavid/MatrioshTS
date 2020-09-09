import { Instruccion } from "../Abstract/Instruccion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "../Edd/StringBuilder";


export class Data extends Instruccion{
    
    data:string;
    
    constructor(data:string, fila:number, columna:number){
        super(fila,columna);
        this.data = data;
    }

    ejecutar(ent: Entorno, er: ErrorManager) {
        throw new Error("Method not implemented.");
    }
    getDot(builder: StringBuilder, parent: string, cont: number): number {
        throw new Error("Method not implemented.");
    }
    traducir(builder: StringBuilder) {
        throw new Error("Method not implemented.");
    }
}