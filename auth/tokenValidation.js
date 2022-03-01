const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    loggedIn:(req, res, next) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            jwt.verify(token,process.env.KEY,(err, decoded) =>{
                if(err){
                    return res.status(403).json({ message: "Invalid Token used"}); 
                }else{
                    next();
                }
            })        
        }else{
            return res.status(403).json({ message: "Unauthorised access"}); 
        }
    },
    loggedInAdmin:(req, res, next) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            jwt.verify(token,process.env.KEY,(err, decoded) =>{
                if(err){
                    return res.status(403).json({ message: "Invalid Token used"}); 
                }else{
                    if(decoded.user.role == "ADMIN")
                        next();
                    else
                        return res.status(403).json({ message: "Unauthorised access"}); 
                }
            })        
        }else{
            return res.status(403).json({ message: "Unauthorised access"}); 
        }
    }
}