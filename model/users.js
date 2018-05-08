
var mysql = require('mysql');
var bodyParser = require('body-parser')
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'ufa_db'
  

});


function adduser(password,req,error,success){	
	pool.getConnection(function(err, connection) {
    if (err)	throw err;   		
	
	connection.query('INSERT INTO ufa_user(username, email, password, phone, role ,machine) VALUES (?, ?, ?, ?, ?, ?)'
		,[req.body['username'],req.body['email'],req.body['password'],req.body['phone'],req.body['role'],req.body['machine'],new Date()]
		, function(err, result) {
		     connection.release();
        if(err){
            error(err);
          }
          else{
            //console.log(result);
            success(result);
          }
     });
    //connection.end();
  });

}

function getalluser(error,success){
	pool.getConnection(function(err, connection) {
    if (err)	throw err;   
	else
	    {
		
			connection.query('SELECT  * FROM ufa_user '
		    	, function(err, result) {		     
		    		connection.release();
		        if (err) console.log(err);
		        else
		        {
		        	
		        	success(result);
		        }
		    });
		}
	});
}

function login(req, error, success){
    pool.getConnection(function(err, connection) {
    if (err)	throw err;   
	else
	    {
		    connection.query('SELECT * FROM ufa_user WHERE username = ?'
		    	,[req.body["username"]]
		    	, function(err, result) {
		    		connection.release();
		        if(err){
		            error(err);
		         }
				else
		        {		        	
		        	success(result);
		        }
		    });
		}
	});
}

function editpass(key3, id ,req, error, success){	
    pool.getConnection(function(err, connection) {
	  	if (err)	throw err;   
		else
		    {
		    connection.query('UPDATE GO_users_backend SET password = ? WHERE id = ?'
		    	,[key3,id]
		    	, function(err, result) {
		    		connection.release();
		        if(err){
		            error(err);
		         }
				else
		        {		        	
		        	success(result);
		        }
		    });
		}
	});
}

function getuserbyid(req, error, success){
	 pool.getConnection(function(err, connection) {
	  	if (err)	throw err;   
		else
		    {
		    connection.query('SELECT * FROM GO_users_backend WHERE id = ?'
		    	,[req.body["id"]]
		    	, function(err, result) {
		        connection.release();
		        if(err){
		            error(err);
		         }
				else
		        {		        	
		        	success(result);
		        }
		    });
		}
	});
}

function edituser(req,error,success){
	 pool.getConnection(function(err, connection) {
	  	if (err)	throw err;   
		else
		    {
		     connection.query('UPDATE ufa_user SET username = ?, role = ?, phone = ?, machine = ? , email = ? WHERE id = ?'
		    	,[req.body["username"],req.body["role"],req.body["phone"],req.body["machine"],req.body["email"],req.body["id"]]
		    	, function(err, result) {
		        if (err) error(err);
		        connection.release();
		        if(err){
		            error(err);
		         }
				else
		        {		        	
		        	success(result);
		        }
		    });
		}
	});
}

function getuserbyidpage(token,req, error, success){
	//console.log(token+"++++++++++++++");
	 pool.getConnection(function(err, connection) {
	  	if (err)	throw err;   
		else
		    {

		    connection.query('SELECT * FROM ufa_user WHERE id = ?'
		    	,[token]
		    	, function(err, result) {
		        connection.release();
		        if(err){
		            error(err);
		         }
				else
		        {		        	
		        	success(result);
		        }
		    });
		}
	});
}

function addBanner(values, error, success){
    pool.getConnection(function(err, connection) {
	  	if (err)	throw err;   
		else{
	        console.log(values);
	        console.log(typeof values[0]);
	        connection.query("INSERT INTO GO_banner (b_type,b_resource,b_id) VALUES (?,?,?)"
	         ,values
	         , function(err, result) {
			    connection.release();
			    if(err){
			         error(err);
			    }
				else{	
			        console.log(result)	        	
			        	success(result);
			    }
	        });
    	}
	});
    
}

function removeBanner(id, error, success){
    pool.getConnection(function(err, connection) {
	  	if (err)	throw err;   
		else{
        	connection.query("DELETE FROM GO_banner WHERE id = ?"
        		, [id]
        		, function(err, result){
	            connection.release();
				if(err){
				         error(err);
				}
				else{	
				        console.log(result)	        	
				       success(result);
				}
        	});
    	}
    });
}

function getUserfogotpassword(req, error, success){
	 pool.getConnection(function(err, connection) {
	  	if (err)	throw err;   
		else
		    {
		    connection.query('SELECT email,id FROM GO_users_backend WHERE email = ?'
		    	,[req.body["email"]]
		    	, function(err, result) {
		        connection.release();
		        if(err){
		            error(err);
		         }
				else
		        {	
		        console.log(result)	        	
		        	success(result);
		        }
		    });
		}
	});
}

function changeUserfogotpassword(key3,req,error,success){
	//console.log(req.body["pass1"])
	//console.log(req.body["id"])
	 pool.getConnection(function(err, connection) {
	  	if (err)	throw err;   
		else
		    {
		     connection.query('UPDATE GO_users_backend SET password = ? WHERE id = ?'
		    	,[key3,req.body["id"]]
		    	, function(err, result) {
		        if (err) error(err);
		        connection.release();
		        if(err){
		            error(err);
		         }
				else
		        {		        	
		        	success(result);
		        }
		    });
		}
	});
}

module.exports = {
	Adduser : adduser,	
	Getalluser : getalluser,	
	Login : login,
	Editpass : editpass,
	Getuserbyid : getuserbyid,
	Edituser : edituser,
	Getuserbyidpage : getuserbyidpage,
	AddBanner : addBanner,
	RemoveBanner : removeBanner,
	GetUserfogotpassword : getUserfogotpassword,
	ChangeUserfogotpassword : changeUserfogotpassword
}