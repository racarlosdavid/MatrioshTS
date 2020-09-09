import { Expresion } from "../Abstract/Expresion";
export class ArrayTS extends Expresion {
    constructor(valores, fila, columna) {
        super(fila, columna);
        this.valores = valores;
        this.arreglo = [];
    }
    ejecutar(ent, er) {
        return this;
    }
    /*
        imprimirArray():string {
            if (this.valores.length == 0) {
                return "[]";
            }
            let sb = new StringBuilder();
            sb.append("[");
            let s:string = this.valores[0];
            sb.append(s); consoloe.log(this.valores[1]);
            for (int t = 1; t < valores.size(); t++) {
                sb.append(",").append(valores.get(t).toString());
            }
            sb.append("]");
            return sb.toString();
           
        }
     */
    getDot(builder, parent, cont) {
        throw new Error("Method not implemented.");
    }
    traducir(builder) {
        throw new Error("Method not implemented.");
    }
}
