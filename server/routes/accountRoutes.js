const express = require('express');
const mysql = require('mysql');
const dbmysql = require('../models/dbmysql');

const router = express.Router();
// mysql setup
const connection = mysql.createConnection({
  host: dbmysql.host,
  user: dbmysql.user,
  password: dbmysql.password,
  database: dbmysql.database,
  port: dbmysql.port,
});
connection.connect(err => {
  if (err) throw err;
  console.log('connected to sql db');
})

// verify login form credentials
router.post('/login', function (req,res) {
  var response = {
    "account":req.body.account,
    "password":req.body.password,
  };
  var selectSQL = "select username,password from AccountTable where username = '"+req.body.account+"' and password = '"+req.body.password+"'";
  var  addSqlParams = [req.body.account,req.body.password];
  connection.query(selectSQL,function (err, result) {
    
    // display login failed feedback (user/pass incorrect)
    if(err){
      console.log('login failed');
      res.end(JSON.stringify({ success: false }));
      return;
    }
    if(result==''){
      console.log('login failed');
      res.end(JSON.stringify({ success: false }));
      return;
    }

    // send to lobby page
    else{
      console.log('login success');
      res.end(JSON.stringify({ success: true }));
      return;
    }
  });

  console.log(response);
});

//注册模块
var  addSql = 'INSERT INTO AccountTable(username,password) VALUES(?,?)';
 
router.post('/process_get', function (req, res) {

  if(req.body.account.trim() !=="" && req.body.password.trim() != ""){

  }else{
      // res.sendFile( __dirname + "/" + "RegisterFault.html");     // 发送注册失败页�?
      console.log('registration failed');
      res.end(JSON.stringify({ success: false }));
      return;
  }

  // 输出 JSON 格式
  var response = {
    "account":req.body.account,
    "password":req.body.password,
  };
  var  addSqlParams = [req.body.account,req.body.password];
  connection.query(addSql,addSqlParams,function (err, result) {
    if(err){  
      console.log('[INSERT ERROR] - ',err.message);
      // res.sendFile( __dirname + "/" + "RegisterFault.html");          // 注册失败
      res.end(JSON.stringify({ success: false }));
      return ;
    }
    // res.sendFile( __dirname + "/" + "RegisterSuccess.html");       // 注册成功
    res.end(JSON.stringify({ success: true }));
    console.log('registration success');
});

   console.log(response);
});


module.exports = router;


