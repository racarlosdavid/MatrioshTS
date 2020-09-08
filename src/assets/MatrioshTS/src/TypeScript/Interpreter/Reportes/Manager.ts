import { NodoError } from "./NodoError";

export class Manager {
    private static _instance: Manager = new Manager();
    private error_colector: NodoError[] = [];
    sizeActual: Array<number> = [];

    constructor() {
        if (Manager._instance) {
            throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
        }
        Manager._instance = this;
    }

    public static getManager(): Manager {
        return Manager._instance;
    }

    reiniciar(){
        this.error_colector = [];
    }

    getColectorErrores(){
        return this.error_colector;
    }

    addError(error:NodoError){
        this.error_colector.push(error);
    }

    addColectorErrores(error:NodoError[]){
        this.error_colector = this.error_colector.concat(error);
    }

}