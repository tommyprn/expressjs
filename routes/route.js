const express = require ('express');
const route = express.Router();
const {
  read: findUsers,
  create: createUser,
  readOne: findUser,
  delete: destroyUser
} = require("../controllers/user");
const { 
  register, 
  login 
} = require("../controllers/authentication");
const { auth } = require("../middleware/auth");
const {
  read: findFilms,
  create: createFilm,    
  readOne: findFilm,
  update: patchFilm,
  delete: destroyFilm
}= require("../controllers/film");
  
  // User Routes
  route.get("/users", findUsers);
  route.post("/users", createUser);
  route.get("/user", auth, findUser); //PRIVATE
  route.delete("/user",destroyUser);
  
  // Authentication Routes
  route.post("/register", register);
  route.post("/login", login);

  //Film route
  route.get("/films", findFilms);
  route.post("/films", auth, createFilm);
  route.get("/film", findFilm);
  route.patch("/film",auth, patchFilm);
  route.delete("/film",auth, destroyFilm);

  //Categories route


  module.exports = route;