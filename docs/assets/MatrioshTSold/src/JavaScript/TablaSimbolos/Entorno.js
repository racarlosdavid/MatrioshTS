import { Type } from "./Tipo";
import { Simbolo } from "./Simbolo";
export class Entorno {
    constructor(ts, anterior) {
        this.ts = new Map();
        this.anterior = anterior;
    }
    Add(id, value) {
        id = id.toLowerCase();
        if (!this.ts.has(id)) {
            this.ts.set(id, new Simbolo(id, value, Type.INDEF));
        }
        else {
            //("Ya existe el id: " + id);
        }
    }
    AddFunction(id, funcion) {
        id = "$" + id.toLowerCase();
        if (!this.ts.has(id)) {
            this.ts.set(id, funcion);
        }
        else {
            //("Ya existe la funcion: " + id);
        }
    }
    GetFuncion(id) {
        let temp = this;
        id = "$" + id.toLowerCase();
        while (temp != null) {
            if (temp.ts.has(id)) {
                return temp.ts.get(id);
            }
            temp = temp.anterior;
        }
        //("No existe la funcion: " + id);
        return null;
    }
    ChangeValue(id, value) {
        let temp = this;
        id = id.toLowerCase();
        while (temp != null) {
            if (temp.ts.has(id)) {
                let s = temp.ts.get(id);
                s.valor = value;
            }
            temp = temp.anterior;
        }
        //("No existe el id: " + id);
    }
    GetValue(id) {
        let temp = this;
        id = id.toLowerCase();
        while (temp != null) {
            if (temp.ts.has(id)) {
                return temp.ts.get(id);
            }
            temp = temp.anterior;
        }
        //("No existe el id: " + id);
        return null;
    }
    Existe(id) {
        let result = false;
        let temp = this;
        id = id.toLowerCase();
        while (temp != null) {
            if (temp.ts.has(id)) {
                result = true;
            }
            temp = temp.anterior;
        }
        //("No existe el id: " + id);
        return result;
    }
    GetGlobal() {
        let temp = this;
        while (temp.anterior != null)
            temp = temp.anterior;
        return temp;
    }
    getTs() {
        return this.ts;
    }
    setTs(ts) {
        this.ts = ts;
    }
    getAnterior() {
        return this.anterior;
    }
    setAnterior(anterior) {
        this.anterior = anterior;
    }
    getTipo(valor) {
        if (valor instanceof Number) {
            return "numeric";
        }
        else if (valor instanceof String) {
            return "String";
        }
        else if (valor instanceof Boolean) {
            return "boolean";
        }
        return "null";
    }
}
