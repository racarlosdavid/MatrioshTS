import { Instruccion } from "../../Abstract/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { StringBuilder } from "../../Edd/StringBuilder";


export class For extends Instruccion {
    
    /*
    private inicio:Declaracion | Asignacion;
    private condicion:Expresion;
    private fin:Asignacion | Expresion;
    private instrucciones:Instruccion;

    constructor(inicio:Declaracion | Asignacion, condicion:Expresion, fin:Asignacion | Expresion, instrucciones:Array<Instruccion>, fila:number, columna:number, archivo:string) {
        super(fila,columna,archivo);
        this.inicio = inicio;
        this.condicion = condicion;
        this.fin = fin;
        this.instrucciones = instrucciones;
    }
    */

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