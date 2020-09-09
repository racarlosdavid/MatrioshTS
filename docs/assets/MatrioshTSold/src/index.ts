console.log("hola mundo");
/*
import { Entorno } from "./TypeScript/Interpreter/TablaSimbolos/Entorno";

const parser = require('./src/Gramatica/InterpreteGrammar');
const fs = require('fs');

try {
    const entrada = fs.readFileSync('./entrada.txt');
    const ast = parser.parse(entrada.toString());
    const env = new Entorno(null);

    for(const instr of ast){
        try {
            if(instr instanceof Function)
                instr.execute(env);
        } catch (error) {
            //errores.push(error);  
        }
    }

    for(const instr of ast){
        if(instr instanceof Function)
            continue;
        try {
            const actual = instr.execute(env);
            if(actual != null || actual != undefined){
                //errores.push(new Error_(actual.line, actual.column, 'Semantico', actual.type + ' fuera de un ciclo'));
            }
        } catch (error) {
            //errores.push(error);  
        }
    }
}
catch (error) {
    console.log(error);
}

//console.log(errores);

*/