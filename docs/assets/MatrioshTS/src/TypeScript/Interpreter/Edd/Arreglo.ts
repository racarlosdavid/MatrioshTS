import { Type } from "../TablaSimbolos/Tipo";
import { StringBuilder } from "./StringBuilder";

export class Arreglo {

    valores:Array<any>; 
    tipo:Type|string;

    constructor(valores:Array<any>, tipo:Type|string) {
        this.valores = valores; 
        this.tipo = tipo;
    }
    
    public Add(valor:any) {
        this.valores.push(valor);
    }
    
    getValor(indice:number){
        if (indice < this.getTamaño()) {
            return this.valores[indice];
        }
        return null;
    }
    
    setValor(indice:number, valor:any){
   
        if (indice <= this.getTamaño()) {
            this.valores[indice] = valor;
        }
        
    }
    
    getTamaño(){
        return this.valores.length;
    }
    
    imprimirArreglo() {
        if (this.valores.length == 0) {
            return "[]";
        }
        let sb = new StringBuilder();
        //sb.append(valores.getFirst().toString());
        for (let t = 0; t < this.valores.length; t++) {
            let val:any = this.valores[t];
            if (t==0) {
                if (val instanceof Arreglo) {
                    sb.append("["+val.imprimirArreglo());
                }else {
                    sb.append("["+val.toString());
                }
            }else{
               
                if (val instanceof Arreglo) {
                    sb.append(","+val.imprimirArreglo());
                }else {
                    sb.append(","+val.toString());
                }
            }
        }
        sb.append("]");
        return sb.toString();
    }

    getValores() {
        return this.valores;
    }

    setValores(valores:Array<any>) {
        this.valores = valores;
    }

    setTipo(tipo:Type|string){
        this.tipo = tipo;
    }
    
}