//var ip = 'http://localhost:4200/';

function setear() {
    nuevaPestaña();
    inicializarConsola();

    var editor = CodeMirror.fromTextArea(document.getElementById("code"),{
        lineNumbers : true,
        mode: "modo",
        theme : "base16-dark",
    });
    editor.setSize(null,720);
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
}
