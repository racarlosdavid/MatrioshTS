import { Instruccion } from "../../Abstract/Instruccion";
import { Break } from "../SentenciasTransferencia/Break";
import { Continue } from "../SentenciasTransferencia/Continue";
import { Type } from "../../TablaSimbolos/Tipo";
import { TipoError, NodoError } from "../../Reportes/NodoError";
export class DoWhile extends Instruccion {
    constructor(instrucciones, condicion, fila, columna) {
        super(fila, columna);
        this.instrucciones = instrucciones;
        this.condicion = condicion;
    }
    ejecutar(ent, er) {
        let rcondicion;
        do {
            let r = this.instrucciones.ejecutar(ent, er);
            if (r != null || r != undefined) {
                if (r instanceof Break) {
                    break;
                }
                else if (r instanceof Continue) {
                    continue;
                }
            }
            rcondicion = this.condicion.ejecutar(ent, er);
            if (rcondicion.tipo != Type.BOOLEAN) {
                er.addError(new NodoError(TipoError.SEMANTICO, "La condicion no es booleana", this.fila, this.columna));
                return null;
            }
        } while (rcondicion.valor);
        return null;
    }
    getDot(builder, parent, cont) {
        throw new Error("Method not implemented.");
    }
    traducir(builder) {
        throw new Error("Method not implemented.");
    }
}
