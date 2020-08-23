
var Operacion = /** @class */ (function () {
    function Operacion(operadorIzq, operadorDer, operacion, a, tipo) {
        this.operacion = operacion;
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
        this.valor = a;
        this.tipo = tipo;
    }
    Operacion.prototype.ejecutar = function () {
        var val1 = (this.operadorIzq == null) ? null : this.operadorIzq.ejecutar();
        var val2 = (this.operadorDer == null) ? null : this.operadorDer.ejecutar();
        switch (this.operacion) {
            case '+':
                var temp = codigo.generaTemp();
                var c3d = temp + " = " + val1+ " + " + val2 + ";\n";
                codigo.agregarC3D(c3d);
                //console.log(c3d);
                return temp;
                //return val1 + val2;
            case '-':
                temp = codigo.generaTemp();
                c3d = temp + " = " + val1+ " - " + val2 + ";\n";
                codigo.agregarC3D(c3d);
                //console.log(c3d);
                return temp;
                //return val1 - val2;
            case '*':
                var temp = codigo.generaTemp();
                var c3d = temp + " = " + val1+ " * " + val2 + ";\n";
                codigo.agregarC3D(c3d);
                //console.log(c3d);
                return temp;
                //return val1 * val2;
            case '/':
                var temp = codigo.generaTemp();
                var c3d = temp + " = " + val1+ " / " + val2 + ";\n";
                codigo.agregarC3D(c3d);
                //console.log(c3d);
                return temp;
                //return val1 / val2;
            case 'pow':
                return Math.pow(val1, val2);
            case 'uminus':
                return val2 * -1;
            case 'numero':
                return Number(this.valor);
            case 'cadena':
                return this.valor.toString;
            case 'caracter':
                return this.valor.charCodeAt(0);
            case 'id':
                return this.valor.toString;
            case '>':
                var temp = codigo.generaTemp();
                var c3d = temp + " = " + val1+ " > " + val2 + ";\n";
                codigo.agregarC3D(c3d);
                //console.log(c3d);
                return temp;
            case '<':
                var temp = codigo.generaTemp();
                var c3d = temp + " = " + val1+ " < " + val2 + ";\n";
                codigo.agregarC3D(c3d);
                //console.log(c3d);
                return temp;
            case '>=':
                var temp = codigo.generaTemp();
                var c3d = temp + " = " + val1+ " >= " + val2 + ";\n";
                codigo.agregarC3D(c3d);
                //console.log(c3d);
                return temp;
            case '<=':
                var temp = codigo.generaTemp();
                var c3d = temp + " = " + val1+ " <= " + val2 + ";\n";
                codigo.agregarC3D(c3d);
                //console.log(c3d);
                return temp;
            case '!=':
                var temp = codigo.generaTemp();
                var c3d = temp + " = " + val1+ " != " + val2 + ";\n";
                codigo.agregarC3D(c3d);
                //console.log(c3d);
                return temp;
            case '==':
                var temp = codigo.generaTemp();
                var c3d = temp + " = " + val1+ " == " + val2 + ";\n";
                codigo.agregarC3D(c3d);
                //console.log(c3d);
                return temp;

            case '!':
                return !val2;
            case '&&':
                var temp = codigo.generaTemp();
                var c3d = temp + " = " + val1+ " && " + val2 + ";\n";
                codigo.agregarC3D(c3d);
                //console.log(c3d);
                return temp;
            case '||':
                var temp = codigo.generaTemp();
                var c3d = temp + " = " + val1+ " || " + val2 + ";\n";
                codigo.agregarC3D(c3d);
                //console.log(c3d);
                return temp;
            case '^':
                var temp = codigo.generaTemp();
                var c3d = temp + " = " + val1+ " ^ " + val2 + ";\n";
                codigo.agregarC3D(c3d);
                //console.log(c3d);
                return temp;
            default:
                break;
        }
        return null;
    };
    return Operacion;
}());
