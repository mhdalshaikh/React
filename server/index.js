const express =require("express");
const bodyParser= require("body-parser");
const User = require("./models/user");

const app = express();
const router=express.Router();
router.use(bodyParser.urlencoded({extended:false}));
router.use("/api",require("./api/users"));
app.use(router)

const port= 5000 
app.listen(port, () => {
console.log("✅ Backend running on http://localhost:5000");
});
