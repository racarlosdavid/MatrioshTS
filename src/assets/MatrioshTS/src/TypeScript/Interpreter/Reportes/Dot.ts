import { Instruccion } from "../Abstract/Instruccion";
import { StringBuilder } from "../Edd/StringBuilder";

export class Dot {
    
    private instrucciones:Array<Instruccion>;
    
    constructor(instrucciones:Array<Instruccion> ){
        this.instrucciones = instrucciones;
    }
    
    graficarAST():void {
        if (this.instrucciones.length>0) {
            let codigodot = new StringBuilder();
            let cont:number = 1;
            let root:string = "nodo" + cont;
            codigodot.append("digraph MatrioshTS_AST {\n");
            codigodot.append("node [fontcolor=red shape=egg style=dotted];");
            codigodot.append(root+" [label=\"Raiz\"];\n");

            for(const instr of this.instrucciones){
                try {
                    cont = instr.getDot(codigodot,root,cont);
                } catch (error) {
                    console.log("Error en la interpretacion: "+error);
                }
            }

            codigodot.append("}");
            console.log("EL CODIGO DOT DEL AST: \n"+codigodot);
            //graficar();
            
        }else{
            console.log("No hay nada para graficar el AST aun no se ha creado");
        }   
    }
    
    graficar():void{/*
        String OS = System.getProperty("os.name").toLowerCase();
        String dotpath = "";
        String abrirpng = "";
        FileWriter archivo = null;
        PrintWriter pw;
        
        try{
            archivo = new FileWriter("AST.dot");
            pw = new PrintWriter(archivo);
            pw.println(codigodot);
        }catch (IOException e) {
            System.err.println("Error al crear el archivo .dot deL AST "+e);
        }finally{
           try {
                if (null != archivo)
                    archivo.close();
           }catch (IOException e){
               System.err.println("Error al cerrar el archivo AST.dot "+e);
           } 
        }  
        
        if (isWindows(OS)) {  //Setea la ruta del dot dependiendo la compu en la que estoy trabajando
                System.out.println("This is Windows");
                dotpath = "C:\\graphviz-2.38\\release\\bin\\dot.exe";
                abrirpng = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe AST.png";
            } else if (isMac(OS)) {
		System.out.println("This is Mac");
                dotpath = "/usr/local/Cellar/graphviz/2.42.3/bin/dot";
                abrirpng = "open AST.png";
                //abrirpng = "open -a /Applications/Google Chrome.app AST.png";
            } else {
		System.out.println("SISTEMA OPERATIVO NO CONFIGURADO");
        }
        
        try {
            String comando = dotpath+" -Tpng AST.dot -o AST.png";
            
            Process p_crearImagenAST = Runtime.getRuntime().exec(comando);
            p_crearImagenAST.waitFor();
            
            Process p_mostraImagenAST = Runtime.getRuntime().exec(abrirpng);
            p_mostraImagenAST.waitFor();
            
        } catch (IOException | InterruptedException e) {
            System.err.println("Error al ejecutar el comando para traducir el .dot a .png "+e);
        }
        */
    }

    public getInstrucciones():Array<Instruccion> {
        return this.instrucciones;
    }

    public setInstrucciones(instrucciones:Array<Instruccion>):void {
        this.instrucciones = instrucciones;
    }
    
}