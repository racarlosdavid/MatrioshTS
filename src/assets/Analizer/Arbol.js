
//var parser = require('./coline').parser;
//var Clase = require('./Clase');
//var Operacion = require('./Operacion');
//var Funcion = require('./Funcion.js');
//var If = require('./If');
//var fs = require('fs');
//var source = fs.readFileSync('./entrada.txt', 'utf8');
var ast;


function correr(){
    try {
        //var identi = new Funcion("var1_delta");
        //console.log(identi.Obtenerid());
        //console.log(1>3 ? "Hola" : "Fuck You");
        var cadena = document.getElementById('textarea_codigoaltonivel').value;
        ast = Coline.parse(cadena);
        codigo = new ControlC3D();
        //console.log(ast.length);
        //console.log(ast);
        var alfa = new If(null,null,null,null,true,false);
    
        for (var index = 0; index < ast.length; index++) {
            var element = ast[index];
            element.ejecutar();
            //console.log(element.constructor.name);
            if (element.constructor.name == 'Clase') {
                console.log('es clase');
                element.getF();
                
            }
            
        }

        console.log(codigo.getC3D());
        
    }
    catch (exception) {
        console.log("Parse Error: " + exception.message);
    }

}

