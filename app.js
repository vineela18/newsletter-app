

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
  res.sendFile(__dirname+"/signup.html");
})

app.post("/", function(req, res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;


  const data = {
    members : [
      {
        email_address : email, //from above value of email.
        status : "subscribed",
        merge_fields : {
          FNAME : firstName,
          LNAME : lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us7.api.mailchimp.com/3.0/lists/xxxxxxxx";

  const options = {
    method : "POST",
    auth : "xxxxxxxxxxxxxxxxxxxxxx"
  }

  const request = https.request(url, options, function(response){

    if(response.statusCode ===200){
      res.sendFile(__dirname+"/success.html");
    }
    else {
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })

  })

  request.write(jsonData);
  request.end();

})

app.post("/failure", function(req, res){
  res.redirect("/");
})



app.listen(process.env.PORT || 3000, function(){
  console.log("server is running at port 3000");
})


// api key
// c2a6b075ab20bebfa1962ad795c5a886-us7

// List id
// 049867f8a8
