var express = require("express");
var UserDomain = require("../Domain/users");
var Userrouter = express.Router();

class UserController{
    //Post
    static async registeranUser(req, res) 
    {
        const userDomain = new UserDomain();
        userDomain.registeranUser(req, res);
    }

    //Get
    static async getUserDetails(req, res) 
    {
        const userDomain = new UserDomain();
        userDomain.getUserDetails(req, res);
    }

    //Get particular user
    static async getAnUser(req, res)
    {
        const userDomain = new UserDomain();
        userDomain.getAnUser(req, res);
    }

      //Update
      static async updateUser(req, res)
      {
          const userDomain = new UserDomain();
          userDomain.updateUser(req, res);
      }

      //Delete
      static async deleteUser(req, res)
      {
          const userDomain = new UserDomain();
          userDomain.deleteUser(req, res);
      }




}


Userrouter.post("/user",UserController.registeranUser);
Userrouter.get("/getallusers",UserController.getUserDetails);
Userrouter.get("/getanuser/:id",UserController.getAnUser);
Userrouter.put("/edit/:id",UserController.updateUser);
Userrouter.delete("/deleteuser/:id",UserController.deleteUser);

module.exports = Userrouter;
