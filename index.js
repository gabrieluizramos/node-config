// requires
var express = require( 'express' );
var app = express();
var fs = require( 'fs' );

// data sources
var datasources = require( './config/datasources' );

// servidor
app.listen( datasources.app.port , function(){
	console.log( 'Servidor rodando' );
});

// rotas gerais
app.get( '*' , function( req , res ){
  // paginas gerais
  var page = ( req.path == '/' ) ? 'index' : req.path;
  page = datasources.views.root + page + '.html';
  page = page.replace( '//' , '/' );
  page = __dirname + page;
  // indica no console o caminho da pagina requisitada
  console.log( 'pagina requisitada: '+page );
  // renderiza pagina para o usuario
  fs.exists( page , function( exists ){
  	if ( exists ) {
  		res.sendFile( page );
  	}
  	else{
  		page = page.split( '/' );
  		page[ page.length - 1 ] = '404.html';
  		page = page.join( '/' );
  		res.sendFile( page );
  	}
  }); 
}); 

app.post( '/cadastro/cadastrar' , function( req , res ){
	var banco = require( './config/banco.js' );
	console.log( banco.database );
	res.end();
});

// http://mongoosejs.com/docs/index.html
// http://nodebr.com/nodejs-e-mongodb-introducao-ao-mongoose/
// http://udgwebdev.com/um-pouco-de-node-js-e-mongodb-na-pratica