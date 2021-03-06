var datasources = {
	app : {
		port : process.env.PORT  || 3000 ,
		ip : process.env.IP
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
		ip : 'mongodb://127.0.0.1:27017' || 'mongodb://localhost:3000' ,
	} ,
}


module.exports = datasources;