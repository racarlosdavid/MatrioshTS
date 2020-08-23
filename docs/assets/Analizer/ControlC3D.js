
var temp = 0;
var c3d = "";

class ControlC3D {
    
    reiniciar(){
        temp = 0;
        c3d = "";
    }
    
    /**
     * Genera el siguiente temporal.
     * @return El siguiente temporal (t$#)
     */
    generaTemp(){
        return "t"+temp++;
    }
    
    /**
     * Agrega la sentencia que recibe como parámetro a la cadena de código
     * de tres direcciones que se va generando hasta ese momento.
     * @param sentencia Código 3D a agregar
     */
    agregarC3D(sentencia){
        c3d += sentencia;
    }
    
    /**
     * Devuelve el código 3D generao hasta el momento de su invocación.
     * @return Código 3D generado
     */
    getC3D(){
        return c3d;
    }
}