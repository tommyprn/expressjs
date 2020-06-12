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
const {
  read: findCategories,
  create: createCategories,    
  update: patchCategory,
  delete: destroyCategory
}= require("../controllers/category");
const {
  read: findEpisodes,
  readOne: findEpisode,
  create: createEpisodes,    
  update: patchEpisode,
  delete: destroyEpisode
}= require("../controllers/episode");
  

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
  route.get("/categories", findCategories);
  route.post("/categories", auth, createCategories);
  route.patch("/category", auth, patchCategory);
  route.delete("/category", auth, destroyCategory);

  //Episodes route
  route.get("/episodes", findEpisodes);
  route.post("/episodes", auth, createEpisodes);
  route.get("/episode", findEpisode);
  route.patch("/episode", auth, patchEpisode);
  route.delete("/episode", auth, destroyEpisode);

  //Transaction route

  module.exports = route;