const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Name: { type: String },
    Colour: { type: String }
},
    {
        timestamps: true
    });


const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;