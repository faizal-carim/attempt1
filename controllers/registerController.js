const bcrypt = require('bcrypt');
const sequelize = require("../util/database");
const User = require("../models/user");

const handleNewUser = async (req, res) => {
    const { email, password, name, role } = req.body;
    console.log("coming here");
    if (!email || !password || !name || !role) 
        return res.status(400).json({ 'message': 'Bad Request' });
    
    // check for duplicate email in the db
    try{
        const emailExists = await User.findOne({ where: { email: email } });
        if (emailExists ) {
            return res.status(409).json({ 'message': 'Conflict' }); //Conflict 
        }
    } catch(err){
        return res.status(500).json({ 'message': err.message });
    }

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
        const user = await User.create({name:name,email:email,role:role,password:hashedPwd});
        return res.status(201).json({ 'success': 'New user created','name':user.name}); 
    } catch (err) {
        return res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };