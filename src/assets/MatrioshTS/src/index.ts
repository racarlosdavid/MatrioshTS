import { Manager } from "./TypeScript/Interpreter/Reportes/Manager";
import { ErrorManager } from "./TypeScript/Interpreter/Reportes/ErrorManager";
import { Entorno } from "./TypeScript/Interpreter/TablaSimbolos/Entorno";
import { StringBuilder } from "./TypeScript/Interpreter/Edd/StringBuilder";
import { Dot } from "./TypeScript/Interpreter/Reportes/Dot";
import { TSCollector } from "./TypeScript/Interpreter/TablaSimbolos/TSCollector";
import { R_TS } from "./TypeScript/Interpreter/Reportes/R_TS";
import { Graficar_ts } from "./TypeScript/Interpreter/FuncionesNativas/Graficar_ts";
import { Declaracion, TipoDeclaracion } from "./TypeScript/Interpreter/Instruccion/Declaracion";
import { Instruccion } from "./TypeScript/Interpreter/Abstract/Instruccion";
import { Pop } from "./TypeScript/Interpreter/FuncionesNativas/Pop";
import { Type } from "./TypeScript/Interpreter/TablaSimbolos/Tipo";
import { Push } from "./TypeScript/Interpreter/FuncionesNativas/Push";

const parser = require('./Gramatica/InterpreteGrammar');
const fs = require('fs');

try {
    traducir();  
    interpretar(); 
}
catch (error) {
    console.log(error);
}

function interpretar() {
    console.log("-> Se va a interpretar la cadena ingresada ");
      
            Manager.getManager().reiniciar(); 
            Manager.getManager().sizeActual.push(0);
            let ast;
            try{ 
                const entrada = fs.readFileSync('./entrada.txt'); 
                ast = parser.parse(entrada.toString()); 
            }catch(error){
                console.log("Error fatal en compilación de entrada, el archivo de entrada puede contener caracteres no validos."+error);
            }
            
            if (ast == null) { 
                try { 
                    const er = new ErrorManager(); 
                    //Agrego los errores lexicos al colector de errores 
                    er.addLista(Manager.getManager().getColectorErrores());
                    //Imprimo los errores
                    er.generarReporte();
                } catch (error) {
                    console.log("Lista de errores vacia");
                }
                
            } else {
                const ent = new Entorno(null);
                const er = new ErrorManager(); 
                const consola_data = new StringBuilder();
                const tsCollector = new TSCollector();
                const reporte_ts = new R_TS();
                const ambito = "global";
                const padre = "";

                //Agrego los errores lexicos al colector de errores 
                er.addLista(Manager.getManager().getColectorErrores());

                //Seteo las nativas en la ts
                nativas(ent);
                
                //Ejecuto el AST
                ast.ejecutar(ent,er,consola_data,tsCollector,reporte_ts,ambito,padre);  
            
                //Imprimo los errores
                er.generarReporte();

                //Imprimo los logs
                console.log(consola_data.toString()); 
            
                //Graficar el ast en modo texto porque el modo grafico hay que compilar el formato dot
                const reporte_AST = new Dot(ast.getInstrucciones());
                let ast_dot = reporte_AST.graficarAST();
                //console.log(ast_dot);

                let ento = reporte_ts.getEntornos();
                /*
                for (let index = 0; index < ento.length; index++) {
                    const element = ento[index];
                    console.log(element);
                }
                */
               console.log(" La cantidad de entornos que recolecte "+ento.length);
                
            }
}

function traducir(){
    console.log("-> Se va a traducir la cadena ingresada ");
        try { 
            Manager.getManager().reiniciar(); 
            Manager.getManager().sizeActual.push(0);
            const entrada = fs.readFileSync('./entrada.txt');
            let ast = parser.parse(entrada.toString()); 

            const er = new ErrorManager(); 
            const builder = new StringBuilder();
            const parent = "";
            
            //Agrego los errores lexicos al colector de errores 
            er.addLista(Manager.getManager().getColectorErrores());
        
            ast.traducir(builder,parent); //Ejecuta la traduccion

            //Imprimo los errores
            er.generarReporte();

            //Imprimo el resultado de la traduccion en el textarea de traduccion
            console.log(builder.toString()); 

            //Graficar el ast en modo texto porque el modo grafico hay que compilar el formato dot
            const reporte_AST = new Dot(ast.getInstrucciones());
            let ast_dot = reporte_AST.graficarAST();
            //console.log(ast_dot);

            
            
        }
        catch (err) {
            console.log("Error en el boton traducir "+err);
        }
}

function nativas(ent:Entorno){
    
    let fGraficar_ts = new Graficar_ts("graficar_ts","",[],null,0,[],-1,-1);
    ent.AddFunction("graficar_ts",fGraficar_ts);
/*
    let fpop_parametros:Array<Declaracion> = [];
    let fpop_instrucciones:Array<Instruccion> = [];
    fpop_parametros.push(new Declaracion(TipoDeclaracion.PARAM,"Nativa_Pop_Arg1",Type.STRING,0,null,-1,-1));
    let fpop = new Pop("pop","",fpop_parametros,null,fpop_instrucciones,-1,-1);
    ent.AddFunction("pop",fpop);

    let fpush_parametros:Array<Declaracion> = [];
    let fpush_instrucciones:Array<Instruccion> = [];
    fpush_parametros.push(new Declaracion(TipoDeclaracion.PARAM,"Nativa_Push_Arg1",null,0,null,-1,-1));
    fpush_parametros.push(new Declaracion(TipoDeclaracion.PARAM,"Nativa_Push_Arg2",Type.STRING,0,null,-1,-1));
    let fpush = new Push("push","",fpush_parametros,null,fpush_instrucciones,-1,-1);
    ent.AddFunction("push",fpush);
*/

}

