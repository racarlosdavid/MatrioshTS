
import { Entorno } from "../TablaSimbolos/Entorno";
import { StringBuilder } from "../Edd/StringBuilder";
import { Instruccion } from "../Abstract/Instruccion";

export class Funcion extends Instruccion{

    private identificador:string;
    private parametros:Array<any> ; //Array<Declaracion> ;
    private instrucciones:Array<Instruccion> ;

    //constructor(tipo:Tipo|null, identificador:string, parametros:Array<any>, instrucciones:Array<Instruccion>, fila:number, columna:number) {
    
    constructor(identificador:string, parametros:Array<any>, instrucciones:Array<Instruccion>, fila:number, columna:number) {
        super(fila,columna);
        //this.tipo = tipo;
        this.identificador = identificador;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }

    ejecutar(ent: Entorno) {
        throw new Error("Method not implemented.");
    }
    getDot(builder: StringBuilder, parent: string, cont: number): number {
        throw new Error("Method not implemented.");
    }
    
}