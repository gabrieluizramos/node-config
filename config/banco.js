var datasources = require( './config/datasources' );
var banco = {
	database : datasources.database.ip ,
	init: function(){
		console.log('funcao init');
	} ,
}
module.exports = banco;