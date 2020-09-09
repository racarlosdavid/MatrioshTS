
import { Entorno } from "../TablaSimbolos/Entorno";
import {Instruccion }from "./Instruccion";

export class AST {
    private instrucciones:Array<Instruccion>;

    constructor (instrucciones:Array<Instruccion>){
        this.instrucciones = instrucciones;
    }

    public getInstrucciones() : Array<Instruccion> {
        return this.instrucciones;
    }
    
    public ejecutar(ent:Entorno):any {

        for(const instr of this.instrucciones){
            try {
                if(instr instanceof Function)
                    instr.ejecutar(ent);
            } catch (error) {
                //errores.push(error);  
            }
        }
        /*
        instrucciones.forEach((ins) -> {//Primera pasada guarda las funciones en la tabla de simbolos
            try {
                if (ins instanceof Funcion) {
                    Funcion temp = (Funcion)ins;
                    temp.ejecutar(ent, ex, g, reporte_ts, ambito, padre);
                }
            } catch (Exception e) {
            }
        });
        instrucciones.forEach((ins) -> {
            try {
                if (ins instanceof Funcion) {
                    
                }else{
                    Instruccion temp = (Instruccion)ins;
                    temp.ejecutar(ent, ex, g, reporte_ts,ambito,padre);
                }
                
                
            } catch (Exception e) {
            }
        });*/
        return null;
    }
    
}
