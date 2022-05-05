const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const { options } = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

   const data = {
       members: [
        {
            email_adress: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,

            }
       }
    ]
   };

  const jsonData = JSON.stringify(data);

  const url = "https://us11.api.mailchimp.com/3.0/lists/55dab43485";

   const options = {
       method: "POST",
       auth: "hrihi1:c7d6519d19665d1c141c7057afe716c4-us11"

   }




  const request = https.request(url,options, function(response){
    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
})
     request.write(jsonData);
     request.end();
});

app.listen(3000,function(){
    console.log("server started at port 3000");
});







//API key
//c7d6519d19665d1c141c7057afe716c4-us11
//List id / Audience id
//55dab43485