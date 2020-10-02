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
"in"			        return 'pr_in';
"of"			        return 'pr_of';
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
.					    { 	Manager.getManager().addError(new NodoError(TipoError.LEXICO, `El caracter ${yytext} no pertenece al lenguaje`, yylloc.first_line, yylloc.first_column,"global"));
							//er.addError(new NodoError.NodoError(NodoError.TipoError.LEXICO, `El caracter ${yytext} no pertenece al lenguaje`, yylloc.first_line, yylloc.first_column, "this.archivo"));
    						//console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); 
						}

/lex

%{
	
	const {Acceso,TipoAcceso} = require('../TypeScript/Interpreter/Expresion/Acceso');
	const {Aritmetica,TipoOperacionAritmetica} = require('../TypeScript/Interpreter/Expresion/Aritmetica');
	const {Relacional,TipoOperacionRelacional} = require('../TypeScript/Interpreter/Expresion/Relacional');
	const {Logica,TipoOperacionLogica} = require('../TypeScript/Interpreter/Expresion/Logica');
	const {Literal,TipoString} = require('../TypeScript/Interpreter/Expresion/Literal');
	const {Id} = require('../TypeScript/Interpreter/Expresion/Id');
	const {Ternario} = require('../TypeScript/Interpreter/Expresion/Ternario');
	const {Null} = require('../TypeScript/Interpreter/Expresion/Null');

	const {Llamada} = require('../TypeScript/Interpreter/Instruccion/Llamada');

	const {Declaracion,TipoDeclaracion} = require('../TypeScript/Interpreter/Instruccion/Declaracion');
	const {Asignacion} = require('../TypeScript/Interpreter/Instruccion/Asignacion');
	
	const {ArrayTS} = require('../TypeScript/Interpreter/Edd/ArrayTS');
	const {TypeTS} = require('../TypeScript/Interpreter/Edd/TypeTS');
	const {TypeTSDefinicion} = require('../TypeScript/Interpreter/Edd/TypeTSDefinicion');
	
	const {Incremento} = require('../TypeScript/Interpreter/FuncionesNativas/Incremento');
	const {Decremento} = require('../TypeScript/Interpreter/FuncionesNativas/Decremento');

	const {Manager} = require('../TypeScript/Interpreter/Reportes/Manager');
	const {NodoError,TipoError} = require('../TypeScript/Interpreter/Reportes/NodoError');

	const {Type} = require('../TypeScript/Interpreter/TablaSimbolos/Tipo');



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

INICIO : E  EOF  { /*console.log("Fin Auxiliar Jison");*/ $$ = $1;  return $$;  } ;

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
	| error 
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