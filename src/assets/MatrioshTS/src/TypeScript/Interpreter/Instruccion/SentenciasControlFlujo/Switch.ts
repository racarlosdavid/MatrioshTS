import { Instruccion } from "../../Abstract/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { StringBuilder } from "../../Edd/StringBuilder";
import { Expresion } from "../../Abstract/Expresion";
import { Case } from "./Case";
import { Default } from "./Default";
import { Break } from "../SentenciasTransferencia/Break";
import { Continue } from "../SentenciasTransferencia/Continue";
import { NodoError, TipoError } from "../../Reportes/NodoError";


export class Switch extends Instruccion{
 
    private condicion:Expresion;
    private _case:Array<Case>;
    private _default:Default|null;

 
    constructor (condicion:Expresion, _case:Array<Case>, _default:Default|null, fila:number, columna:number) {
        super(fila,columna);
        this.condicion = condicion;
        this._case = _case;
        this._default = _default
    }

    ejecutar(ent: Entorno, er: ErrorManager) {
        let retorno = null;
        let bandera:boolean = false; // me dice si hay coincidencia o no con los casos para ejecutar el default si existe
        let continuar:boolean = false;
        let eje_default:boolean = true;
        let condicionCaso;
        let condicionBuscada = this.condicion.ejecutar(ent,er);
    
        for(let inst of this._case){
            condicionCaso = inst.getCondicion().ejecutar(ent,er);

            if ((!bandera && condicionBuscada.valor==condicionCaso.valor) || continuar) {
                bandera = true;
                eje_default = false;
                let r = inst.ejecutar(ent,er);
                if(r!=null){
                    if(r instanceof Break){
                        continuar=false;
                        retorno = null;
                    } else{
                        return r;
                    }
                }else{
                    continuar=true;
                }
                
            } 
            //continuar = true; 
        }
        //Priguntar que se hace con el defaul si no hay breaks en el caso en el que entro -- si lo ejecuta o no lo ejecuta ;
        if(eje_default==true && ((!bandera && this._default!=null)||continuar)){ //Si no hay break en los casos ejecuta todo excepto el default ya que si entro a un case
            /*if((!bandera && this._default!=null)||continuar){ //Si no hay break en los casos ejecuta hasta el default sin importar que ya alla entrado a un case */
            let r = this._default?.ejecutar(ent,er);
            if(r!=null){
                if(r instanceof Break){
                    retorno = null;
                }else{
                    retorno =  r;
                }
            }
        }
        return retorno;
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        throw new Error("Method not implemented.");
    }

    traducir(builder: StringBuilder) {
        throw new Error("Method not implemented.");
    }
    

    
}