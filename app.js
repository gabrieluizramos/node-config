// requires
var express     =     require( 'express' ) ,
    bodyParser  =     require( 'body-parser' ) ,
    fs          =     require( 'fs' ) ,
    load        =     require( 'express-load' ) ,
    app         =     express() ,
    cluster     =     require( 'cluster' ) ,
    cpus        =     require( 'os' ).cpus().length;

if ( cluster.isMaster ) {
  for (var i = 0; i < cpus; i++) {
    cluster.fork();
  }
}
else{
  // sets / uses
  app.set( 'views' , __dirname + '/views/' );
  app.set( 'view engine' , 'ejs' );
  // pegar dados form
  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded( { extended : true } ) );
  // loads
  load( 'controllers' )
  .then( 'routes' )
  .into( app );
  
  // data sources
  var datasources = require( './config/datasources' );
  // callback ( msg + tipo )
  var callback = require( './config/callbacks' );
  // servidor
  app.listen( datasources.app.port , datasources.app.ip );
  
  setInterval( function(){ console.log( 'aplicação rodando na porta '+ datasources.app.port + ' | CPUS: '+ cpus +' | processo PID: '+ process.pid) } , 10000 );
}


















// rotas gerais
/*app.get( '*' , function( req , res ){
  // paginas gerais
  var page = ( req.path == '/' ) ? 'index' : req.path;
  page = datasources.views.root + page + '.ejs';
  page = page.replace( '//' , '/' );
  page = __dirname + page;
  // indica no console o caminho da pagina requisitada
  console.log( 'pagina requisitada: '+page );
  // renderiza pagina para o usuario
  fs.exists( page , function( exists ){
  	if ( exists ) {
  		res.render( page );
  	}
  	else{
  		page = page.split( '/' );
  		page[ page.length - 1 ] = '404.ejs';
  		page = page.join( '/' );
  		res.render( page );
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
*/
// http://mongoosejs.com/docs/index.html
// http://nodebr.com/nodejs-e-mongodb-introducao-ao-mongoose/
// http://udgwebdev.com/um-pouco-de-node-js-e-mongodb-na-pratica