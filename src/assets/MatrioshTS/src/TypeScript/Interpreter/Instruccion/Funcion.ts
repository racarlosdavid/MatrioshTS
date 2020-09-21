import { Instruccion } from "../Abstract/Instruccion";
import { Entorno } from "../TablaSimbolos/Entorno";
import { ErrorManager } from "../Reportes/ErrorManager";
import { StringBuilder } from "../Edd/StringBuilder";
import { Declaracion } from "./Declaracion";
import { TSCollector } from "../TablaSimbolos/TSCollector";
import { Type } from "../TablaSimbolos/Tipo";
import { Manager } from "../Reportes/Manager";
import { R_TS } from "../Reportes/R_TS";

export class Funcion extends Instruccion{
    identificador:string;
    padre:string|null;
    parametros:Array<Declaracion>;
    tipoRetorno:Type|string|null;
    instrucciones:Array<Instruccion>; 
    

    constructor(identificador:string, padre:string|null, parametros:Array<Declaracion>, tipoRetorno:Type|string|null, instrucciones:Array<Instruccion>, fila:number, columna:number){
        super(fila,columna);
        this.identificador = identificador;
        this.padre = padre;
        this.parametros = parametros;
        this.tipoRetorno = tipoRetorno;
        this.instrucciones = instrucciones; 
    }

    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        ent.AddFunction(this.identificador, this);
        return null;
        //console.log("SOY UNA FUNCION "+this.identificador+" "+this.padre);
        /*
        let t = new StringBuilder();
        if (this.padre!=null) {
            let nuevo_id  = this.generarNombre(this.identificador,this.padre);
            console.log( nuevo_id +"( ) {\n"+this.instrucciones.traducir(t)+"\n}\n" );
        }
        */
        /*
        var str = "Suma_Resta"; 
        var splitted = str.split("_"); 
        console.log("Yo soy "+splitted[1] +" y mi padre es "+splitted[0])
        console.log(" El id de la funcion "+this.identificador);

        for(const instr of this.instrucciones){
            try {
                instr.ejecutar(ent,er,consola,tsCollector);
            } catch (error) {
                console.log(`Error en la funcion ${this.identificador}: ${error}`);
            }
        }
        */
        
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
     
        let nodo:string = "nodo" + ++cont;
        builder.append(nodo+" [label=\" Funcion: "+this.identificador+"\"];\n");
        builder.append(parent+" -> "+nodo+";\n");

        let nodoParametros:string = "nodo" + ++cont;
        builder.append(nodoParametros+" [label=\"Parametros\"];\n");
        builder.append(nodo+" -> "+nodoParametros+";\n");

        for (let instr of this.parametros) {
            cont = instr.getDot(builder, nodoParametros, cont);
        }

        let nodoInstrucciones:string = "nodo" + ++cont;
        builder.append(nodoInstrucciones+" [label=\"Instrucciones\"];\n");
        builder.append(nodo+" -> "+nodoInstrucciones+";\n");

        for (const instr of this.instrucciones) {
            cont = instr.getDot(builder, nodoInstrucciones, cont);
        }

        return cont;
        
    }

    traducir(builder: StringBuilder, parent: string) {
        let tempo = new StringBuilder (); 
        tempo.append("function ");
        if (this.padre!=null) { 
            let nuevo_id  = this.generarNombre(this.identificador,this.padre);
            Manager.getManager().addF(this.identificador,nuevo_id);
            tempo.append(nuevo_id);
            // Traduccion de los parametros
            let param = new StringBuilder();
            if (this.parametros.length == 0) {
                tempo.append("( )");
            } else {
                tempo.append("(");
                for (let index = 0; index < this.parametros.length; index++) {
                    let element = this.parametros[index];
                    param.append(element.traducir(builder,parent));
                    if (index<this.parametros.length-1) {
                        param.append(",");
                    }
                }
                tempo.append(param.toString());
                tempo.append(")");
                
            }
           // Fin
        
            this.tipoRetorno!=null ? tempo.append(":"+this.getTipoToString(this.tipoRetorno)) : console.log("") ;
            tempo.append(" {\n");
            for(const instr of this.instrucciones){
                try {
                    if (instr instanceof Funcion) { 
                    builder.append(instr.traducir(builder,parent));
                    } else {
                        tempo.append(instr.traducir(builder,nuevo_id));
                    }
                } catch (error) {
                    console.log(`Error en la funcion ${this.identificador}: ${error}`);
                }
            }
            tempo.append("}\n");
        }else{
            tempo.append(this.identificador);
            // Traduccion de los parametros
            let param = new StringBuilder();
            if (this.parametros.length == 0) {
                tempo.append("( )");
            } else {
                tempo.append("(");
                for (let index = 0; index < this.parametros.length; index++) {
                    let element = this.parametros[index];
                    param.append(element.traducir(builder,parent));
                    if (index<this.parametros.length-1) {
                        param.append(",");
                    }
                }
                tempo.append(param.toString());
                tempo.append(")");
                
            }
           // Fin
            this.tipoRetorno!=null ? tempo.append(":"+this.getTipoToString(this.tipoRetorno)) : console.log("") ;
            tempo.append(" {\n");
            for(const instr of this.instrucciones){
                try {
                    if (instr instanceof Funcion) { 
                        builder.append(instr.traducir(builder,parent));
                        } else {
                            tempo.append(instr.traducir(builder,parent));
                        }
                } catch (error) {
                    console.log(`Error en la funcion ${this.identificador}: ${error}`);
                }
            }
            tempo.append("}\n");
        }
        
        return tempo.toString();
    }

    generarNombre(id:string, id_padre:string):string{
        return id_padre+"_"+id;
    }
    
}