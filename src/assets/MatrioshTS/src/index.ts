/*
let matrixA : number [][] = [];
let matrixB : number [][] = [];
let matrixR : number [][] = [];
const min = 0;
const max = 4;

function llenado(matrix1 : number[][], matrix2 : number[][], matrix3 : number[][]) : void{
    for(let i = min; i < max; i++){
        matrix1[i] = [];
        matrix2[i] = [];
        matrix3[i] = [];
        for(let j = min; j < max; j++){
            matrix1[i][j] = j * 3 + i;
            matrix2[i][j] = i ** 3 - j ** 2;
            matrix3[i][j] = 0;
        }
    }
}

function print(matrix : number[][]) : void{
    for(let i = 0; i < matrix.length; i++){
        let salida = '';
        for(let j = 0; j < matrix[i].length; j++){
            salida = salida + "\t|\t" + matrix[i][j];
        }
        console.log(salida);
    }
}

function suma(matrix1 : number[][], matrix2 : number[][], matrixR : number[][]): void{
    for(let i = min; i < max; i++){
        for(let j = min; j < max; j++){
            matrixR[i][j] = matrix1[i][j] + matrix2[i][j];
        }
    }
}

function sumarFilas(matrix : number[][]) : void{
    let contador = 0;
    console.log("\t\t\t\t\t\t\t\t\t\tR");
    for(let i = 0; i < matrix.length; i++){
        contador = 0;
        let salida = '';
        for(let j = 0; j < matrix[i].length; j++){
            contador = contador + matrix[i][j];
			salida = salida + "\t|\t" + matrix[i][j];
        }
        console.log(salida, "\t|\t",contador);
    }
}

function sumarColumnas(matrix : number[][]) : void{
    let contador = 0;
    let salida = 'R';
    for(let i = 0; i < matrix.length; i++){
        contador = 0;
        for(let j = 0; j < matrix[i].length; j++){
            contador = contador + matrix[j][i];
        }
        salida = salida + "\t|\t" +  contador;
    }
    console.log(salida);
}


function resta(matrix1 : number[][], matrix2 : number[][], matrixR : number[][]): void{
    for(let i = min; i < max; i++){
        for(let j = min; j < max; j++){
            matrixR[i][j] = matrix1[i][j] - matrix2[i][j];
        }
    }
}


function multiplicar(matrix1 : number[][], matrix2 : number[][], matrixR : number[][]): void{
    for(let i = min; i < max; i++){
        for(let j = min; j < max; j++){
            for(let k = min; k < max; k++){
                matrixR[i][j] = matrixR[i][j] + matrix1[i][k] * matrix2[k][j];
            }
        }
    }
}

function transpuesta(matrix1: number[][]): void{
    const matrixAux : number[][] = [];
    for(let i = 0; i < max; i++){
        matrixAux[i] = [];
        for(let j = 0; j < max; j++){
            matrixAux[i][j] = matrix1[j][i];
        }
    }
    for(let i = 0; i < max; i++){
        for(let j = 0; j < max; j++){
            matrix1[i][j] = matrixAux[i][j];
        }
    }
}

function minValue(matrix1 : number[][]) : number{   

    let iAux = 0, jAux = 0, temp = matrix1[min][min];
    for(let i = 0; i < matrix1.length; i++){
        for(let j = 0; j < matrix1[i].length; j++){
            if(matrix1[i][j] < temp){
                temp = matrix1[i][j];
                iAux = i;
                jAux = j;
            }
        }
    }
    console.log("Min -> [",iAux,",",jAux,"] = ",temp);
    return temp;
}

function maxValue(matrix1 : number[][]) : number{   
    let iAux = 0, jAux = 0, temp = matrix1[min][min];
    for(let i = 0; i < matrix1.length; i++){
        for(let j = 0; j < matrix1[i].length; j++){
            if(matrix1[i][j] > temp){
                temp = matrix1[i][j];
                iAux = i;
                jAux = j;
            }
        }
    }
    console.log("Max -> [",iAux,",",jAux,"] = ",temp);
    return temp;
}

function ordenar(matrix1 : number[][]): void{
    let aux = 0;
    for(let i = 0; i < matrix1.length; i++){
        for(let j = 0; j < matrix1[i].length; j++){
            for(let k = 0; k <= i; k++){
                for(let l = 0; l <= j; l++){
                    if(matrix1[i][j] < matrix1[k][l]){
                        aux = matrix1[i][j];
                        matrix1[i][j] = matrix1[k][l];
                        matrix1[k][l] = aux;
                    }
                }
            }
        }
    }
}

function clearMat(matrix : number[][]): void{
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[i].length; j++){
            matrix[i][j] = 0;
        }
    }
}


llenado(matrixA,matrixB, matrixR);
console.log("Matrix A");
print(matrixA);
console.log("Matrix B");
print(matrixB);

console.log("MatR = MatA + MatB");
suma(matrixA,matrixB,matrixR);
print(matrixR);

console.log("MatR = MatA - MatB");
resta(matrixA,matrixB,matrixR);
print(matrixR);

console.log("Clear MatR");
clearMat(matrixR);
print(matrixR);

console.log("MatR = MatA * MatB");
multiplicar(matrixA,matrixB,matrixR);
print(matrixR);

console.log("Tranpose(MatA)");
transpuesta(matrixA);
print(matrixA);

minValue(matrixR);
maxValue(matrixR);

console.log("Sort MatR");
ordenar(matrixR);
print(matrixR);

minValue(matrixR);
maxValue(matrixR);

console.log("Suma Filas y Columnas");
sumarFilas(matrixA);
sumarColumnas(matrixA);

*/
//console.log("hola mundo");

import { Manager } from "./TypeScript/Interpreter/Reportes/Manager";
import { ErrorManager } from "./TypeScript/Interpreter/Reportes/ErrorManager";
import { Entorno } from "./TypeScript/Interpreter/TablaSimbolos/Entorno";
import { Continue } from "./TypeScript/Interpreter/Instruccion/SentenciasTransferencia/Continue";
import { StringBuilder } from "./TypeScript/Interpreter/Edd/StringBuilder";

const parser = require('./Gramatica/InterpreteGrammar');
const fs = require('fs');

try {
    Manager.getManager().reiniciar(); 
    const entrada = fs.readFileSync('./entrada.txt');
    let ast = parser.parse(entrada.toString()); 
    const env = new Entorno(null);
    const builder = new StringBuilder();

    Manager.getManager().sizeActual.push(0);
    var er = new ErrorManager(); 
    er.addLista(Manager.getManager().getColectorErrores());

    ast.traducir(builder); //Ejecuta la traduccion
    console.log(builder.toString()); //Imprimo la traduccion

    ast.ejecutar(env,er); //Ejecuta la interpretacion

    

    //console.log(ast);

    er.generarReporte();
    

    /*
    for(const instr of ast){
        try {
            if(instr instanceof Function)
                instr.execute(env,er);
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
    */
}
catch (error) {
    console.log(error);
}

//console.log(errores);
