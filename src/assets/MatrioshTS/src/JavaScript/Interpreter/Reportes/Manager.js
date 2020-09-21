class Manager {
    constructor() {
        this.error_colector = [];
        this.traductor = new Map();
        this.lista_reporte_ts = [];
        this.sizeActual = [];
        if (Manager._instance) {
            throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
        }
        Manager._instance = this;
    }
    static getManager() {
        return Manager._instance;
    }
    reiniciar() {
        this.error_colector = [];
        this.traductor = new Map();
        this.lista_reporte_ts = [];
    }
    getColectorErrores() {
        return this.error_colector;
    }
    addError(error) {
        this.error_colector.push(error);
    }
    addColectorErrores(error) {
        this.error_colector = this.error_colector.concat(error);
    }
    addF(id, nuevo_id) {
        this.traductor.set(id, nuevo_id);
    }
    getFid(id) {
        if (this.traductor.has(id)) {
            return this.traductor.get(id);
        }
        return null;
    }
    addListaR_TS(list) {
        this.lista_reporte_ts = this.lista_reporte_ts.concat(list);
    }
    getListaR_TS() {
        return this.lista_reporte_ts;
    }
    addNTS(simbolo) {
        this.lista_reporte_ts.push(simbolo);
    }
}
Manager._instance = new Manager();
