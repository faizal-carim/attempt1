const sequelize = require("../util/database");
const User = require("../models/user");
const Schedule = require("../models/schedule");

const getAllUsersSchedules = async (req, res) => {
    try{
        let users = await User.findAll({
            attributes:{exclude: ['password']},
            include: Schedule
        });
        
        return res.status(201).json(users);    
    }catch(err){
        return res.status(500).json({ 'message': err.message });
    }
}

module.exports = { getAllUsersSchedules};