//jshint esversion: 6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res) {
  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let email = req.body.email;

  let data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  let jsonData = JSON.stringify(data);

  let option = {
    url: "https://us4.api.mailchimp.com/3.0/lists/a29078179d",
    method: "POST",
    headers: {
      "Authorization": "chris1 0c5a8640643b4250b5a85f9196955bfd-us4"
    },
    body: jsonData
  };

  request(option, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");

    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");

});
