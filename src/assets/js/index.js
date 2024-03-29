let consola;
let punto_dot;


function setear() {
    nuevaPestaña();
    
    consola = CodeMirror.fromTextArea(document.getElementById("consola"),{
        lineNumbers : true,
        mode: "modo",
        theme : "base16-dark",
    });
    consola.setSize(null,250);
    document.getElementById("buttonConsola").click();
    consola.setValue("\n\n\n\n\n\n\n\n\n\n");
}

function limpiarConsola(){
    consola.setValue("\n\n\n\n\n\n\n\n\n\n");
    document.getElementById("buttonConsola").click();
    setTimeout(function(){  }, 100);
}

function saveDynamicDataToFile(data) {
    var blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "Matriosh_AST_201213132.txt");
}

function hayRecursividad() {
    // Get the checkbox
    var checkBox = document.getElementById("myCheck");
    // Get the output text
    var text = document.getElementById("text");
  
    // If the checkbox is checked, display the output text
    
    if (checkBox.checked == true){
        Manager.getManager().setBanderaRecursividad(false);
    } else {
        Manager.getManager().setBanderaRecursividad(true);
    }
  }

function nativas(ent){
    
    let fGraficar_ts = new Graficar_ts("graficar_ts","",[],null,[],-1,-1);
    ent.AddFunction("graficar_ts",fGraficar_ts);
/*
    let fpop_parametros = [];
    let fpop_instrucciones = [];
    fpop_parametros.push(new Declaracion(TipoDeclaracion.PARAM,"Nativa_Pop_Arg1",Type.STRING,0,null,-1,-1));
    let fpop = new Pop("pop","",fpop_parametros,null,fpop_instrucciones,-1,-1);
    ent.AddFunction("pop",fpop);

    let fpush_parametros = [];
    let fpush_instrucciones = [];
    fpush_parametros.push(new Declaracion(TipoDeclaracion.PARAM,"Nativa_Push_Arg1",null,0,null,-1,-1));
    fpush_parametros.push(new Declaracion(TipoDeclaracion.PARAM,"Nativa_Push_Arg2",Type.STRING,0,null,-1,-1));
    let fpush = new Push("push","",fpush_parametros,null,fpush_instrucciones,-1,-1);
    ent.AddFunction("push",fpush);
*/
}

function cuantosEntornosHay(){
        Manager.getManager().reiniciar(); 
        Manager.getManager().sizeActual.push(0);
       
        let ast = null;
        try{
            let tempo = textMap.get("text" + tabActual);    //Obtengo la pestaña actual
            var text = tempo.getValue();                    //Obtengo el texto de la pestaña actual
            ast = InterpreteGrammar.parse(text);        //Analizo la entrada y obtengo el AST
        }catch(error){
            consola.setValue(" > Error fatal!, el archivo de entrada puede contener caracteres no validos. "+error); 
        }
    
        if (ast == null) { 
            try { 
                const er = new ErrorManager(); 
                //Agrego los errores lexicos al colector de errores 
                er.addLista(Manager.getManager().getColectorErrores());
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


            let ento = reporte_ts.getEntornos();
            console.log(" Se crearon "+ento.length+" entornos. ");
            return ento.length;
        }
    return 0;

}

$(document).ready(function(){

    $("#interpretar").click(()=>{ 
        console.log("-> Se va a interpretar la cadena ingresada ");
        alert("Se va a interpretar la cadena ingresada, espera el mensaje de finalizacion para seguir navegando ");
        limpiarConsola();
        Manager.getManager().reiniciar(); 
        Manager.getManager().sizeActual.push(0);
        if (cuantosEntornosHay()<100000){
            Manager.getManager().setBanderaRecursividad(false);
        } else {
            Manager.getManager().setBanderaRecursividad(true);
        }
        let ast = null;
        try{
            let tempo = textMap.get("text" + tabActual);    //Obtengo la pestaña actual
            var text = tempo.getValue();                    //Obtengo el texto de la pestaña actual
            ast = InterpreteGrammar.parse(text);        //Analizo la entrada y obtengo el AST
        }catch(error){
            consola.setValue(" > Error fatal!, el archivo de entrada puede contener caracteres no validos. "+error); 
        }
    
        if (ast == null) { 
            try { 
                const er = new ErrorManager(); 
                //Agrego los errores lexicos al colector de errores 
                er.addLista(Manager.getManager().getColectorErrores());
                //Inserto los errores en la seccion de errores en la pagina
                let result = er.getErrores();
                var colector = '';
                for (let index = 0; index < result.length; index++) { 
                    const element = result[index];
                    let t = "";
                    if (element.tipo == 0) {
                        t = "Lexico";
                    } else if (element.tipo == 1){
                        t = "Sintactico";
                    } else if (element.tipo == 2){
                        t = "Semantico";
                    }
                    colector += `<tr>
                                <th scope="col">${t}</th>
                                <th scope="col">${element.descripcion}</th>
                                <th scope="col">${element.fila}</th>
                                <th scope="col">${element.columna}</th>
                                <th scope="col">${element.ambito}</th>
                                </tr>`;
                }
                $("#contenido_tablaErrores").html(colector);
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

            
           
            //Inserto los errores en la seccion de errores en la pagina
            let result = er.getErrores();
            var colector = '';
            for (let index = 0; index < result.length; index++) { 
                const element = result[index];
                let t = "";
                if (element.tipo == 0) {
                    t = "Lexico";
                } else if (element.tipo == 1){
                    t = "Sintactico";
                } else if (element.tipo == 2){
                    t = "Semantico";
                }
                colector += `<tr>
                             <th scope="col">${t}</th>
                             <th scope="col">${element.descripcion}</th>
                             <th scope="col">${element.fila}</th>
                             <th scope="col">${element.columna}</th>
                             <th scope="col">${element.ambito}</th>
                             </tr>`;
            }
            $("#contenido_tablaErrores").html(colector);

            //Creo una nueva lista de reporte de tabla de simbolos para que los simbolos globales quede de primero
            const reporte_ts_final = new R_TS();
            reporte_ts_final.addLista(ent.getReporte("Global", ""));
            //le agrego la coleccion de las otras tablas
            let ento = reporte_ts.getEntornos();
            console.log(" Se crearon "+ento.length+" entornos. ");
            reporte_ts_final.addLista(reporte_ts.getListaR_TS());
            
            
            //Ahora ya grafico la tabla en la pagina
            let result_ts = reporte_ts_final.getListaR_TS();
            var colector_ts = '';
            for (let index = 0; index < result_ts.length; index++) {
                const element = result_ts[index];
                colector_ts += `<tr>
                                <th scope="col">${element.identificador}</th>
                                <th scope="col">${element.tipo}</th>
                                <th scope="col">${element.valor}</th>
                                <th scope="col">${element.ambito}</th>
                                <th scope="col">${element.padre}</th>
                                </tr>`;
            }
            $("#contenido_tablaSimbolos").html(colector_ts);
            
            
            try {
                //Graficar el ast
                const reporte_AST = new Dot(ast.getInstrucciones());
                let ast_dot = reporte_AST.graficarAST();
                d3.select("#graph").graphviz().renderDot(ast_dot);
                punto_dot = ast_dot;
            } catch (error) {
                consola_data.append(" > Error al generar el grafo del AST "+error);
            }

            //Imprimo los logs
            consola.setValue(consola_data.toString()); 
            document.getElementById("buttonConsola").click();

            //window.alert("Se termino de interpretar la cadena de entrada");
            setTimeout(function(){ alert("Se termino de interpretar la cadena de entrada"); }, 1000);
            console.log("-> Se termino de interpretar la cadena de entrada");
            
        }
    });


    $("#traducir").click(()=>{ 
        console.log("-> Se va a traducir la cadena ingresada ");
        alert("Se va a traducir la cadena ingresada, espera el mensaje de finalizacion para seguir navegando ");
        limpiarConsola();
        try { 
            Manager.getManager().reiniciar(); 
            Manager.getManager().sizeActual.push(0);
            let tempo = textMap.get("text" + tabActual);    //Obtengo la pestaña actual
            var text = tempo.getValue();                    //Obtengo el texto de la pestaña actual
            let ast = InterpreteGrammar.parse(text);        //Analizo la entrada y obtengo el AST

            const er = new ErrorManager(); 
            const builder = new StringBuilder();
            const parent = "";
        
            //Agrego los errores lexicos al colector de errores 
            er.addLista(Manager.getManager().getColectorErrores());

            //Ejecuta la traduccion
            ast.traducir(builder,parent); 

            

            //Inserto los errores en la seccion de errores en la pagina
            let result = er.getErrores();
            var colector = '';
            for (let index = 0; index < result.length; index++) { 
                const element = result[index];
                let t = "";
                if (element.tipo == 0) {
                    t = "Lexico";
                } else if (element.tipo == 1){
                    t = "Sintactico";
                } else if (element.tipo == 2){
                    t = "Semantico";
                }
                colector += `<tr>
                <th scope="col">${t}</th>
                <th scope="col">${element.descripcion}</th>
                <th scope="col">${element.fila}</th>
                <th scope="col">${element.columna}</th>
                <th scope="col">${element.ambito}</th>
                </tr>`;
            }
            $("#contenido_tablaErrores").html(colector);

            //Imprimo el resultado de la traduccion en el textarea de traduccion
            nuevaPestañaTraducido(builder.toString());

            try {
                //Graficar el ast
                const reporte_AST = new Dot(ast.getInstrucciones());
                let ast_dot = reporte_AST.graficarAST();
                d3.select("#graph").graphviz().renderDot(ast_dot);
                punto_dot = ast_dot;
            } catch (error) {
                consola.setValue(" > Error al generar el grafo del AST "+error);
            }

            //window.alert("Se termino la traduccion de la cadena de entrada");
            setTimeout(function(){ alert("Se termino la traduccion de la cadena de entrada"); }, 1000);
            console.log("-> Se termino la traduccion de la cadena de entrada");
            
        }
        catch (err) {
            consola.setValue("Error al traducir "+err);
        }
    });

    $("#guardar_dot").click(()=>{ 
        console.log("-> Se va a crear el txt con el codigo dot ");
        try { 
            saveDynamicDataToFile(punto_dot);
        } catch (err) {
            console.log("Error en el boton guardar dot "+err);
        }
    });

});

