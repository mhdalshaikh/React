const dv = require("../../server/db");

const User = db.model("User",{

    name :{type:String,required:true},
    password:{type:String, required:true},
    role:{type:String,required:true}
});

module.exports = User;