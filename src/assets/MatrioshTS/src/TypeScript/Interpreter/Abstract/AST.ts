
import { Entorno } from "../TablaSimbolos/Entorno";
import { Instruccion }from "./Instruccion";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "../Edd/StringBuilder";


export class AST {
    private instrucciones:Array<Instruccion>;

    constructor (instrucciones:Array<Instruccion>){
        this.instrucciones = instrucciones;
    }

    public getInstrucciones() : Array<Instruccion> {
        return this.instrucciones;
    }

    traducir(builder: StringBuilder):any { console.log("Ok. Vamos a traducir la cadena de entrada");
        for(const instr of this.instrucciones){
            try {
                builder.append(instr.traducir(builder));
            } catch (error) {
                console.log("Error en la traduccion: "+error);
            }
        }
        return builder.toString();
    }
    
    public ejecutar(ent:Entorno, er:ErrorManager):any { console.log("Ok. Vamos a interpretar la cadena de entrada");
       
        for(const instr of this.instrucciones){
            try {
                instr.ejecutar(ent,er);
            } catch (error) {
                console.log("Error en la interpretacion: "+error);
            }
        }

        /*
        for(const instr of this.instrucciones){
            try {
                if(instr instanceof Function)
                    instr.ejecutar(ent);
            } catch (error) {
                //errores.push(error);  
            }
        }*/

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
