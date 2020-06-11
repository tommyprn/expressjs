const express = require ('express');
const route = express.Router();
const {
    read: findUsers,
    create: createUser,
    readOne: findUser,
    delete: destroyUser,
  } = require("../controllers/user");
const { 
      register, 
      login 
  } = require("../controllers/authentication");
const { auth } = require("../middleware/auth");
  
  // User Routes
  route.get("/users", findUsers);
  route.post("/users", createUser);
  route.get("/user", auth, findUser); //PRIVATE
  route.delete("/user",destroyUser);
  
  // Authentication Routes
  route.post("/register", register);
  route.post("/login", login);


  module.exports = route;