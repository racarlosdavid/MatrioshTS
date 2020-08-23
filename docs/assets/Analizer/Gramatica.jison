/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%options case-insensitive
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
\"(\\.|[^"])*\"       return 'CADENA'
\'(\\.|[^"])*\'       return 'CARACTER'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"%"                   return '%'
"++"                  return '++'
"--"                  return '--'
"="                   return '='
"!="                  return '!='
"=="                  return '=='
">="                  return '>='
">"                   return '>'
"<="                  return '<='
"<"                   return '<'
"?"                   return '?'
':'                   return ':'
"&&"                  return '&&'
'||'                  return '||'
"^"                   return '^'
"!"                   return '!'
"("                   return '('
")"                   return ')'
"["                   return '['
"]"                   return ']'
"{"                   return '{'
"}"                   return '}'
";"                   return ';'
","                   return ','
'void'                return 'void'
"abstract"            return 'abstract'
"boolean"             return 'boolean'
"break"               return 'break'
"case"                return 'case'
"catch"               return 'catch'
"char"                return 'char'
"class"               return 'class'
"continue"            return 'continue'
"default"             return 'default'
"do"                  return 'do'
"double"              return 'double'
"else"                return 'else'
"extends"             return 'extends'
"final"               return 'final'
"for"                 return 'for'
"graph"           return 'graph'
"if"                  return 'if'
"import"              return 'import'
"instanceof"          return 'instanceof'
"int"                 return 'int'
"message"             return 'message'
"Object"              return 'Object'
"pow"                 return 'pow'
"println"             return 'println'
"private"             return 'private'
"protected"           return 'protected'
"public"              return 'public'
"return"              return 'return'
"read_console"        return 'read_console'
"read_file"           return 'read_file'
"static"              return 'static'
"str"                 return 'str'
"String"              return 'String'
"super"               return 'super'
"switch"              return 'switch'
"this"                return 'this'
"toChar"              return 'toChar'
"toDouble"            return 'toDouble'
"toInt"               return 'toInt'
"try"                 return 'try'
"while"               return 'while'
"write_file"          return 'write_file'
"int"                 return 'int'
"double"              return 'double'
"char"                return 'char'
"boolean"             return 'boolean'
"String"              return 'String'
[A-Za-z_0-9]+         return 'ID'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/*logic operator associations and precedence */
%left  '||'
%left  '&&'
%right '!'
%left  '<' '>' '<=' '>=' '!=' '=='  '++' '--' '?'
/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%right '%'
%left UMINUS

%error-verbose
%start INICIO

%% /* language grammar */

INICIO : LISTA_INSTRUCCIONES EOF { /*console.log("AST: %j", $LISTA_INSTRUCCIONES);*/  return $1; } ;

LISTA_INSTRUCCIONES : LISTA_INSTRUCCIONES INSTRUCCION { $1.push($2); $$=$1; }
  | INSTRUCCION { $$=[$1]; };

INSTRUCCION : class_declaration { $$ = $1; }
    | INSTRUCCION_IF_SUP { $$ = $1; }
    | EXP ';' 
    | field_declaration 
    | method_declaration 
    | 'println' '(' EXP ')' ';' { $$ = new Print($3); }
    | 'return' EXP ';' { $$ = new Return($2); };

class_declaration : modifiers 'class' ID '{' LISTA_INSTRUCCIONES '}' { $$ = new Clase($1,$3,null,$5); }
    | 'class' ID '{' LISTA_INSTRUCCIONES '}' { $$ = new Clase(null,$2,null,$4); }
    | modifiers 'class' ID 'extends' ID '{' LISTA_INSTRUCCIONES '}' { $$ = new Clase($1,$3,$5,$7); }
    | 'class' ID 'extends' ID '{' LISTA_INSTRUCCIONES '}' { $$ = new Clase(null,$2,$4,$6); } ;

field_declaration : result variable_declarators ';' ;

variable_declarators : variable_declarators ',' variable_declarator { $1.push($3); $$=$1; }
| variable_declarator { $$=[$1]; };

variable_declarator : variable_declarator_id '=' variable_initializer 
| variable_declarator_id ;

variable_declarator_id : variable_declarator_id '[' ']'
    | ID ;

variable_initializer : EXP 
    | array_initializer ;

method_declaration :  result method_declarator ID '(' formal_parameters ')' '{' LISTA_INSTRUCCIONES '}'
    |  result method_declarator ID '(' formal_parameters ')'  ';'
    |  result ID '(' formal_parameters ')' '{' LISTA_INSTRUCCIONES '}'
    |  result ID '(' formal_parameters ')'  ';' ;

method_declarator : method_declarator '[' ']'
    | '[' ']' ;

formal_parameters : formal_parameters ',' formal_parameter 
    | formal_parameter ;

formal_parameter : 'final' TIPO variable_declarator_id 
    | TIPO variable_declarator_id ;

result : modifiers TIPO 
    | modifiers 'void' ;

LISTA_ID : LISTA_ID ',' ID { $1.push($3); $$=$1; } 
    | ID { $$=[$1]; };

modifiers : modifiers modifier { $1.push($2); $$=$1; } 
    | modifier { $$=[$1]; };

 modifier : 'public' { $$ = $1; } 
    | 'protected'       { $$ = $1; } 
    | 'private'         { $$ = $1; } 
    | 'abstract'        { $$ = $1; } 
    | 'static'          { $$ = $1; } 
    | 'final'           { $$ = $1; } ;


EXP : EXP '+' EXP           { $$ = new Operacion($1,$3,'+',null,null); }
    | EXP '-' EXP           { $$ = new Operacion($1,$3,'-',null,null); }
    | EXP '*' EXP           { $$ = new Operacion($1,$3,'*',null,null); }
    | EXP '/' EXP           { $$ = new Operacion($1,$3,'/',null,null); }
    | '-' EXP %prec UMINUS  { $$ = new Operacion(null,$2,'uminus',null,null); }  
    | '(' EXP ')'           { $$ = $2;}
    | NUMBER                { $$ = new Operacion(null,null,'numero',Number(yytext),"Int"); }
    | CADENA                { $$ = new Operacion(null,null,'cadena',yytext.substring(1,yytext.length-1),"String"); }
    | CARACTER              { $$ = new Operacion(null,null,'caracter',yytext.substring(1,yytext.length-1),"char"); }
    | ID                    { $$ = new Operacion(null,null,'id',yytext,"String"); }
    | EXP '>' EXP           { $$ = new Operacion($1,$3,'>',null,null); }
    | EXP '<' EXP           { $$ = new Operacion($1,$3,'<',null,null); }
    | EXP '<=' EXP          { $$ = new Operacion($1,$3,'<=',null,null); }
    | EXP '>=' EXP          { $$ = new Operacion($1,$3,'>=',null,null); }
    | EXP '!=' EXP          { $$ = new Operacion($1,$3,'!=',null,null); }
    | EXP '==' EXP          { $$ = new Operacion($1,$3,'==',null,null); }
    | '!' EXP %prec '!'     { $$ = new Operacion(null,$2,'!',null,null); }
    | EXP '||' EXP          { $$ = new Operacion($1,$3,'||',null,null); }              
    | EXP '&&' EXP          { $$ = new Operacion($1,$3,'&&',null,null); }     
    | EXP '^' EXP           { $$ = new Operacion($1,$3,'^',null,null); }
    | EXP '?' EXP ':' EXP   { $$ = new If($1,new Return($3),null,new Return($5),true,false); }
    | NUMBER '++'           { $$ = new Operacion(null,$1,'++',null,null); }        
    | '++' NUMBER           { $$ = new Operacion(null,$2,'++',null,null); }         
    | NUMBER '--'           { $$ = new Operacion(null,$1,'--',null,null); }        
    | '--' NUMBER           { $$ = new Operacion(null,$2,'--',null,null); }         
    | 'true'                      
    | 'false'                          
    | ID '(' EXPRESIONES ')' { $$=new LlamadaF($1,$3); }
    | ID '(' ')'             { $$=new LlamadaF($1,[]); }
    | ID "[" EXPRESIONES ']' { $$=new AccesoArreglo($1,$3); }
    | 'null'                 { $$=new Null();  }
    | ID '.' ID              { $$=new AccesoObjeto($1,$3); }
    | ID 'instanceof' ID;

    
TIPO : 'int'    { $$ = $1; }
    | 'double'  { $$ = $1; }
    | 'char'    { $$ = $1; }
    | 'boolean' { $$ = $1; }
    | 'String'  { $$ = $1; };

INSTRUCCION_IF_SUP : INSTRUCCION_IF { $$ = new If($1[0],$1[1],null,null,false,false); }
 | INSTRUCCION_IF LISTA_ELSE_IF { $$ = new If($1[0],$1[1],$2,null,false,true); }
 | INSTRUCCION_IF LISTA_ELSE_IF INSTRUCCION_ELSE { $$ = new If($1[0],$1[1],$2,$3,true,true);  }
 | INSTRUCCION_IF INSTRUCCION_ELSE { $$ = new If($1[0],$1[1],null,$2,true,false); } ;

INSTRUCCION_IF : 'if' "(" EXP ')' '{' LISTA_INSTRUCCIONES '}' { $$ = [$3,$6]; } ;

LISTA_ELSE_IF : LISTA_ELSE_IF INSTRUCCION_ELSE_IF { $1.push($2); $$=$1; }
 | INSTRUCCION_ELSE_IF {  $$=[$1]; } ;

INSTRUCCION_ELSE_IF : 'else' 'if' '(' EXP ')' '{' LISTA_INSTRUCCIONES '}' { $$ = [$4,$7]; } ;

INSTRUCCION_ELSE : 'else' '{' LISTA_INSTRUCCIONES '}' { $$ = $3; } ;

EXPRESIONES : EXPRESIONES ',' EXP { $1.push($2); $$=$1; }
 | EXP { $$=[$1]; };

%%

//const Operacion = require('./Operacion');
//const Clase = require('./Clase');
//const If = require('./If');
//const Print = require('./Print');
//const Return = require('./Return');