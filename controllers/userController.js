const sequelize = require("../util/database");
const User = require("../models/user");
const Schedule = require("../models/schedule");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const updateUser = async (req, res) => {
    const { userId, name, role, email } = req.body;

    if (!userId) 
        return res.status(400).json({ 'message': 'Bad Request' });

    try{
        let user = await User.findByPk(userId);
        if(!user){
            return res.status(500).json({ 'message': 'Invalid User' });
        }else{
            if(name != null)
                user.name = name;
            if(email != null)
                user.email = email;
            if(role != null)
                user.role = role;
            await user.save();
            user.password = undefined;
            return res.status(200).json({ 'success': 'User Updated', user});
        }
    }catch(err){
        return res.status(500).json({ 'message': err.message });
    }
}


const removeUser = async (req, res) => {
    const { userId } = req.body;

    if (!userId) 
        return res.status(400).json({ 'message': 'Bad Request' });

    try{
        let user = await User.findByPk(userId);
        if(!user){
            return res.status(500).json({ 'message': 'Invalid User' });
        }else{
            await user.destroy();
            return res.status(200).json({ 'success': 'User Removed'});
        }
    }catch(err){
        return res.status(500).json({ 'message': err.message });
    }
}

const getUsersInOrderOfTotalShiftLength = async (req, res) => {
    try{
        const { startDate, endDate } = req.body;
        let users = await User.findAll({
            attributes:{exclude: ['password']},
            raw: true
        });

        for (let user of users) {
            if(startDate != null && endDate != null){
                const schedules = await Schedule.findAll({
                    attributes: [[sequelize.fn('sum', sequelize.col('shiftLength')), 'totalHours']],
                    where: {
                        userId: user.id,
                        workDate:{
                            [Op.between]:[startDate, endDate]
                        } 
                    }
                });
                user.totalHours = schedules[0].get('totalHours');
            }else{
                const schedules = await Schedule.findAll({
                    attributes: [[sequelize.fn('sum', sequelize.col('shiftLength')), 'totalHours']],
                    where: {userId: user.id}
                });
                user.totalHours = schedules[0].get('totalHours');
            }
        }
        users.sort(function(a, b) {
            return b.totalHours - a.totalHours;
        });

        return res.status(200).json(users);    
    }catch(err){
        return res.status(500).json({ 'message': err.message });
    }
}

module.exports = { updateUser , removeUser, getUsersInOrderOfTotalShiftLength};