/* Definición Léxica */


%lex

%options case-insensitive

%%

\s+											// se ignoran espacios en blanco
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas
//-----> Palabras Reservadas

"let"			        return 'pr_let';
"console.log"			return 'pr_consolelog';
/*
"null"			        return 'pr_null'; 
"integer"		        return 'pr_integer'; 
"double"		        return 'pr_double'; 
"char"			        return 'pr_char';
"import"		        return 'pr_import';
"var"			        return 'pr_var';
"const"			        return 'pr_const';
"global"		        return 'pr_global';
"true"			        return 'pr_true';
"false"			        return 'pr_false';
"if"			        return 'pr_if';
"else"			        return 'pr_else';
"switch"		        return 'pr_switch';
"case"			        return 'pr_case';
"default"		        return 'pr_default';
"break"			        return 'pr_break';
"continue"		        return 'pr_continue';
"return"		        return 'pr_return'; 

"public"		        return 'pr_public';
"private"		        return 'pr_private';
"void"			        return 'pr_void';
"for"			        return 'pr_for';
"while"			        return 'pr_while';
"define"		        return 'pr_define';
"as"			        return 'pr_as';
"strc"			        return 'pr_strc';
"do"			        return 'pr_do';
"try"			        return 'pr_try';
"catch"			        return 'pr_catch';
"throw"			        return 'pr_throw';
"boolean"		        return 'pr_boolean';
*/

//-----> Simbolos Aritmeticos
"++"                    return 'inc';
"+"                     return 'mas';
"--"                    return 'dec'; 
"-"                     return 'menos'; 
"*"                     return 'por';
"/"                     return 'div';
"^^"                    return 'pot'; 
"%"                     return 'mod'; 
//-----> Simbolos Relacionales
"=="                    return 'igualque';
"!="                    return 'diferente';
">="                    return 'mayorigual'; 
">"                     return 'mayorque';
"<="                    return 'menorigual'; 
"<"                     return 'menorque';

//-----> Simbolos
"."                     return 'punto';
","                     return 'coma';
":="                    return 'dospuntosigual';
":"                     return 'dospuntos';
";"                     return 'ptcoma';
"["                     return 'corizq';
"]"                     return 'corder';
"("                     return 'parizq';
")"                     return 'parder';
"{"                     return 'llaveizq';
"}"                     return 'llaveder';
"="                     return 'igual';
"?"                     return 'pregunta';

//-----> Simbolos Logicos
"&&"                    return 'and';
"||"                    return 'or';
"!"                     return 'not'; 
"^"                     return 'xor';

\"[^\"]*\"				{ //yytext = yytext.substr(1,yyleng-2);
						 let cad = yytext.substr(1,yyleng-2);
                            cad = cad.replace("\\","\\");
                            cad = cad.replace("\\n","\n");
                            cad = cad.replace("\\r","\r");
                            cad = cad.replace("\\t","\t");
							yytext = cad;
						return 'cadena'; }
[0-9]+"."[0-9]+\b  		return 'decimal';
[0-9]+\b				return 'entero';
[\'][^\'\n][\']         { yytext = yytext.substr(1,yyleng-2); return 'char'; }
([a-zA-Z])[a-zA-Z0-9_]* return 'identificador';

<<EOF>>				    return 'EOF'; 
.					    { 	//Manager.Manager.getManager().addError(new NodoError.NodoError(NodoError.TipoError.LEXICO, `El caracter ${yytext} no pertenece al lenguaje`, yylloc.first_line, yylloc.first_column, "this.archivo"));
							//er.addError(new NodoError.NodoError(NodoError.TipoError.LEXICO, `El caracter ${yytext} no pertenece al lenguaje`, yylloc.first_line, yylloc.first_column, "this.archivo"));
    						//console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); 
						}

/lex

%{
	
	//const AST = require('../JavaScript/Abstract/AST');

	//const ConsoleLog = require('../JavaScript/Instruccion/ConsoleLog');

    /*
	const Aritmetica = require('../JavaScript/Expresion/Aritmetica');
	const Relacional = require('../JavaScript/Expresion/Relacional');
	const Logica = require('../JavaScript/Expresion/Logica');
	const Primitivo = require('../JavaScript/Expresion/Primitivo');
	const Cadena = require('../JavaScript/Expresion/Cadena');
	const Id = require('../JavaScript/Expresion/Id');
	const CasteoExplicito = require('../JavaScript/Expresion/CasteoExplicito');
	const LlamadaE = require('../JavaScript/Expresion/LlamadaE');
	const Acceso = require('../JavaScript/Expresion/Acceso');

	const If = require('../JavaScript/Instruccion/SentenciasControlFlujo/If');
	const IfElse = require('../JavaScript/Instruccion/SentenciasControlFlujo/IfElse');
	const Else = require('../JavaScript/Instruccion/SentenciasControlFlujo/Else');
	const Switch = require('../JavaScript/Instruccion/SentenciasControlFlujo/Switch');
	const Case = require('../JavaScript/Instruccion/SentenciasControlFlujo/Case');
	const Default = require('../JavaScript/Instruccion/SentenciasControlFlujo/Default');

	const While = require('../JavaScript/Instruccion/SentenciasControlFlujo/While');
	const DoWhile = require('../JavaScript/Instruccion/SentenciasControlFlujo/DoWhile');
	const For = require('../JavaScript/Instruccion/SentenciasControlFlujo/For');

	const Break = require('../JavaScript/Instruccion/SentenciasTransferencia/Break');
	const Continue = require('../JavaScript/Instruccion/SentenciasTransferencia/Continue');
	const Return = require('../JavaScript/Instruccion/SentenciasTransferencia/Return');

	
	const Declaracion = require('../JavaScript/Instruccion/Declaracion');
	const Asignacion = require('../JavaScript/Instruccion/Asignacion');
	const Funcion = require('../JavaScript/Instruccion/Funcion');
	const LlamadaI = require('../JavaScript/Instruccion/LlamadaI');

	const Tipo = require('../JavaScript/TablaSimbolos/Tipo');

    const NodoError = require('../JavaScript/Reportes/NodoError');
    */

	//Manager.Manager.getManager().reiniciar(); 
	//Manager.Manager.getManager().agregarC3D("hola mundo");
	//const ErrorManager = require('../JavaScript/Reportes/ErrorManager');
    
    //let er = new ErrorManager.ErrorManager(); 
	//er.addError(new NodoError.NodoError(NodoError.TipoError.SEMANTICO, `No es posible la suma entre los tipos ${1} y ${1}`, 1, 1, "this.archivo"));
    
%}

/* Asociación de operadores y precedencia */
//----> precedencia de menor a mayor 

//Operaciones logicas
%left or
%left xor
%left and
%right not

//Operaciones Relacionales
%left diferente,igualque
%left  menorque,mayorque,menorigual,mayorigual

//Operaciones numericas
%left mas, menos
%left por, div
%left pot,mod

%right umenos
%left parizq,parder

%start INICIO

%% /* Definición de la gramática */

INICIO : LISTA_INSTRUCCIONES  EOF  { console.log("Fin Jison"); $$ = new AST($1);  return $$;  } ;

LISTA_INSTRUCCIONES : LISTA_INSTRUCCIONES INSTRUCCION { $1.push($2); $$=$1;}
    | INSTRUCCION                                     { $$ = [$1]; } ;

INSTRUCCION : E		{ $$ = $1; } 
	| CONSOLELOG 			{ $$ = $1; } 
	| error ptcoma;


CONSOLELOG : pr_consolelog parizq identificador parder ptcoma	{ $$ = new ConsoleLog.ConsoleLog($3,@1.first_line,@1.first_column,"archivo.nombre"); } ;

/*

INSTRUCCION : FUNCION	{ $$ = $1; } 
	| LLAMADAI          { $$ = $1; }
	| DECLARACION		{ $$ = $1; } 
 	| ASIGNACION        { $$ = $1; } 
	| WHILE 			{ $$ = $1; } 
	| DOWHILE 			{ $$ = $1; } 
	| IF	 			{ $$ = $1; } 
	
	| SWITCH 			{ $$ = $1; } 
	| BREAK				{ $$ = $1; } 
    | CONTINUE			{ $$ = $1; } 
    | RETURN			{ $$ = $1; } 
    | error ptcoma 		{ Manager.Manager.getManager().addError(new NodoError.NodoError(NodoError.TipoError.SINTACTICO, `El caracter ${yytext} no se esperaba en esta posicion`, this._$.first_line, this._$.first_column, "this.archivo"));
							//er.addError(new NodoError.NodoError(NodoError.TipoError.SINTACTICO, `El caracter ${yytext} no se esperaba en esta posicion`, this._$.first_line, this._$.first_column, "this.archivo"));
							//console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);
						} ;


BLOQUE : llaveizq LISTA_INSTRUCCIONES llaveder  { $$ = $2; }
    | llaveizq llaveder                             { $$ = []; } ;


FUNCION : TYPE identificador parizq L_PARAMETROS parder  BLOQUE   { $$ = new Funcion.Funcion($1,$2,$4,$6,@1.first_line,@1.first_column,"archivo.nombre"); } 
	| TYPE identificador parizq parder  BLOQUE   { $$ = new Funcion.Funcion($1,$2,[],$5,@1.first_line,@1.first_column,"archivo.nombre"); } 
	| pr_void identificador parizq L_PARAMETROS parder  BLOQUE   {  $$ = new Funcion.Funcion(null,$2,$4,$6,@1.first_line,@1.first_column,"archivo.nombre"); } 
	| pr_void identificador parizq parder BLOQUE   {  $$ = new Funcion.Funcion(null,$2,[],$5,@1.first_line,@1.first_column,"archivo.nombre"); } ;

L_PARAMETROS : L_PARAMETROS coma PARAMETRO	{ $1.push($3); $$=$1; }
    | PARAMETRO                             { $$ = [$1]; } ;

PARAMETRO :	TYPE identificador { $$ = new Declaracion.Declaracion(Declaracion.TipoModificador.VAR,Declaracion.TipoDeclaracion.TIPO5,$1,[$2],null,@1.first_line,@1.first_column,"archivo.nombre"); } ;


DECLARACION : TYPE L_ID igual EXP ptcoma { $$ = new Declaracion.Declaracion(Declaracion.TipoModificador.VAR,Declaracion.TipoDeclaracion.TIPO1,$1,$2,$4,@1.first_line,@1.first_column,"archivo.nombre"); }
	| pr_var L_ID dospuntosigual EXP ptcoma { $$ = new Declaracion.Declaracion(Declaracion.TipoModificador.VAR,Declaracion.TipoDeclaracion.TIPO2,null,$2,$4,@1.first_line,@1.first_column,"archivo.nombre"); }
	| pr_const L_ID dospuntosigual EXP ptcoma { $$ = new Declaracion.Declaracion(Declaracion.TipoModificador.CONST,Declaracion.TipoDeclaracion.TIPO3,null,$2,$4,@1.first_line,@1.first_column,"archivo.nombre"); }
	| pr_global L_ID dospuntosigual EX P ptcoma { $$ = new Declaracion.Declaracion(Declaracion.TipoModificador.GLOBAL,Declaracion.TipoDeclaracion.TIPO4,null,$2,$4,@1.first_line,@1.first_column,"archivo.nombre"); }
	| TYPE L_ID ptcoma { $$ = new Declaracion.Declaracion(Declaracion.TipoModificador.VAR,Declaracion.TipoDeclaracion.TIPO5,$1,$2,null,@1.first_line,@1.first_column,"archivo.nombre"); } ;

L_ID : L_ID coma identificador	{ $1.push($3); $$=$1; }
	| identificador				{ $$ = [$1]; } ;

TYPE: TIPO corizq corder { $1.setEsArreglo(true); $$=$1;  }
	| TIPO { $$=$1; } ;

TIPO : pr_integer { $$ = new Tipo.Tipo(Tipo.Type.INTEGER); } 
	| pr_double	{ $$ = new Tipo.Tipo(Tipo.Type.DOUBLE); } 
	| pr_char	{ $$ = new Tipo.Tipo(Tipo.Type.CHAR); } 
	| pr_boolean { $$ = new Tipo.Tipo(Tipo.Type.BOOLEAN); } 
	| identificador { $$ = new Tipo.Tipo($1.toLowerCase()); }  ;

ASIGNACION : identificador igual E ptcoma { $$ = new Asignacion.Asignacion($1,[],$3,@1.first_line,@1.first_column,"archivo.nombre"); }  ;

LLAMADAI : identificador parizq L_E parder ptcoma  { $$ = new LlamadaI.LlamadaI($1,$3,@1.first_line,@1.first_column,"archivo.nombre"); }
    | identificador parizq L_E parder  { $$ = new LlamadaI.LlamadaI($1,$3,@1.first_line,@1.first_column,"archivo.nombre"); }
    | identificador parizq parder ptcoma  { $$ = new LlamadaI.LlamadaI($1,[],@1.first_line,@1.first_column,"archivo.nombre"); }
    | identificador parizq parder  { $$ = new LlamadaI.LlamadaI($1,[],@1.first_line,@1.first_column,"archivo.nombre"); } ;

LLAMADAE : identificador parizq L_E parder   { $$ = new LlamadaE.LlamadaE($1,$3,@1.first_line,@1.first_column,"archivo.nombre"); }
    | identificador parizq parder  { $$ = new LlamadaE.LlamadaE($1,[],@1.first_line,@1.first_column,"archivo.nombre"); } ;

L_E : L_E coma E  { $1.push($3); $$=$1; }
 | E                { $$ = [$1]; } ;


WHILE : pr_while parizq E parder BLOQUE	{ $$ = new While.While($3,$5,@1.first_line,@1.first_column,"archivo.nombre"); } ;

DOWHILE : pr_do  BLOQUE  pr_while parizq E parder { $$ = new DoWhile.DoWhile($2,$5,@1.first_line,@1.first_column,"archivo.nombre"); } ;

IF : pr_if parizq E parder BLOQUE           		{ $$ = new If.If($3,$5,@1.first_line,@1.first_column,"archivo.nombre"); }
    | pr_if parizq E parder BLOQUE pr_else BLOQUE	{ $$ = new IfElse.IfElse($3,$5,$7,null,@1.first_line,@1.first_column,"archivo.nombre"); } 
	| pr_if parizq E parder BLOQUE pr_else IF   	{ $$ = new IfElse.IfElse($3,$5,null,$7,@1.first_line,@1.first_column,"archivo.nombre"); } ;

SWITCH : pr_switch parizq E parder llaveizq L_CASE DEFAULT llaveder	{ $$ = new Switch.Switch($3,$6,$7,@1.first_line,@1.first_column,"archivo.nombre"); }
    | pr_switch parizq E parder llaveizq L_CASE llaveder            { $$ = new Switch.Switch($3,$6,null,@1.first_line,@1.first_column,"archivo.nombre"); } ;

L_CASE : L_CASE CASE	{ $1.push($2); $$=$1 }
    | CASE				{ $$ = [$1]; } ;

CASE : pr_case E dospuntos LISTA_INSTRUCCIONES { $$ = new Case.Case($2,$4,@1.first_line,@1.first_column,"archivo.nombre"); } ;

DEFAULT : pr_default dospuntos LISTA_INSTRUCCIONES { $$ = new Default.Default($3,@1.first_line,@1.first_column,"archivo.nombre"); } ;

BREAK : pr_break ptcoma   { $$ = new Break.Break(); }
    | pr_break              { $$ = new Break.Break(); } ;

CONTINUE : pr_continue ptcoma { $$ = new Continue.Continue(); }
    | pr_continue               { $$ = new Continue.Continue(); } ;

RETURN : pr_return E ptcoma { $$ = new Return.Return($2,@1.first_line,@1.first_column,"archivo.nombre"); } 
    | pr_return E             { $$ = new Return.Return($2,@1.first_line,@1.first_column,"archivo.nombre"); } ;

EXP : CASTEO { $$ = $1; }
	| E { $$ = $1; } ;

CASTEO : parizq pr_integer parder E { $$ = new CasteoExplicito.CasteoExplicito(CasteoExplicito.TipoCasteo.TO_INTEGER,$4,@1.first_line,@1.first_column,"archivo.nombre"); }
	| parizq pr_char parder E { $$ = new CasteoExplicito.CasteoExplicito(CasteoExplicito.TipoCasteo.TO_CHAR,$4,@1.first_line,@1.first_column,"archivo.nombre"); }
	| parizq pr_do parder E  { $$ = new CasteoExplicito.CasteoExplicito(CasteoExplicito.TipoCasteo.TO_DOUBLE,$4,@1.first_line,@1.first_column,"archivo.nombre"); } ;

E : ARITMETICA      	{ $$ = $1; } 
	| RELACIONAL		{ $$ = $1; } 
    | LOGICA			{ $$ = $1; } 
	| parizq E parder	{ $$ = $2; }
    | entero        	{ $$ = new Primitivo.Primitivo(yytext,Tipo.Type.INTEGER,@1.first_line,@1.first_column,"archivo.nombre");  } 
	| decimal	    	{ $$ = new Primitivo.Primitivo(yytext,Tipo.Type.DOUBLE,@1.first_line,@1.first_column,"archivo.nombre"); }
	| char        		{ $$ = new Primitivo.Primitivo(yytext,Tipo.Type.CHAR,@1.first_line,@1.first_column,"archivo.nombre");  } 
	| cadena	    	{ $$ = new Cadena.Cadena(yytext,$1.length,new Tipo.Tipo("string"),@1.first_line,@1.first_column,"archivo.nombre"); }
	| pr_true        	{ $$ = new Primitivo.Primitivo(yytext,Tipo.Type.BOOLEAN,@1.first_line,@1.first_column,"archivo.nombre");  } 
	| pr_false	    	{ $$ = new Primitivo.Primitivo(yytext,Tipo.Type.BOOLEAN,@1.first_line,@1.first_column,"archivo.nombre"); }
	| LLAMADAE          { $$ = $1; }
	| identificador 	{ $$ = new Id.Id($1,@1.first_line,@1.first_column,"archivo.nombre"); }
	| identificador punto L_ACCESO { $$ = new Acceso.Acceso($1,$3,@1.first_line,@1.first_column,"archivo.nombre"); }
	 ;

L_ACCESO : L_ACCESO punto ACCESO	{ $1.push($3); $$=$1 }
    | ACCESO				{ $$ = [$1]; } ;

ACCESO : LLAMADAE          { $$ = $1; }
	;

ARITMETICA : menos E %prec umenos	{ $$ = new Aritmetica.Aritmetica(Aritmetica.TipoOperacionAritmetica.NEGACION,null,null,$2,true,@1.first_line,@1.first_column,"archivo.nombre"); }
    | E mas   E         			{ $$ = new Aritmetica.Aritmetica(Aritmetica.TipoOperacionAritmetica.SUMA,$1,$3,null,false,@1.first_line,@1.first_column,"archivo.nombre"); }
    | E menos E         			{ $$ = new Aritmetica.Aritmetica(Aritmetica.TipoOperacionAritmetica.RESTA,$1,$3,null,false,@1.first_line,@1.first_column,"archivo.nombre"); }
    | E por   E         			{ $$ = new Aritmetica.Aritmetica(Aritmetica.TipoOperacionAritmetica.MULTIPLICACION,$1,$3,null,false,@1.first_line,@1.first_column,"archivo.nombre"); }
    | E div   E         			{ $$ = new Aritmetica.Aritmetica(Aritmetica.TipoOperacionAritmetica.DIVISION,$1,$3,null,false,@1.first_line,@1.first_column,"archivo.nombre"); }
    | E pot   E        	 			{ $$ = new Aritmetica.Aritmetica(Aritmetica.TipoOperacionAritmetica.POTENCIA,$1,$3,null,false,@1.first_line,@1.first_column,"archivo.nombre"); }
    | E mod   E        	 			{ $$ = new Aritmetica.Aritmetica(Aritmetica.TipoOperacionAritmetica.MODULO,$1,$3,null,false,@1.first_line,@1.first_column,"archivo.nombre"); } ;

RELACIONAL : E igualque E	{ $$ = new Relacional.Relacional(Relacional.TipoOperacionRelacional.IGUALQUE,$1,$3,@1.first_line,@1.first_column,"archivo.nombre"); }
    | E diferente E      	{ $$ = new Relacional.Relacional(Relacional.TipoOperacionRelacional.DIFERENTE,$1,$3,@1.first_line,@1.first_column,"archivo.nombre"); }
    | E mayorque E          { $$ = new Relacional.Relacional(Relacional.TipoOperacionRelacional.MAYORQUE,$1,$3,@1.first_line,@1.first_column,"archivo.nombre"); }
    | E mayorigual E        { $$ = new Relacional.Relacional(Relacional.TipoOperacionRelacional.MAYORIGUAL,$1,$3,@1.first_line,@1.first_column,"archivo.nombre"); }
    | E menorque E          { $$ = new Relacional.Relacional(Relacional.TipoOperacionRelacional.MENORQUE,$1,$3,@1.first_line,@1.first_column,"archivo.nombre"); }
    | E menorigual E        { $$ = new Relacional.Relacional(Relacional.TipoOperacionRelacional.MENORIGUAL,$1,$3,@1.first_line,@1.first_column,"archivo.nombre"); } ;

LOGICA : E and E	{ $$ = new Logica.Logica(Logica.TipoOperacionLogica.AND,$1,$3,null,false,@1.first_line,@1.first_column,"archivo.nombre"); }
    | E or E        { $$ = new Logica.Logica(Logica.TipoOperacionLogica.OR,$1,$3,null,false,@1.first_line,@1.first_column,"archivo.nombre"); }
    | E xor E       { $$ = new Logica.Logica(Logica.TipoOperacionLogica.XOR,$1,$3,null,false,@1.first_line,@1.first_column,"archivo.nombre"); }
	| not E         { $$ = new Logica.Logica(Logica.TipoOperacionLogica.NOT,null,null,$2,true,@1.first_line,@1.first_column,"archivo.nombre"); } ;


*/
E : ARITMETICA      	{ $$ = $1; } 
| entero { $$ = $1; } ;

ARITMETICA :  E mas   E     {console.log($1+$3);}    			
    | E menos E {console.log($1-$3);}    	;