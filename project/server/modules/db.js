var mysql=require("mysql")

module.exports=function(){

	var option = {
		host:"127.0.0.1",
		user:"root",
		password:"root",
		database:"shop",
		port:"3306"
	}

	mysql.createConnection(option).connect(function(err){
		console.log(err)
	})

	return mysql.createConnection(option)

}