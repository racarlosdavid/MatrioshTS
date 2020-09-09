import { Instruccion } from "../Abstract/Instruccion";
export class Funcion extends Instruccion {
    //constructor(tipo:Tipo|null, identificador:string, parametros:Array<any>, instrucciones:Array<Instruccion>, fila:number, columna:number) {
    constructor(identificador, parametros, instrucciones, fila, columna) {
        super(fila, columna);
        //this.tipo = tipo;
        this.identificador = identificador;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }
    ejecutar(ent) {
        throw new Error("Method not implemented.");
    }
    getDot(builder, parent, cont) {
        throw new Error("Method not implemented.");
    }
}
