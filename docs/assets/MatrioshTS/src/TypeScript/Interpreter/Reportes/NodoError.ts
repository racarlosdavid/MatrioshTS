export class NodoError {
    
    private tipo:TipoError;
    private descripcion:string;
    private fila:number;
    private columna:number;

    constructor(tipo:TipoError, descripcion:string, fila:number, columna:number) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
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

