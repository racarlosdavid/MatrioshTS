class Entorno {
    constructor(anterior) {
        this.ts = new Map();
        this.anterior = anterior;
    }
    Add(id, value, tipo, dimensiones, tipodeclaracion) {
        id = id.toLowerCase();
        if (!this.ts.has(id)) {
            this.ts.set(id, new Simbolo(id, value, tipo, dimensiones, tipodeclaracion));
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
    getReporte(ambito, padre) {
        let tabla = [];
        if (this.ts.size != 0) {
            this.ts.forEach(function (valor, clave) {
                //console.log(clave + " = " + valor);
                let nombre = clave + "";
                let tipo = "null";
                let sim = valor;
                if (sim instanceof Funcion) {
                    let f = sim;
                    tipo = "Funcion";
                }
                else if (sim instanceof Simbolo) {
                    let simbol = sim;
                    let val = simbol.valor;
                    //if (val instanceof ArrayTS) {
                    //Arreglo ar = (Arreglo)val;
                    //tipo = "Arreglo: "+ar.getTipo();
                    //}else{
                    tipo = sim.getTipoToString();
                    //}
                }
                let descripcion = valor.valor.toString();
                //console.log(nombre, tipo, ambito, padre, descripcion)
                tabla.push(new NTS(nombre, tipo, ambito, padre, descripcion));
            });
        }
        else {
            console.log("No hay nada para reportar la tabla de simbolos esta vacia");
        }
        return tabla;
    }
}
