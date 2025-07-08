const jwt = require("jwt-simple");
const User = require("../models/user");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

const secret = "supersecret";


router.post("/user",async function(req,res){
    if(!req.body.username || !req.body.passowrd){
        res.status(400).json(
        {error:"missing username and/or password"}
        );
        return;
    }
    const hash = bcrypt.hashSync(req.body.passowrd,10);
    const newuser = new User({
        name:req.body.username,
        passowrd:hash,
        status: req.body.status
    });
    try{
        await newuser.save();
        res.sendStatus(201);
        
    }
    catch(ex){
        res.status(400).send(ex.message);
    }
});
router.post("/auth", async function(req,res){
    if(!req.body.username || !req.body.password){
        res.status(401).json({
            error:"Missing username and/or password"
        });
        return;
    }
    try {
        const user= await User.findOne({
             name:req.body.username

        });
        if(!user){
            res.status(401).json({
                error: "Bad username"
            });
        }
        else{
            if(bcrypt.compareSync(req.body.passowrd,user.passowrd)){
                const token = jwt.encode({
                    username:user.name
                },secret);
                res.json({token:token});
            }
            else{
                res.status(401).json({
                    error:"Bad Password"
                })
            }
        }
    }
    catch (ex){
        res.status(400).send(ex.message);
    }
},
router.get("/status",async function(req,res){
        if(!req.headers["x-auth"]){
            return res.status(401).json(
                {error:"Missing X-Auth header"}
            );
        }
        try{
         const token=req.headers["x-auth"];
         const decoded = jwt.decode(token,secret);
         
         const users = await User.find({},
            "username status"
         );
         res.json(users);
        }
        catch(ex){
            res.status(401).json(
                {error:ex.message}
            );
        }
    })





);
module.exports = router;
