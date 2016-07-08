var datasources = {
	app : {
		port : process.env.PORT  || 3000 ,
		ip : process.env.IP
	} ,
	database : {
		ip : 'mongodb://127.0.0.1:27017' || 'mongodb://localhost:3000' ,
	} ,
}


module.exports = datasources;