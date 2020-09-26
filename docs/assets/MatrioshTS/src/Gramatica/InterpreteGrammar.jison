/* Definición Léxica */


%lex

//%options case-insensitive

%%

\s+											// se ignoran espacios en blanco
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas
//-----> Palabras Reservadas


"console.log"			return 'pr_consolelog';
"let"			        return 'pr_let';
"const"			        return 'pr_const';

"true"			        return 'pr_true';
"false"			        return 'pr_false';

"null"			        return 'pr_null'; 
"number"		        return 'pr_number'; 
"string"			    return 'pr_string';
"boolean"			    return 'pr_boolean';
"void"			        return 'pr_void';
"type"			        return 'pr_type';

"function"		        return 'pr_function';
"if"			        return 'pr_if';
"else"			        return 'pr_else';

"switch"		        return 'pr_switch';
"case"			        return 'pr_case';
"default"		        return 'pr_default';
"break"			        return 'pr_break';
"continue"		        return 'pr_continue';

"for"			        return 'pr_for';
"while"			        return 'pr_while';
"do"			        return 'pr_do';
"return"		        return 'pr_return'; 
"type"		        	return 'pr_type';


//-----> Simbolos Aritmeticos
"++"                    return 'inc';
"+"                     return 'mas';
"--"                    return 'dec'; 
"-"                     return 'menos'; 
"**"                    return 'pot'; 
"*"                     return 'por';
"/"                     return 'div';

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

\"[^\"]*\"				{ //yytext = yytext.substr(1,yyleng-2);
						 let cad1 = yytext.substr(1,yyleng-2);
                            cad1 = cad1.replace(/\\/g,"\\");
                            cad1 = cad1.replace(/\\n/g,"\n");
                            cad1 = cad1.replace(/\\r/g,"\r");
                            cad1 = cad1.replace(/\\t/g,"\t");
							yytext = cad1;
						return 'string1'; }
[\'][^\']*[\']				{ //yytext = yytext.substr(1,yyleng-2);
						 let cad2 = yytext.substr(1,yyleng-2);
                            cad2 = cad2.replace(/\\/g,"\\");
                            cad2 = cad2.replace(/\\n/g,"\n");
                            cad2 = cad2.replace(/\\r/g,"\r");
                            cad2 = cad2.replace(/\\t/g,"\t");
							yytext = cad2;
						return 'string2'; }
[\`][^\`]*[\`]				{ //yytext = yytext.substr(1,yyleng-2);
						 let cad3 = yytext.substr(1,yyleng-2);
                            cad3 = cad3.replace(/\\/g,"\\");
                            cad3 = cad3.replace(/\\n/g,"\n");
                            cad3 = cad3.replace(/\\r/g,"\r");
                            cad3 = cad3.replace(/\\t/g,"\t");
							yytext = cad3;
						return 'string3'; }
						
[0-9]+"."[0-9]+\b  		return 'decimal';
[0-9]+\b				return 'entero';
//[\'][^\'\n][\']         { yytext = yytext.substr(1,yyleng-2); return 'char'; }
([a-zA-Z])[a-zA-Z0-9_]* return 'identificador';

<<EOF>>				    return 'EOF'; 
.					    { 	Manager.getManager().addError(new NodoError(TipoError.LEXICO, `El caracter ${yytext} no pertenece al lenguaje`, yylloc.first_line, yylloc.first_column));
							//er.addError(new NodoError.NodoError(NodoError.TipoError.LEXICO, `El caracter ${yytext} no pertenece al lenguaje`, yylloc.first_line, yylloc.first_column, "this.archivo"));
    						//console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); 
						}

/lex

%{
	
	
	const {AST} = require('../TypeScript/Interpreter/Abstract/AST');

	const {Acceso,TipoAcceso} = require('../TypeScript/Interpreter/Expresion/Acceso');
	const {Aritmetica,TipoOperacionAritmetica} = require('../TypeScript/Interpreter/Expresion/Aritmetica');
	const {Relacional,TipoOperacionRelacional} = require('../TypeScript/Interpreter/Expresion/Relacional');
	const {Logica,TipoOperacionLogica} = require('../TypeScript/Interpreter/Expresion/Logica');
	const {Literal,TipoString} = require('../TypeScript/Interpreter/Expresion/Literal');
	const {Id} = require('../TypeScript/Interpreter/Expresion/Id');
	const {Ternario} = require('../TypeScript/Interpreter/Expresion/Ternario');
	const {Null} = require('../TypeScript/Interpreter/Expresion/Null');

	const {Bloque} = require('../TypeScript/Interpreter/Instruccion/Bloque');
	const {Funcion} = require('../TypeScript/Interpreter/Instruccion/Funcion');
	const {Llamada} = require('../TypeScript/Interpreter/Instruccion/Llamada');
	//const {If_Old,TipoIf} = require('../TypeScript/Interpreter/Instruccion/SentenciasControlFlujo/If_Old');
	const {If} = require('../TypeScript/Interpreter/Instruccion/SentenciasControlFlujo/If');
	const {IfElse} = require('../TypeScript/Interpreter/Instruccion/SentenciasControlFlujo/IfElse');
	const {Else} = require('../TypeScript/Interpreter/Instruccion/SentenciasControlFlujo/Else');
	const {While} = require('../TypeScript/Interpreter/Instruccion/SentenciasControlFlujo/While');
	const {DoWhile} = require('../TypeScript/Interpreter/Instruccion/SentenciasControlFlujo/DoWhile');
	const {Declaracion,TipoDeclaracion} = require('../TypeScript/Interpreter/Instruccion/Declaracion');
	const {Asignacion} = require('../TypeScript/Interpreter/Instruccion/Asignacion');
	const {For} = require('../TypeScript/Interpreter/Instruccion/SentenciasControlFlujo/For');

	const {Switch} = require('../TypeScript/Interpreter/Instruccion/SentenciasControlFlujo/Switch');
	const {Case} = require('../TypeScript/Interpreter/Instruccion/SentenciasControlFlujo/Case');
	const {Default} = require('../TypeScript/Interpreter/Instruccion/SentenciasControlFlujo/Default');

	const {ArrayTS} = require('../TypeScript/Interpreter/Edd/ArrayTS');
	const {TypeTS} = require('../TypeScript/Interpreter/Edd/TypeTS');
	const {TypeTSDefinicion} = require('../TypeScript/Interpreter/Edd/TypeTSDefinicion');
	
	const {Log} = require('../TypeScript/Interpreter/FuncionesNativas/Log');
	const {Incremento} = require('../TypeScript/Interpreter/FuncionesNativas/Incremento');
	const {Decremento} = require('../TypeScript/Interpreter/FuncionesNativas/Decremento');

	const {Manager} = require('../TypeScript/Interpreter/Reportes/Manager');
	const {NodoError,TipoError} = require('../TypeScript/Interpreter/Reportes/NodoError');

	const {Type} = require('../TypeScript/Interpreter/TablaSimbolos/Tipo');

	const {Return} = require('../TypeScript/Interpreter/Instruccion/SentenciasTransferencia/Return');
	const {Break} = require('../TypeScript/Interpreter/Instruccion/SentenciasTransferencia/Break');
	const {Continue} = require('../TypeScript/Interpreter/Instruccion/SentenciasTransferencia/Continue');

    /*	
	const LlamadaE = require('../JavaScript/Expresion/LlamadaE');
	const Acceso = require('../JavaScript/Expresion/Acceso');
	
	const LlamadaI = require('../JavaScript/Instruccion/LlamadaI');
    */

	//Manager.Manager.getManager().reiniciar(); 
	//Manager.Manager.getManager().agregarC3D("hola mundo");
	//const ErrorManager = require('../JavaScript/Reportes/ErrorManager');
    //let er = new ErrorManager.ErrorManager(); 
	//er.addError(new NodoError.NodoError(NodoError.TipoError.SEMANTICO, `No es posible la suma entre los tipos ${1} y ${1}`, 1, 1, "this.archivo"));
    
%}

/* Asociación de operadores y precedencia */
//----> precedencia de menor a mayor 
%left pregunta

//Operaciones logicas
//%left or
//%left and
//%right not
%left or
%left and

//Operaciones Relacionales
%left diferente,igualque
%left menorque,mayorque,menorigual,mayorigual

//Operaciones numericas
%left mas, menos
%left por, div
%left pot,mod

%right not

%right umenos
%left parizq,parder

%start INICIO

%% /* Definición de la gramática */

INICIO : LISTA_INSTRUCCIONES  EOF  { console.log("Fin Jison"); $$ = new AST($1);  return $$;  } ;

LISTA_INSTRUCCIONES : LISTA_INSTRUCCIONES INSTRUCCION { $1.push($2); $$=$1;}
    | INSTRUCCION                                     { $$ = [$1]; } ;

BLOQUE : llaveizq LISTA_INSTRUCCIONES llaveder  { $$ = new Bloque($2, @1.first_line, @1.first_column); /*$$ = $2;*/ }
    | llaveizq llaveder                         { $$ = new Bloque([], @1.first_line, @1.first_column); /*$$ = [];*/ } ;

INSTRUCCION : FUNCION	{ $$ = $1; } 
	| CONSOLELOG 		{ $$ = $1; } 
	| DECLARACION		{ $$ = $1; } 
	| ASIGNACION        { $$ = $1; }     
	| IF 				{ $$ = $1; } 
	| TYPES 			{ $$ = $1; }
	| FOR  				{ $$ = $1; }
	| WHILE 			{ $$ = $1; } 
	| DOWHILE 			{ $$ = $1; } 
	| SWITCH 			{ $$ = $1; } 
	| BREAK				{ $$ = $1; } 
    | CONTINUE			{ $$ = $1; } 
	| RETURN			{ $$ = $1; } 
	| INC				{ $$ = $1; } 
	| DEC				{ $$ = $1; } 
	| LLAMADA           { $$ = $1; } 
	| error ptcoma {	Console.log(` Error Sintactico se recupero con ${yytext} en la posicion`,@1.last_line,@1.last_column); 
					//Para reportar el error compilar el archivo jison y en el .js buscar -> if (!recovering) { y pegar el codigo hasta de ultimo de ese if
					//Manager.getManager().addError(new NodoError(TipoError.SINTACTICO, `El caracter ${(this.terminals_[symbol] || symbol)} no se esperaba en esta posicion`, yyloc.last_line, yyloc.last_column));
                } ;


TYPES : pr_type identificador igual llaveizq TYPE_L_PARAM llaveder ptcoma { $$ = new TypeTS($2,$5,@1.first_line,@1.first_column); } 
	| pr_type identificador igual llaveizq TYPE_L_PARAM llaveder  { $$ = new TypeTS($2,$5,@1.first_line,@1.first_column); } ;


RETURN : pr_return E ptcoma { $$ = new Return($2,@1.first_line,@1.first_column); } 
	| pr_return ptcoma { $$ = new Return(null,@1.first_line,@1.first_column); } ;

INC : identificador inc ptcoma {  $$ = new Incremento($1, @1.first_line, @1.first_column); } 
	| identificador inc  {  $$ = new Incremento($1, @1.first_line, @1.first_column); } ;

DEC : identificador dec ptcoma {  $$ = new Decremento($1, @1.first_line, @1.first_column); } 
	| identificador dec  {  $$ = new Decremento($1, @1.first_line, @1.first_column); } ;

IF : pr_if parizq E parder BLOQUE	{ $$ = new If($3,$5,@1.first_line,@1.first_column); }
	| pr_if parizq E parder BLOQUE ELSE    { $$ = new IfElse($3,$5,$6,@1.first_line,@1.first_column); } ;

ELSE : pr_else BLOQUE { $$ = new Else($2,@1.first_line,@1.first_column); }
    | pr_else IF { $$ = $2; } ;

FOR : pr_for parizq FOR_D E ptcoma FOR_A parder BLOQUE { $$ = new For($3,$4,$6,$8,@1.first_line,@1.first_column); } ;

FOR_D : DECLARACION { $$ = $1; }
	| ASIGNACION { $$ = $1; } ;

FOR_A : INC  { $$ = $1; }
	| DEC { $$ = $1; }
	| ASIGNACION { $$ = $1; };
/*
IF : pr_if parizq E parder BLOQUE ELSE	{ $$ = new If_Old($3,$5,$6.valor,$6.tipo,@1.first_line,@1.first_column); };

ELSE : pr_else BLOQUE	{ $$ = {tipo:TipoIf.IFELSE, valor:$2}; } 
	| pr_else IF   	{ $$ = {tipo:TipoIf.IFELSEIF, valor:$2}; } 
	| { $$ = {tipo:TipoIf.IF, valor:null}; } ;
*/

WHILE : pr_while parizq E parder BLOQUE	{ $$ = new While($3,$5,@1.first_line,@1.first_column); } ;

DOWHILE : pr_do  BLOQUE  pr_while parizq E parder { $$ = new DoWhile($2,$5,@1.first_line,@1.first_column); } 
	| pr_do  BLOQUE  pr_while parizq E parder ptcoma { $$ = new DoWhile($2,$5,@1.first_line,@1.first_column); } ;

SWITCH : pr_switch parizq E parder llaveizq L_CASE DEFAULT llaveder	{ $$ = new Switch($3,$6,$7,@1.first_line,@1.first_column); }
    | pr_switch parizq E parder llaveizq L_CASE llaveder            { $$ = new Switch($3,$6,null,@1.first_line,@1.first_column); } ;

L_CASE : L_CASE CASE	{ $1.push($2); $$=$1 }
    | CASE				{ $$ = [$1]; } ;

CASE : pr_case E dospuntos LISTA_INSTRUCCIONES { $$ = new Case($2,$4,@1.first_line,@1.first_column); } ;

DEFAULT : pr_default dospuntos LISTA_INSTRUCCIONES { $$ = new Default($3,@1.first_line,@1.first_column); } ;

BREAK : pr_break ptcoma   { $$ = new Break(@1.first_line,@1.first_column); } ;

CONTINUE : pr_continue ptcoma { $$ = new Continue(@1.first_line,@1.first_column); };

CONSOLELOG : pr_consolelog parizq L_E parder ptcoma	{ $$ = new Log($3,@1.first_line,@1.first_column); } ;

/*
FUNCION :  pr_function identificador parizq L_PARAMETROS parder dospuntos TIPO BLOQUE  { $$ = new Funcion($1,$2,$4,$6,@1.first_line,@1.first_column); } 
		|  pr_function identificador parizq parder dospuntos TIPO BLOQUE { $$ = new Funcion($1,$2,[],$5,@1.first_line,@1.first_column); } ;
*/

FUNCION :  pr_function identificador parizq F { $$ = $4; } ;
		
F : L_PARAMETROS parder T llaveizq LISTA_INSTRUCCIONES llaveder  { 
		var s =  eval('$$');
		var identificador = s[s.length - 8]; /*s[s.length - 7];*/
		for(instr of $5){/*for(instr of $5.instrucciones){*/
			try{
				if(instr instanceof Funcion){
					instr.padre = identificador; //Le paso el id del padre al hijo
				}
			}catch(e){
				console.log("Error al pasar el id del padre al hijo"+e);
			}
		}
		$$ = new Funcion(identificador,null,$1,$3,$5,@1.first_line,@1.first_column); } 
	| parder T llaveizq LISTA_INSTRUCCIONES llaveder { 
		var s =  eval('$$');
		var identificador = s[s.length - 7]; /*s[s.length - 6];*/
		for(instr of $4){/*for(instr of $4.instrucciones){*/
			try{
				if(instr instanceof Funcion){
					instr.padre = identificador; //Le paso el id del padre al hijo
				}
			}catch(e){
				console.log("Error al pasar el id del padre al hijo"+e);
			}
		}
		$$ = new Funcion(identificador,null,[],$2,$4,@1.first_line,@1.first_column);  
	} ;

T : dospuntos TIPO { $$ = $2; } 
	| { $$ = null;} ;

TYPE_L_PARAM : TYPE_L_PARAM PARAMETRO SEPARADOR { $1.push($2); $$=$1; }
	| PARAMETRO SEPARADOR 								{ $$ = [$1]; } ;

SEPARADOR : coma | ptcoma | ;

L_PARAMETROS : L_PARAMETROS coma PARAMETRO	{ $1.push($3); $$=$1; }
    | PARAMETRO                             { $$ = [$1]; } ;

PARAMETRO :	identificador dospuntos TIPO{ $$ = new Declaracion(TipoDeclaracion.PARAM,$1,$3,0,null,@1.first_line,@1.first_column); }
	| identificador dospuntos TIPO DIMENSIONES { $$ = new Declaracion(TipoDeclaracion.PARAM,$1,$3,$4,null,@1.first_line,@1.first_column); } ;

LLAMADA : identificador parizq parder PTC	{ $$ = new Llamada($1,[],@1.first_line,@1.first_column); }
	| identificador parizq L_E parder PTC 	{ $$ = new Llamada($1,$3,@1.first_line,@1.first_column); } 
	| identificador punto identificador parizq parder PTC { $$ = new Llamada($3,[new Literal(String($1),Type.STRING,TipoString.STRING1,@1.first_line,@1.first_column)],@1.first_line,@1.first_column); }
	| identificador punto identificador parizq L_E parder PTC { $5.push(new Literal(String($1),Type.STRING,TipoString.STRING1,@1.first_line,@1.first_column)); $$ = new Llamada($3,$5,@1.first_line,@1.first_column); } ;

PTC : ptcoma | ;

DECLARACION : pr_const identificador T igual E ptcoma { $$ = new Declaracion(TipoDeclaracion.CONST,$2,$3,0,$5,@1.first_line,@1.first_column); }
	| pr_const identificador T DIMENSIONES igual E ptcoma { $$ = new Declaracion(TipoDeclaracion.CONST,$2,$3,$4,$6,@1.first_line,@1.first_column); }
    | pr_let identificador T igual E ptcoma { $$ = new Declaracion(TipoDeclaracion.LET,$2,$3,0,$5,@1.first_line,@1.first_column); }
   	| pr_let identificador T DIMENSIONES igual E ptcoma { $$ = new Declaracion(TipoDeclaracion.LET,$2,$3,$4,$6,@1.first_line,@1.first_column); }
    | pr_let identificador T ptcoma { $$ = new Declaracion(TipoDeclaracion.LET,$2,$3,0,null,@1.first_line,@1.first_column); }
	| pr_let identificador T DIMENSIONES ptcoma { $$ = new Declaracion(TipoDeclaracion.LET,$2,$3,$4,null,@1.first_line,@1.first_column); } ;

ASIGNACION : identificador L_ACCESO igual E ptcoma { $$ = new Asignacion($1,$2,$4,@1.first_line,@1.first_column); } 
    |  identificador igual E ptcoma   { $$ = new Asignacion($1,[],$3,@1.first_line,@1.first_column); } ;

DIMENSIONES : DIMENSIONES corizq corder	{ $1 = $1+1; $$=$1 }
    | corizq corder				{ $$ = 1; } ;

TIPO : pr_number { $$ = Type.NUMBER; } 
	| pr_string	{ $$ = Type.STRING; } 
	| pr_boolean { $$ = Type.BOOLEAN; }  
	| pr_void { $$ = Type.VOID; } 
	| identificador { $$ = yytext; } ;

E : ARITMETICA      	{ $$ = $1; } 
	| RELACIONAL		{ $$ = $1; } 
    | LOGICA			{ $$ = $1; } 
	| parizq E parder	{ $$ = $2; }
	| E pregunta E dospuntos E { $$ = new Ternario($1,$3,$5,@1.first_line,@1.first_column); }  
	| identificador 	{ $$ = new Id($1,@1.first_line,@1.first_column); }
	| identificador L_ACCESO { $$ = new Acceso($1,$2,@1.first_line,@1.first_column); }
	| identificador parizq parder { $$ = new Llamada($1,[],@1.first_line,@1.first_column); }
	| identificador parizq L_E parder { $$ = new Llamada($1,$3,@1.first_line,@1.first_column); } 
	| identificador punto identificador parizq parder { $$ = new Llamada($3,[new Literal(String($1),Type.STRING,TipoString.STRING1,@1.first_line,@1.first_column)],@1.first_line,@1.first_column); }
	| identificador punto identificador parizq L_E parder { $5.push(new Literal(String($1),Type.STRING,TipoString.STRING1,@1.first_line,@1.first_column)); $$ = new Llamada($3,$5,@1.first_line,@1.first_column); } 
	| corizq L_E corder { $$ = new ArrayTS($2,@1.first_line,@1.first_column);}
	| corizq corder 	{ $$ = new ArrayTS([],@1.first_line,@1.first_column);}
	| llaveizq L_E_TYPE llaveder { $$ = new TypeTSDefinicion($2,@1.first_line,@1.first_column);}
	| entero        	{ $$ = new Literal(Number(yytext),Type.NUMBER,TipoString.INDEF,@1.first_line,@1.first_column); } 
	| decimal	    	{ $$ = new Literal(Number(yytext),Type.NUMBER,TipoString.INDEF,@1.first_line,@1.first_column); }
	| string1	    	{ $$ = new Literal(String(yytext),Type.STRING,TipoString.STRING1,@1.first_line,@1.first_column); }
	| string2        	{ $$ = new Literal(String(yytext),Type.STRING,TipoString.STRING2,@1.first_line,@1.first_column); } 
	| string3	    	{ $$ = new Literal(String(yytext),Type.STRING,TipoString.STRING3,@1.first_line,@1.first_column); }
	| pr_true        	{ $$ = new Literal(Boolean(true),Type.BOOLEAN,TipoString.INDEF,@1.first_line,@1.first_column); } 
	| pr_false	    	{ $$ = new Literal(Boolean(false),Type.BOOLEAN,TipoString.INDEF,@1.first_line,@1.first_column); }
	| pr_null           { $$ = new Null(@1.first_line,@1.first_column); }
	;

ARITMETICA : menos E %prec umenos	{ $$ = new Aritmetica(TipoOperacionAritmetica.NEGACION,null,null,$2,true,@1.first_line,@1.first_column); }
    | E mas   E         			{ $$ = new Aritmetica(TipoOperacionAritmetica.SUMA,$1,$3,null,false,@1.first_line,@1.first_column); }
    | E menos E         			{ $$ = new Aritmetica(TipoOperacionAritmetica.RESTA,$1,$3,null,false,@1.first_line,@1.first_column); }
    | E por   E         			{ $$ = new Aritmetica(TipoOperacionAritmetica.MULTIPLICACION,$1,$3,null,false,@1.first_line,@1.first_column); }
    | E div   E         			{ $$ = new Aritmetica(TipoOperacionAritmetica.DIVISION,$1,$3,null,false,@1.first_line,@1.first_column); }
    | E pot   E        	 			{ $$ = new Aritmetica(TipoOperacionAritmetica.POTENCIA,$1,$3,null,false,@1.first_line,@1.first_column); }
    | E mod   E        	 			{ $$ = new Aritmetica(TipoOperacionAritmetica.MODULO,$1,$3,null,false,@1.first_line,@1.first_column); } ;

RELACIONAL : E igualque E	{ $$ = new Relacional(TipoOperacionRelacional.IGUALQUE,$1,$3,@1.first_line,@1.first_column); }
    | E diferente E      	{ $$ = new Relacional(TipoOperacionRelacional.DIFERENTE,$1,$3,@1.first_line,@1.first_column); }
    | E mayorque E          { $$ = new Relacional(TipoOperacionRelacional.MAYORQUE,$1,$3,@1.first_line,@1.first_column); }
    | E mayorigual E        { $$ = new Relacional(TipoOperacionRelacional.MAYORIGUAL,$1,$3,@1.first_line,@1.first_column); }
    | E menorque E          { $$ = new Relacional(TipoOperacionRelacional.MENORQUE,$1,$3,@1.first_line,@1.first_column); }
    | E menorigual E        { $$ = new Relacional(TipoOperacionRelacional.MENORIGUAL,$1,$3,@1.first_line,@1.first_column); } ;

LOGICA : E and E	{ $$ = new Logica(TipoOperacionLogica.AND,$1,$3,null,false,@1.first_line,@1.first_column); }
    | E or E        { $$ = new Logica(TipoOperacionLogica.OR,$1,$3,null,false,@1.first_line,@1.first_column); }
	| not E         { $$ = new Logica(TipoOperacionLogica.NOT,null,null,$2,true,@1.first_line,@1.first_column); } ;

L_E : L_E coma E  { $1.push($3); $$=$1; }
	| E              { $$ = [$1]; } ;

L_E_TYPE : L_E_TYPE coma E_TYPE  { $1.push($3); $$=$1; }
	|  E_TYPE               { $$ = [$1]; } ;

E_TYPE : identificador dospuntos E { $$ = new Declaracion(TipoDeclaracion.TYPEVAL,$1,null,0,$3,@1.first_line,@1.first_column); } ;


L_ACCESO : L_ACCESO ACCESO	{ $1.push($2); $$=$1 }
    | ACCESO				{ $$ = [$1]; } ;

ACCESO : identificador parizq parder { $$ = new Llamada($1,[],@1.first_line,@1.first_column); }
	| identificador parizq L_E parder { $$ = new Llamada($1,$3,@1.first_line,@1.first_column); } 
	| punto identificador  { $$ = new Id($2,@1.first_line,@1.first_column); }
	| corizq E corder   { $$ = $2; }
	;