export class StringBuilder{
    private cadena: Array<string>;

    constructor(){
        this.cadena = new Array();
    }

    append(valor:string){
        if (valor) {
            this.cadena.push(valor);
        }
    }

    clear() {
        this.cadena.length = 0;
    }

    toString ():string {
        return this.cadena.join("");
    }

    get():Array<string>{ 
        return this.cadena;
    }
}
