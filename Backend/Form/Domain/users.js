const UserModel = require("../Models/user");

class UserDomain{
     //REGISTER
     registeranUser = async function (req, res){
        try{
            console.log(req.body);
            const {Name,Colour} = req.body
            
            
            const user = await UserModel.create({
            Name,Colour});
            
            if(user)
            {
                return res.status(201).json({
                    Name: user.Name,
                    Colour: user.Colour
                });
            }
        } catch(ex) {
            console.log(ex,"errror");
            return res.status(500).send({message: "Error in registering an user"});
           
        }
    }

    //GET ALL USERS

    getUserDetails = async function(req,res)
    {
        console.log("all users");
        UserModel.find((err, data)=>{
            // console.log(data)
            res.send(data);
            res.end();
        });

    }

    //GET AN USER

    getAnUser = async function(req,res)
    {

        let result = await UserModel.findOne({_id: req.params.id});
        if(result)
        {
            res.send(result);
        }
        else{
            res.send("No data found");
        }
    }

//DELETE AN USER

  
deleteUser = async function (req, res){
        const result = await UserModel.deleteOne({_id: req.params.id});
        res.send(result);
        console.log("delete");
        
    }

    //UPDATE AN USER

    updateUser = async function (req, res){
        let result = await UserModel.updateOne({_id:req.params.id},{$set:req.body})
        res.send(result);
        console.log("update user details");
   
    }


}

module.exports = UserDomain;