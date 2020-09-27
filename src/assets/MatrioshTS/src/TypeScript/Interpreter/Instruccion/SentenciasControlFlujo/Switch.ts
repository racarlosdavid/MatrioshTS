import { Instruccion } from "../../Abstract/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { ErrorManager } from "../../Reportes/ErrorManager";
import { StringBuilder } from "../../Edd/StringBuilder";
import { Expresion } from "../../Abstract/Expresion";
import { Case } from "./Case";
import { Default } from "./Default";
import { Break } from "../SentenciasTransferencia/Break";
import { TSCollector } from "../../TablaSimbolos/TSCollector";
import { R_TS } from "../../Reportes/R_TS";
import { Return } from "../SentenciasTransferencia/Return";


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

    ejecutar(ent:Entorno, er:ErrorManager, consola:StringBuilder, tsCollector:TSCollector, reporte_ts:R_TS, ambito:string, padre:string) {
        let condicionBuscada = this.condicion.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
        var numeroCaso = -1;
        
        for (let index = 0; index < this._case.length; index++) {
            const casoActual = this._case[index];
            let condicionCaso = casoActual.getCondicion().ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
            //console.log("condicion buscada "+condicionBuscada.valor+" condicion caso "+condicionCaso.valor)
            if(condicionBuscada.valor == condicionCaso.valor){
                //Si una caso cumple, ya no sigo evaluando los demas y me salgo del for
                numeroCaso = index; 
                break;
            }
        }

        if(numeroCaso != -1){
            for(let i = numeroCaso; i < this._case.length; i++){ 
                let casoActual = this._case[i];		
                let r = casoActual.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
                if(r!=null){ 
                    if(r instanceof Break){
                        break;
                    } else{
                        return r;
                    }
                }
            }
        }else if (numeroCaso == -1) {
            if (this._default!=null) {
                let r = this._default.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
                if(r!=null){
                    return r;
                }
            }
        }

        
        
        /*
        let retorno = null;
        let bandera:boolean = false; // me dice si hay coincidencia o no con los casos para ejecutar el default si existe
        let continuar:boolean = false;
        let eje_default:boolean = true;
        let condicionCaso;
        let condicionBuscada = this.condicion.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
    
        for(let inst of this._case){
            condicionCaso = inst.getCondicion().ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);

            if ((!bandera && condicionBuscada.valor==condicionCaso.valor) || continuar) {
                bandera = true;
                eje_default = false;
                let r = inst.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
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
        /*if(eje_default==true && ((!bandera && this._default!=null)||continuar)){ //Si no hay break en los casos ejecuta todo excepto el default ya que si entro a un case*/
        /*
            if((!bandera && this._default!=null)||continuar){ //Si no hay break en los casos ejecuta hasta el default sin importar que ya alla entrado a un case 
            let r = this._default?.ejecutar(ent,er,consola,tsCollector,reporte_ts,ambito,padre);
            if(r!=null){
                if(r instanceof Break){
                    retorno = null;
                }else{
                    retorno =  r;
                }
            }
        }
        return retorno;
        */
    }

    getDot(builder: StringBuilder, parent: string, cont: number): number {
        let nodo:string = "nodo" + ++cont;
        builder.append(nodo+" [label=\"Switch\"];\n");
        builder.append(parent+" -> "+nodo+";\n");
        
        let nodoCondicion:string = "nodo" + ++cont;
        builder.append(nodoCondicion+" [label=\"Condicion\"];\n");
        builder.append(nodo+" -> "+nodoCondicion+";\n");
        
        cont = this.condicion.getDot(builder, nodoCondicion, cont);
        
        let nodoInstrucciones = "nodo" + ++cont;
        builder.append(nodoInstrucciones+" [label=\"Case\"];\n");
        builder.append(nodo+" -> "+nodoInstrucciones+";\n");

        for (let instr of this._case) {
            cont = instr.getDot(builder, nodoInstrucciones, cont);
        }
        
        if (this._default!=null) {
            cont = this._default.getDot(builder, nodo, cont);
        }
        
        return cont;
    }

    traducir(builder: StringBuilder, parent: string) { 

        let trad = new StringBuilder();

        trad.append("switch ("+this.condicion.traducir(builder)+") {\n");

        for (let instr of this._case) {
            trad.append(instr.traducir(builder,parent));
        }
        
        if (this._default!=null) {
            trad.append(this._default.traducir(builder,parent));
        }

        trad.append("}\n"); 

        return trad.toString();

    }
    

    
}