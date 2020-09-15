 class TSCollector {
    constructor() {
        this.ts = new Map();
    }
    addTS(id, tabla) {
        id = id.toLowerCase();
        if (!this.ts.has(id)) {
            this.ts.set(id, tabla);
        }
        else {
            //("Ya existe el id: " + id);
        }
    }
    GetValue(id) {
        id = id.toLowerCase();
        if (this.ts.has(id)) {
            let s = this.ts.get(id);
            return s;
        }
        //("No existe el id: " + id);
        return null;
    }
    Existe(id) {
        let result = false;
        if (this.ts.has(id)) {
            result = true;
        }
        return result;
    }
}
