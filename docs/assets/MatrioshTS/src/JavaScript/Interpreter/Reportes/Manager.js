class Manager {
    constructor() {
        this.error_colector = [];
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
}
Manager._instance = new Manager();
