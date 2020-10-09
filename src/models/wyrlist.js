const mongoose = require("mongoose");

const WyrScheme = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Question: String,
    UserID : String,
    UserName: String,
    Reaction1: String,
    Reaction2: String,
    Embed: Boolean,
    Identifier: String
    
    
    
});
console.log("Wyr Scheme found!")

module.exports = mongoose.model("Wyr", WyrScheme);