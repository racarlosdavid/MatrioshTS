export class NodoError {
    
    private tipo:TipoError;
    private descripcion:string;
    private fila:number;
    private columna:number;
    private ambito:string;

    constructor(tipo:TipoError, descripcion:string, fila:number, columna:number, ambito:string) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
        this.ambito = ambito;
    }

    getTipo():TipoError {
        return this.tipo;
    }

    setTipo(tipo:TipoError):void {
        this.tipo = tipo;
    }

    getDescripcion():string {
        return this.descripcion;
    }

    setDescripcion(descripcion:string):void {
        this.descripcion = descripcion;
    }

    getFila():number {
        return this.fila;
    }

    setFila(fila:number ):void {
        this.fila = fila;
    }

    getColumna():number {
        return this.columna;
    }

    setColumna(columna:number):void {
        this.columna = this.columna;
    }

    getAmbito():string {
        return this.ambito;
    }

    setAmbito(ambito:string ):void {
        this.ambito = ambito;
    }

    getTipoErrorToString():string{
        switch (this.tipo ) {
            case TipoError.LEXICO:
                return "Lexico";
            case TipoError.SEMANTICO:
                return "Semantico";
            default:
                return "Sintactico";
        }
    }
    
}

export enum TipoError{
    LEXICO,
    SINTACTICO,
    SEMANTICO
}

