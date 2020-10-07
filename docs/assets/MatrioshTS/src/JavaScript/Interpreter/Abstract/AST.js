class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
    }
    getInstrucciones() {
        return this.instrucciones;
    }
    traducir(builder, parent) {
        console.log("Ok. Vamos a traducir la cadena de entrada");
        //Primera pasada para obtener los nuevos ids los almaceno en la variable traductor de Manager.ts
        let builder_inservible = new StringBuilder();
        /*Para esta pasada le mando un stringbuilder solo para cumplir con el parametro y que no me genere doble salida
        ya que en la siguiente pasada le mando el builder que va a recolectar el codigo traducido */
        for (const instr of this.instrucciones) {
            try {
                if (instr instanceof Funcion) {
                    instr.traducir(builder_inservible, parent);
                }
            }
            catch (error) {
                console.log("Error en la traduccion: " + error);
            }
        }
        //Segunda pasada hago la traduccion
        for (const instr of this.instrucciones) {
            try {
                builder.append(instr.traducir(builder, parent));
            }
            catch (error) {
                console.log("Error en la traduccion: " + error);
            }
        }
        return builder.toString();
    }
    ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre) {
        console.log("Ok. Vamos a interpretar la cadena de entrada");
        //Primera pasada guarda los types en la tabla de simbolos
        for (const ins of this.instrucciones) {
            try {
                if (ins instanceof TypeTS) {
                    ins.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
                }
            }
            catch (error) {
                console.log("Error en la interpretacion: Primera Pasada" + error);
            }
        }
        //Segunda pasada guarda las funciones en la tabla de simbolos
        for (const ins of this.instrucciones) {
            try {
                if (ins instanceof Funcion) {
                    let f = ins;
                    for (let index = 0; index < f.instrucciones.length; index++) {
                        const element = f.instrucciones[index];
                        if (element instanceof Funcion) {
                            consola.append(" > Las funciones anidadas no estan permitidas en la interpretacion \n");
                            return null;
                        }
                    }
                    ins.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
                }
            }
            catch (error) {
                console.log("Error en la interpretacion: Segunda Segunda" + error);
            }
        }
        //Tercera pasada ejecuto todo lo demas
        for (const ins of this.instrucciones) {
            try {
                if (ins instanceof TypeTS || ins instanceof Funcion) {
                    continue;
                }
                if (ins instanceof Return) {
                    er.addError(new NodoError(TipoError.SEMANTICO, "Return fuera de funcion ", ins.fila, ins.columna, ambito));
                    continue;
                }
                else {
                    ins.ejecutar(ent, er, consola, tsCollector, reporte_ts, ambito, padre);
                }
            }
            catch (error) {
                console.log("Error en la interpretacion: Segunda Pasada " + error);
            }
        }
        return null;
    }
}
