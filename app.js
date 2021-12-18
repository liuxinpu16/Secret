//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/userDB');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const userSchema = {
  email:String,
  password:String
};

const User = mongoose.model('User',userSchema);

app.get('/',function(req,res){
  res.render('home')
});

app.get('/login',function(req,res){
  res.render('login')
});

app.get('/register',function(req,res){
  res.render('register')
});

app.post('/register',function(req,res){
  const newUser = new User ({
    email:req.body.username,
    password:req.body.password
  })
  newUser.save(function(err){
    if(err){
    console.log(err);;
    }else{
      res.render('secrets')
    }
  });
})

app.post('/login',function(req,res){
  const username = req.body.username;
  const userpassw = req.body.password
  User.find({email:req.body.username}, function(err,founduser){
    if(err){
      console.log(err);
    }else{
      if(founduser){
        if(userpassw == founduser.password){
          res.render('secrets')
        }else{
          console.log('wrong password');
        }
      }
      else{
        console.log('not found user');
      }
    }
  })

})

app.listen(3000, function() {
  console.log("Server started scussefully");
});
