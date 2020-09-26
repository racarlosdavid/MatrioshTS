import { StringBuilder } from "./StringBuilder";

export class MiType {
    datos:Map<String, any>;
    tipos:Map<String, any>;

    constructor(datos:Map<String, any>,tipos:Map<String, any>){
        this.datos = datos;
        this.tipos = tipos;
    }
    
    getValor(id:string){
        if (this.datos.has(id)){
            return this.datos.get(id);
        }
        return null;
    }
    
    setValor(id:string, valor:any){
        if (this.datos.has(id)){
            this.datos.set(id, valor);
        }
    }

    getTipo(id:string){
        if (this.tipos.has(id)){
            return this.tipos.get(id);
        }
        return null;
    }
    
    imprimirType() {
        if (this.datos.size == 0) {
            return "{}";
        }
        let sb = new StringBuilder();
        //sb.append(valores.getFirst().toString());
        let tam = 0;
        this.datos.forEach(function(valor, clave) {
            if (tam == 0) {
                if (valor instanceof MiType) {
                    sb.append("{"+clave.toString()+":"+valor.imprimirType());
                }else {
                    sb.append("{"+clave.toString()+":"+valor.toString());
                }
            }else{
               
                if (valor instanceof MiType) {
                    sb.append(","+clave.toString()+":"+valor.imprimirType());
                }else {
                    sb.append(","+clave.toString()+":"+valor.toString());
                }
            }
            tam++;
        });
        sb.append("}");
        return sb.toString();
    }

    getValores() {
        return this.datos;
    }

    setValores(datos:Map<String, any>) {
        this.datos = datos;
    }


}