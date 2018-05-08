var user_backend = require('../model/users');
var bodyParser = require('body-parser')
var fs = require('fs');
var https = require('https');
var path = require('path');
var config = require('./../config');


function adduser(req, res){
	var text = JSON.stringify(req.body["password"]);
    buf1 = new Buffer(text);
    var key1 = buf1.toString('hex');
    buf2 = new Buffer(key1);
    var key2 = buf2.toString('hex');
    buf3 = new Buffer(key2);
    var key3 = buf3.toString('BASE64');

    user_backend.Adduser(key3,req,
        function (err){
            console.log(err);
        },
        function (result){
    		console.log(result);
            res.redirect('users/user');
        }); 
}

function getalluser(req, res){
    user_backend.Getalluser(
        function (err){
            console.log(err);
        },
        function (result){
            //console.log(result);
            res.end(JSON.stringify(result));
        });
}

function login(req, res){
    var text = JSON.stringify(req.body['password']);
    buf1 = new Buffer(text);
    var key1 = buf1.toString('hex');
    buf2 = new Buffer(key1);
    var key2 = buf2.toString('hex');
    buf3 = new Buffer(key2);
    var key3 = buf3.toString('BASE64');
    // console.log(key3)
    user_backend.Login(req,
        function (err){
            console.log(err);
        },
        function (result){
            console.log(result)
            if(result=="")
            {
                res.end(JSON.stringify({status:1}));
            }
            else
            {
                // console.log('else')
                // console.log(key3)
                // console.log(result[0].password)
                if(key3.toString()==result[0].password)
                {
                    res.end(JSON.stringify({status:0, username:result[0].id, password:result[0].password}));
                }
                else
                {
                    res.end(JSON.stringify({status:2}));
                }
            }
        });
}

function editpass(req, res){
    var text = JSON.stringify(req.body["newpass"]);
    var isuserid = req.body["id"];
    // console.log(isuserid)
    buf1 = new Buffer(text);
    var key1 = buf1.toString('hex');
    buf2 = new Buffer(key1);
    var key2 = buf2.toString('hex');
    buf3 = new Buffer(key2);
    var key3 = buf3.toString('BASE64');
    //console.log(key3)
    
    user_backend.Editpass(key3, isuserid, req,
        function (err){
            console.log(err);
        },
        function (result){
            res.redirect('/login');
        });
}

function getuserbyid(req, res){
   /* user_backend.Getuserbyid(req,
        function (err){
            console.log(err);
        },
        function (result){
            res.end(JSON.stringify(result));
        });*/
        res.end(JSON.stringify(req));
}

function edituser(req, res){
    user_backend.Edituser(req,
        function (err){
            console.log(err);
        },
        function (result){
            res.redirect('/users/user');
        });
       // res.end(JSON.stringify(req));
}

function getPageData(req, res){
    var token = req.body["token"];
    var filename = req.params["0"];
        // console.log(filename+"==================")
   // console.log(token+ "token");
    
    user_backend.Getuserbyidpage(token, req,
         function (err){
            console.log(err);
        
        },
        function (result){  
        //console.log(result[0])       
            if (result[0].role==0)
             {
                 menu = [
                    {
                        group: [
                                                        
                            {
                                "title": "ผู้ใช้งาน",
                                "symbol" : "fa fa-cogs fa-1x",
                                "url": "/users/user",
                                'id' : 'manu_1'
                            }
                        ],
                        data:[
                        ]
                    },
                    {
                        group : [
                                                        
                            {
                                "title": "สรุปภาพรวม",
                                "symbol" : "fa fa-chart-pie fa-1x",
                                "url": "/dash",
                                'id' : 'manu_2'
                            }
                        ],
                        data:[
                               
                        ]
                    },
                    {
                        group :[
                                                        
                            {
                                "title": "สรุปยอดตามเวลา",
                                "symbol" : "fa fa-calendar-alt fa-1x",
                                "url": "/dashhours",
                                'id' : 'manu_3'
                            }
                        ],
                        data:[
                               
                        ]
                    },
                    {
                        group : [
                            {
                                "title": "จัดการเว็บเอเย่น",
                                "symbol": "fab fa-jenkins fa-1x",
                                "url": "",
                                'id' : 'agent'
                            }
                        ],
                        data:[
                            {
                                "title": "รายการเว็บเอเย่น",
                                "symbol": "",
                                "url": "/agents/agent"
                            },
                            {
                                "title": "รายงานเพิ่ม-ลด เครดิต",
                                "symbol": "",
                                "url": "/agents/agent_rp"
                            }
                        ]
                    },
                    {
                        group : [
                            {
                                "title": "จัดการธนาคาร",
                                "symbol": "fas fa-university fa-1x",
                                "url": "",
                                'id' : 'bank'
                            }
                        ],
                        data:[
                            {
                                "title": "รายการธนาคาร",
                                "symbol": "",
                                "url": "/bank/bank"
                            },
                            {
                                "title": "รายงานฝาก-ถอน เงินสด",
                                "symbol": "",
                                "url": "/bank/bank_rp"
                            }
                        ]
                    },
                    {
                        group : [
                            {
                       
                                "title": "จัดการสมาชิกเว็บ",
                                "symbol": "fa fa-users fa-1x",
                                "url": "",
                                'id' : 'user'
                            }
                        ],
                        data:[
                        {
                                "title": "รายการสมาชิกเว็บ",
                                "symbol": "",
                                "url": "/members/member"
                            },
                            {
                                "title": "ประวัติฝาก-ถอนสมาชิก",
                                "symbol": "",
                                "url": "/members/memhistory"
                            },
                            {
                                "title": "ประวัตการแก้ไขข้อมูล",
                                "symbol": "",
                                "url": "/members/memlog"
                            },
                            {
                                "title": "รายการมิจฉาชีพ",
                                "symbol": "",
                                "url": "/members/crime"
                            }
                        ]
                    },
                    {
                        group : [
                            {
                                "title": "จัดการรายการ ฝาก-ถอน",
                                "symbol": "fa fa-hand-holding-usd fa-1x",
                                "url": "",
                                'id' : 'bank_tranfer'
                            }
                        ],
                        data:[
                            {
                                "title": "เพิ่มรายการ",
                                "symbol": "fa fa-plus fa-1x",
                                "url": "/bank_tr/new"
                            },
                            {
                                "title": "รายการ ฝาก-ถอน",
                                "symbol": "",
                                "url": "/bank_tr/trans"
                            }
                        ]
                    },
                    {
                        group :[
                                                        
                            {
                                "title": "อนุมัต ฝาก-ถอน",
                                "symbol" : "fa fa-handshake fa-1x",
                                "url": "/deposit/uptrans",
                                'id' : 'uptrans'
                            }
                        ],
                        data:[
                               
                        ]
                    }



                    /*,
                    {
                        group: "Notification",
                        data:[
                            {
                                "title": "Updates",//--
                                "symbol": "fa fa-bell fa-1x",
                                //"url": "/updater"
                            }
                        ]
                    }*/
                ];                   
            }
            else if (result[0].role==1)
            {
                 menu = [
                    
                    {
                        group : [
                                                        
                            {
                                "title": "สรุปภาพรวม",
                                "symbol" : "fa fa-chart-pie fa-1x",
                                "url": "/dash",
                                'id' : 'manu_2'
                            }
                        ],
                        data:[
                               
                        ]
                    },
                    {
                        group : [
                            {
                       
                                 "title": "จัดการสมาชิกเว็บ",
                                "symbol": "fa fa-users fa-1x",
                                "url": "",
                                'id' : 'user'
                            }
                        ],
                        data:[
                            {
                                "title": "รายการสมาชิกเว็บ",
                                "symbol": "",
                                "url": "/members/member"
                            }
                        ]
                    },
                    {
                        group : [
                            {
                                 "title": "จัดการรายการ ฝาก-ถอน",
                                "symbol": "fa fa-hand-holding-usd fa-1x",
                                "url": "",
                                'id' : 'bank_tranfer'
                            }
                        ],
                        data:[
                            {
                                 "title": "เพิ่มรายการ",
                                "symbol": "fa fa-plus fa-1x",
                                "url": "/bank_tr/new"
                            },
                            {
                                "title": "รายการ ฝาก-ถอน",
                                "symbol": "",
                                "url": "/bank_tr/trans"
                            }
                        ]
                    },
                    {
                        group :[
                                                        
                            {
                                "title": "อนุมัต ฝาก-ถอน",
                                "symbol" : "fa fa-handshake fa-1x",
                                "url": "/deposit/uptrans",
                                'id' : 'uptrans'
                            }
                        ],
                        data:[
                               
                        ]
                    }
                ];                   
            }
            else{
                menu = [
                    {
                        group : "Main Menu",
                        data:[
                                                        
                            {
                                "title": "",
                                "symbol" : "",
                                "url": ""
                            }
                        ]
                    }
                ];  
            }
                        
            //console.log(menu)
            result.push(menu);                    
            res.end(JSON.stringify(result));  
        });
}

function addBannermain(req, res, folder){
    
    console.log("Check in addDetail");
    var cat = req.body["cat"];
    var token = req.body["token"];
    if(!token){
        res.end("invalid");
        return;
    }
    console.log(cat+"is cat")
    console.log(token+"is token")
    
    switch(cat){
        case "Gallery" :
            
            var newPathFile = "./uploads/banner/" ;
            var oldPathFile = './uploads/banner/';

            if(!fs.existsSync(newPathFile)){
              console.log("don't have floder");
                fs.mkdirSync(newPathFile);
            }
            else {
              console.log("Have floder");
            }
             var id = 1;
            console.log(id+"is id");
            var type = "IMAGE";
   
            console.log(req.file+"req-file");
            console.log(req.file.filename+"filename-name")
            fs.createReadStream(oldPathFile + req.file.filename).pipe(fs.createWriteStream(req.file.filename));
            user_backend.AddBanner([type,req.file.filename,id]
                 ,function (err){
                    console.log("Error 2");
                    res.redirect("/banner#?id=" + id + "&err=['"+err+"']");
                },
                function (result){
                    console.log("ggggggg");

                            res.redirect("/banner#?id=" + id);
                });
                        
            break;
   
           

    }
}
                    
function removeBannermain(req, res){
   
  
    user_backend.RemoveBanner(type, id, 
        function(result){
            res.redirect("/banner#?id="+tid);
        }, function(err){
            res.redirect("/banner#?id="+tid+"&err="+err);
        });
                                   
}

function getUserfogotpassword(req, res){
    user_backend.GetUserfogotpassword(req,
        function (err){
            console.log(err);
        },
        function (result){
            
            //console.log( result[0].email)
            //console.log(req.body["code"]);
            var code = req.body["code"];
            var mailOptions = {
                from: 'ozaclever@gmail.com', // sender address
                to: result[0].email,// list of receivers
                subject: 'code',
                bcc: ['ozaclever@gmail.com'],
                text: code, // plaintext body // Subject line
                //html: 'http://localhost:3000/changepassword?id='+result.ID
            };

            transporter.sendMail(mailOptions, function(error, info){
                  if(error){
                      return console.log(error);
                  }
                  //console.log("sdfdsfsdfsdfsdfsdfsdfsdfs")
                  res.end(JSON.stringify({status:"ok",data:result}));
            });
        });
}

function changeUserfogotpassword(req, res){
    var text = JSON.stringify(req.body["pass1"]);
    var isuserid = req.body["id"];
    //console.log(isuserid)
    buf1 = new Buffer(text);
    var key1 = buf1.toString('hex');
    buf2 = new Buffer(key1);
    var key2 = buf2.toString('hex');
    buf3 = new Buffer(key2);
    var key3 = buf3.toString('BASE64');
    user_backend.ChangeUserfogotpassword(key3,req,
        function (err){
            console.log(err);
        },
        function (result){
            
             res.end(JSON.stringify({status:"ok"}));
            
        });
}                               

               

module.exports = {
    Adduser : adduser,    
    Getalluser : getalluser,    
    Login : login,
    Editpass : editpass,
    Getuserbyid : getuserbyid,
    Edituser : edituser,
    GetPageData : getPageData,
    AddBannermain : addBannermain,
    RemoveBannermain : removeBannermain,
    GetUserfogotpassword : getUserfogotpassword,
    ChangeUserfogotpassword : changeUserfogotpassword
}