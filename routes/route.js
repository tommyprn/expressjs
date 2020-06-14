const express = require ('express');
const route = express.Router();
const {
  read: findUsers,
  readOne: findUser,
  delete: destroyUser
} = require("../controllers/user");
const { 
  register, 
  login 
} = require("../controllers/authentication");
const { 
  auth :auth, 
  admin: admin
} = require("../middleware/auth");
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
const {
  read: findTransactions,
  create: createTransactions,    
  update: patchTransaction,
  delete: destroyTransaction
}= require("../controllers/Transaction");
const { upload } = require ('../middleware/upload');
  
//============================================================

  // User Routes
  route.get("/users", findUsers);
  route.get("/user/:id", auth, admin, findUser); //PRIVATE
  route.delete("/user/:id", auth, admin, destroyUser);
  
  // Authentication Routes
  route.post("/register", register);
  route.post("/login", login);

  //Film route
  route.get("/films", findFilms);
  route.post("/films", auth, admin, createFilm);
  route.get("/film/:id", findFilm);
  route.patch("/film/:id", auth, admin, patchFilm);
  route.delete("/film/:id", auth, admin, destroyFilm);

  //Categories route
  route.get("/category", findCategories);
  route.post("/category", auth, admin, createCategories);
  route.patch("/category/:id", auth, admin, patchCategory);
  route.delete("/category/:id", auth, admin, destroyCategory);

  //Episodes route
  route.get("/film/:id/episodes", findEpisodes);
  route.post("/episodes", auth, admin, createEpisodes);
  route.get("/film/:filmId/episode/:episodeId", findEpisode);
  route.patch("/episode/:id", auth, admin, patchEpisode);
  route.delete("/episode/:id", auth, admin, destroyEpisode);

  //Transaction route
  route.get("/transaction", auth, admin, findTransactions);
  route.post("/transaction", auth, admin, upload, createTransactions);
  route.patch("/transaction/:id", auth, admin, patchTransaction);
  route.delete("/transaction/:id", auth, admin, destroyTransaction);

  module.exports = route;