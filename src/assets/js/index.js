let consola;
let traducido;

function setear() {
    nuevaPestaña();
    
    consola = CodeMirror.fromTextArea(document.getElementById("consola"),{
        lineNumbers : true,
        mode: "modo",
        theme : "base16-dark",
    });
    consola.setSize(null,250);
    consola.setValue("\n\n\n\n\n\n\n\n\n\n");
    document.getElementById("buttonConsola").click();

    traducido = CodeMirror.fromTextArea(document.getElementById("code_traducido"),{
        lineNumbers : true,
        mode: "modo",
        theme : "base16-dark",
    });
    traducido.setSize(null,720);
}

$(document).ready(function(){

    $("#interpretar").click(()=>{ 
        console.log("-> Se va a interpretar la cadena ingresada ");
        try { 
            Manager.getManager().reiniciar(); 
            let tempo = textMap.get("text" + tabActual);    //Obtengo la pestaña actual
            var text = tempo.getValue();                    //Obtengo el texto de la pestaña actual
            let ast = InterpreteGrammar.parse(text);        //Analizo la entrada y obtengo el AST
          
    
            Manager.getManager().sizeActual.push(0);
            
            const env = new Entorno(null);
            const er = new ErrorManager(); 

            //Agrego los errores lexicos al colector de errores 
            er.addLista(Manager.getManager().getColectorErrores());

            //Ejecuto el AST
            ast.ejecutar(env,er); 
           
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
           
            //Graficar el ast
            const reporte_AST = new Dot(ast.getInstrucciones());
            let ast_dot = reporte_AST.graficarAST();
            d3.select("#graph").graphviz().renderDot(ast_dot);
    
        }
        catch (err) {
            console.log("Error en el boton de interpretar "+err);
        }
    });


    $("#traducir").click(()=>{ 
        console.log("-> Se va a traducir la cadena ingresada ");
        try { 
            Manager.getManager().reiniciar(); 
            let tempo = textMap.get("text" + tabActual);    //Obtengo la pestaña actual
            var text = tempo.getValue();                    //Obtengo el texto de la pestaña actual
            let ast = InterpreteGrammar.parse(text);        //Analizo la entrada y obtengo el AST

            const builder = new StringBuilder();
        
            ast.traducir(builder); //Ejecuta la traduccion
            traducido.setValue(builder.toString()); //Imprimo el resultado de la traduccion en el textarea de traduccion
            consola.setValue(builder.toString()); //Imprimo el resultado de la traduccion en el textarea de traduccion
        }
        catch (err) {
            console.log(err);
        
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
