require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const MovieUserModal = require("./models/movieappusers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//movie_user
//movie_user_password
//moviereviewer@gmail.com
//k@6374715392

// connect to mongo db
// schema -> model -> get,save,delete
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());

const mongoConnectionUrl =
  "mongodb+srv://movie_user:movie_user_password@cluster0.aitz3.mongodb.net/users?retryWrites=true&w=majority";

mongoose
  .connect(mongoConnectionUrl)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`${PORT} is running and mongongodb connection established`);
    })
  )
  .catch((e) => console.log("connectvity error"));

app.post("/AppLogin", (req, res) => {
  MovieUserModal.find({ emailId: req.body.emailId }).then(async (results) => {
    if (results.length > 0) {
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        results[0].password
      );
      if (passwordMatch) {
        const emailId = req.body.emailId;

        const user = {
          emailId,
        };

        const accesstoken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        res
          .json({ accesstoken, message: "login successfull", results })
          .status(200);
      } else res.status(400).send("login un successfull");
    } else res.status(400).send("login un successfull");
  });
});

app.post("/AppSignUp", async (req, res) => {
  try {
    MovieUserModal.find({ emailId: req.body.emailId }).then(async (results) => {
      if (results.length === 0) {
        const password = await codeThePassword(req.body.password);
        const saveData = new MovieUserModal({
          firstName: req.body.firstName,
          LastName: req.body.LastName,
          emailId: req.body.emailId,
          password: password,
          favouriteMovies: req.body.favouriteMovies,
        });
        saveData
          .save()
          .then(() => res.status(200).send("signup completed"))
          .catch((e) => {
            res.status(400).send(e);
          });
      } else res.status(400).send("user already exists");
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/showFavoritiesMovies", authenticateToken, (req, res) => {
 if( req.user){ 
   console.log('inside if before modal');
   MovieUserModal.find({ emailId: req.user.emailId }).then((result) => {
    res
      .json({
        message: " Authenticated successfully",
        favouriteMovies: result[0].favouriteMovies
        
      })
      .status(200);
  });}
});

app.post("/addFavorities", authenticateToken, (req, res) => {
  if( req.user){
    MovieUserModal.find({ emailId: req.user.emailId }).then((result) => {
    let ispresent = false;
    (function findfav() {
      result[0].favouriteMovies.forEach(element => {
        if(element.title === req.body.favouriteMovies.title )
        {
          ispresent = true;
        }
      });
    })()
    if(!ispresent)
    {
    MovieUserModal.updateOne(
      { emailId: req.user.emailId },
      { $push: { favouriteMovies: req.body.favouriteMovies } }
    ).exec();

    res
      .json({
        message: " Authorized successfully"
      })
      .status(200);
    }
    else
    {
      res
      .json({
        message: " item already added to favorities"
      })
      .status(403);
    }
  
  });
   
}
});

app.post("/removeFavorities", authenticateToken, (req, res) => {
  MovieUserModal.updateOne(
    { emailId: req.user.emailId },
    { $pull: { favouriteMovies: req.body.favouriteMovies} }
  ).exec();

  if( req.user){ MovieUserModal.find({ emailId: req.user.emailId }).then((result) => {
    res
      .json({
        message: " Authenticated successfully",
        favouriteMovies: result[0].favouriteMovies
        
      })
      .status(200);
  });}

});

const codeThePassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const cryptedpassword = await bcrypt.hash(password, salt);
  return cryptedpassword;
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    res.status(401); // no valid token
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403);
    } //no access
    req.user = user;
    next(); //we will move from middle ware
  });
}
