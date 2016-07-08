module.exports = function() {
	return {
		index : function( req , res ) {
			var data = {
				titulo : 'home do site teste' ,
				variavel : 'kbr'
			};
			res.render( 'index' , data );
		}
	};
};