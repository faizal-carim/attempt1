const sequelize = require("../util/database");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        if(!user)
            return res.status(400).json({ 'message': "Invalid email or password"});        

        const result = bcrypt.compareSync(password, user.password);
        
        if(result){
            user.password = undefined;
            const jsonToken = jwt.sign({user},process.env.KEY, {
                expiresIn : "1h"
            });
            return res.status(200).json({
                success:1,
                message:"Login successful",
                userId:user.id,
                token:jsonToken
            });  
        }else{
            return res.status(400).json({
                success:0,
                message:"Invalid email or password"
            }); 
        }
    }catch(err){
        return res.status(500).json({ 'message': err.message });
    }
}

module.exports = { login };