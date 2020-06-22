const express = require("express");
const route = express.Router();

const {
  read: findUsers,
  readOne: findUser,
  delete: destroyUser,
} = require("../controllers/user");
const { register, login } = require("../controllers/authentication");
const { auth: auth, admin: admin } = require("../middleware/auth");
const {
  read: findFilms,
  create: createFilm,
  readOne: findFilm,
  update: patchFilm,
  delete: destroyFilm,
} = require("../controllers/film");
const {
  read: findCategories,
  create: createCategories,
  update: patchCategory,
  delete: destroyCategory,
} = require("../controllers/category");
const {
  read: findEpisodes,
  readOne: findEpisode,
  create: createEpisodes,
  update: patchEpisode,
  delete: destroyEpisode,
} = require("../controllers/episode");
const {
  read: findTransactions,
  create: createTransactions,
  update: patchTransaction,
  delete: destroyTransaction,
} = require("../controllers/Transaction");
const { upload } = require("../middleware/upload");

//============================================================

// User Routes
route.get("/users", auth, admin, findUsers);
route.get("/user/:id", findUser); //PRIVATE
route.delete("/user/:id", auth, admin, destroyUser); //PRIVATE

// Authentication Routes
route.post("/register", register);
route.post("/login", login);

//Film route
route.get("/films", findFilms);
route.post("/films", auth, admin, createFilm); //PRIVATE
route.get("/film/:id", findFilm);
route.patch("/film/:id", auth, admin, patchFilm); //PRIVATE
route.delete("/film/:id", auth, admin, destroyFilm); //PRIVATE

//Categories route
route.get("/category", findCategories);
route.post("/category", auth, admin, createCategories); //PRIVATE
route.patch("/category/:id", auth, admin, patchCategory); //PRIVATE
route.delete("/category/:id", auth, admin, destroyCategory); //PRIVATE

//Episodes route
route.get("/film/:id/episodes", findEpisodes);
route.post("/episodes", createEpisodes); //PRIVATE
route.get("/film/:filmId/episode/:episodeId", findEpisode);
route.patch("/episode/:id", auth, admin, patchEpisode); //PRIVATE
route.delete("/episode/:id", auth, admin, destroyEpisode); //PRIVATE

//Transaction route
route.get("/transaction", findTransactions); //PRIVATE
route.post("/transaction", auth, upload, createTransactions);
route.patch("/transaction/:id", auth, admin, patchTransaction); //PRIVATE
route.delete("/transaction/:id", auth, admin, destroyTransaction); //PRIVATE

module.exports = route;
