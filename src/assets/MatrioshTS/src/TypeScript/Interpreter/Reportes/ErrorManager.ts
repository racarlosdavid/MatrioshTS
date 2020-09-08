import { NodoError } from "./NodoError";

export class ErrorManager {
    
    private listaErrores:Array<NodoError>;
    
    constructor() {
        this.listaErrores = new Array<NodoError>();
    }
    
    addLista(list:Array<NodoError> ):void{
        this.listaErrores = this.listaErrores.concat(list);
    }
    
    addError(error:NodoError):void{
        this.listaErrores.push(error);
    }
    
    generarReporte(){
       if (this.listaErrores.length!=0) {
        
            for (let i = 0; i < this.listaErrores.length; i++) {
                let tempo:NodoError = this.listaErrores[i];
                let t = tempo.getTipoErrorToString();
                let d = tempo.getDescripcion().toString();
                let f = tempo.getFila().toString();
                let c= tempo.getColumna().toString();
                console.log(t+" "+d+" "+f+" "+c);
            }
        }else{
            console.log("No hay nada para reportar la lista de errores esta vacia");
        }
        
        
    }

    getErrores(){
        return this.listaErrores;
    }
    
    getSize(){
        return this.listaErrores.length;
    }
    
    
}
