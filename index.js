// requires
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var app = express();
var fs = require( 'fs' );

// data sources
var datasources = require( './config/datasources' );
// callback ( msg + tipo )
var callback = require( './config/callbacks' );

// servidor
app.listen( datasources.app.port , datasources.app.ip );
// pegar dados form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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
	var nome = req.body.nome;
	var mongoose = require( 'mongoose' );;
	mongoose.connect( datasources.database.ip );
	var banco = mongoose.connection;
	banco.on( 'error' , function(){ callback.retorno( 'banco' , false ) } );
	banco.on( 'open' , function(){ callback.retorno( 'banco' , true ) } );
	var modeloPessoa = mongoose.Schema({
	  nome : String
	});
	var Pessoa = mongoose.model( 'pessoa' , modeloPessoa );
  var umaPessoa = new Pessoa();
	umaPessoa.nome = nome;
	umaPessoa.save( function( err , pessoas ){
    if ( err ) {
      console.error( err )
    }
    else{
    console.log( pessoas ); 
    }
	});
	Pessoa.find(function(err, data){
        console.log(">>>> " + data );
    });
	banco.close();
});

// http://mongoosejs.com/docs/index.html
// http://nodebr.com/nodejs-e-mongodb-introducao-ao-mongoose/
// http://udgwebdev.com/um-pouco-de-node-js-e-mongodb-na-pratica