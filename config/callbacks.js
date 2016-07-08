exports.retorno = function( paramMsg , returnType ){
	console.log( ( ( returnType  ) ? "Sucesso ao tentar: " : "Falha ao tentar: " ) + paramMsg );
	return returnType;
}