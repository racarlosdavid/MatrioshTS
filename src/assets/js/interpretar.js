

function correr(){
    console.log("-> Se va a interpretar la cadena ingresada ");
    try { 
        Manager.getManager().reiniciar(); 
        let tempo = textMap.get("text" + tabActual);    //Obtengo la pestaña actual
        var text = tempo.getValue();                    //Obtengo el texto de la pestaña actual
        let ast = InterpreteGrammar.parse(text);        //Analizo la entrada y obtengo el AST
      

        Manager.getManager().sizeActual.push(0);
        
        const env = new Entorno(null);
        const er = new ErrorManager(); 

        er.addLista(Manager.getManager().getColectorErrores());

        let salida = ast.ejecutar(env,er); //Obtengo el json de la salida para procesarlo e ingresar los datos a la consola y la ts

        er.generarReporte();

    }
    catch (err) {
        console.log(err);
      
    }

}

function traducir(){
    console.log("-> Se va a traducir la cadena ingresada ");
    try { 
        Manager.getManager().reiniciar(); 
        let tempo = textMap.get("text" + tabActual);    //Obtengo la pestaña actual
        var text = tempo.getValue();                    //Obtengo el texto de la pestaña actual
        let ast = InterpreteGrammar.parse(text);        //Analizo la entrada y obtengo el AST

        const builder = new StringBuilder();
      
        ast.traducir(builder); //Ejecuta la traduccion
        console.log(builder.toString()); //Imprimo la traduccion
    }
    catch (err) {
        console.log(err);
      
    }

}

