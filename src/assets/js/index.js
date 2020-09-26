let consola;


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
}

function nativas(ent){
    
    let fGraficar_ts = new Graficar_ts("graficar_ts","",[],null,[],-1,-1);
    ent.AddFunction("graficar_ts",fGraficar_ts);

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

}


$(document).ready(function(){

    $("#interpretar").click(()=>{ 
        console.log("-> Se va a interpretar la cadena ingresada ");
        limpiarConsola();
        Manager.getManager().reiniciar(); 
        Manager.getManager().sizeActual.push(0);
        let ast = null;
        try{
            let tempo = textMap.get("text" + tabActual);    //Obtengo la pestaña actual
            var text = tempo.getValue();                    //Obtengo el texto de la pestaña actual
            ast = InterpreteGrammar.parse(text);        //Analizo la entrada y obtengo el AST
        }catch(error){
            console.log("Error fatal en compilación de entrada, el archivo de entrada puede contener caracteres no validos.");
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
            const padre = "null";

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
                             </tr>`;
            }
            $("#contenido_tablaErrores").html(colector);
            
            let result_ts = reporte_ts.getListaR_TS();
            var colector_ts = '';
            for (let index = 0; index < result_ts.length; index++) {
                const element = result_ts[index];
                colector_ts += `<tr>
                                <th scope="col">${element.identificador}</th>
                                <th scope="col">${element.tipo}</th>
                                <th scope="col">${element.ambito}</th>
                                <th scope="col">${element.padre}</th>
                                <th scope="col">${element.descripcion}</th>
                                </tr>`;
            }
            $("#contenido_tablaSimbolos").html(colector_ts);
            
            //Imprimo los logs
            consola.setValue(consola_data.toString()); 
           
            //Graficar el ast
            const reporte_AST = new Dot(ast.getInstrucciones());
            let ast_dot = reporte_AST.graficarAST();
            d3.select("#graph").graphviz().renderDot(ast_dot);
        }
    });


    $("#traducir").click(()=>{ 
        console.log("-> Se va a traducir la cadena ingresada ");
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
                </tr>`;
            }
            $("#contenido_tablaErrores").html(colector);

            //Imprimo el resultado de la traduccion en el textarea de traduccion
            nuevaPestañaTraducido(builder.toString());

            //Graficar el ast
            const reporte_AST = new Dot(ast.getInstrucciones());
            let ast_dot = reporte_AST.graficarAST();
            d3.select("#graph").graphviz().renderDot(ast_dot);

            
            
        }
        catch (err) {
            console.log("Error en el boton traducir "+err);
        }
    });

});



/*
    $(document).ready(function(){
        $("#run").click(()=>{ 
            console.log("apachaste run");
            let tempo = textMap.get("text" + tabActual); 
            //var text = editor.getValue(); 
            var text = tempo.getValue(); //Obtengo el texto de la pestaña actual
            var model = {text:text};
            console.log(model);
            $.post(`${ip}c3d/run`,model,function(result){
                //console.log(result);
                console.error(result.reporte_tabla_simbolos);
                try {
                    editor.setValue(result.codigogenerado);
                } catch (error) {
                    console.log("Error al obtener la salida");
                }
                var colector = '';
                for (let index = 0; index < result.reporte_errores.length; index++) {
                    const element = result.reporte_errores[index];
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
                                </tr>`;
                }
                $("#contenido_tablaErrores").html(colector);

                var colector = '';
                for (let index = 0; index < result.reporte_tabla_simbolos.length; index++) {
                    const element = result.reporte_tabla_simbolos[index];
                    
                    colector += `<tr>
                                <th scope="col">${element.id}</th>
                                <th scope="col">${element.t}</th>
                                <th scope="col">${element.tamaño}</th>
                                <th scope="col">${element.ambito}</th>
                                <th scope="col">${element.rol}</th>
                                <th scope="col">${element.posicion}</th>
                                </tr>`;
                }
                $("#contenido_tablaSimbolos").html(colector);
            });
        });
        });
    */
