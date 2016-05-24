var datasources = {
	app : {
		port : 3000
	} ,
	routes : {
		root : '/' , 
		sobre : '/sobre',
		consulta : '/consulta' ,
	} ,
	views : {
		root : '/views/' , 
		error : '404.html' ,
		index : 'index.html' ,
		sobre : 'sobre.html' , 
	} ,
	database : {
		ip : 'mongodb://localhost:3000' ,
	} ,
}


module.exports = datasources;