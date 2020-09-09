import { Instruccion } from "../Abstract/Instruccion";
export class Funcion extends Instruccion {
    constructor(identificador, padre, parametros, instrucciones, fila, columna) {
        super(fila, columna);
        this.identificador = identificador;
        this.padre = padre;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }
    ejecutar(ent, er) {
        //console.log("SOY UNA FUNCION "+this.identificador+" "+this.padre);
        /*
        let t = new StringBuilder();
        if (this.padre!=null) {
            let nuevo_id  = this.generarNombre(this.identificador,this.padre);
            console.log( nuevo_id +"( ) {\n"+this.instrucciones.traducir(t)+"\n}\n" );
        }
        */
        var str = "Suma_Resta";
        var splitted = str.split("_");
        console.log("Yo soy " + splitted[1] + " y mi padre es " + splitted[0]);
        console.log(" El id de la funcion " + this.identificador);
        this.instrucciones.ejecutar(ent, er);
        return null;
    }
    getDot(builder, parent, cont) {
        throw new Error("Method not implemented.");
    }
    traducir(builder) {
        let tempo;
        if (this.padre != null) {
            let nuevo_id = this.generarNombre(this.identificador, this.padre);
            tempo = nuevo_id + "( ) {\n" + this.instrucciones.traducir(builder) + "\n}\n";
        }
        else {
            tempo = this.identificador + "( ) {\n" + this.instrucciones.traducir(builder) + "\n}\n";
        }
        return tempo;
    }
    generarNombre(id, id_padre) {
        return id_padre + "_" + id;
    }
}
