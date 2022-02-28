const sequelize = require("../util/database");
const User = require("../models/user");
const Schedule = require("../models/schedule");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const handleNewSchedule = async (req, res) => {
    const { userId, workDate, shiftLength } = req.body;

    if (!userId || !workDate || !shiftLength) 
        return res.status(400).json({ 'message': 'Bad Request' });
    try{
        const user = await User.findByPk(userId);
        if(!user){
            return res.status(500).json({ 'message': 'Invalid User' });
        }else{
            user.createSchedule({workDate:workDate,shiftLength:shiftLength});
            return res.status(201).json({ 'success': 'New schedule created for user',userId });
        }
    }catch(err){
        return res.status(500).json({ 'message': err.message });
    }
}

const updateSchedule = async (req, res) => {
    const { scheduleId, workDate, shiftLength } = req.body;

    if (!scheduleId || (!workDate && !shiftLength)) 
        return res.status(400).json({ 'message': 'Bad Request' });
    try{
        let schedule = await Schedule.findByPk(scheduleId);
        if(!schedule){
            return res.status(500).json({ 'message': 'Invalid Schedule' });
        }else{
            schedule.workDate = workDate;
            schedule.shiftLength = shiftLength;
            await schedule.save();
            return res.status(200).json({ 'success': 'Schedule Updated', schedule});
        }
    }catch(err){
        return res.status(500).json({ 'message': err.message });
    }
}

const removeSchedule = async (req, res) => {
    const { scheduleId } = req.body;

    if (!scheduleId) 
        return res.status(400).json({ 'message': 'Bad Request' });
    try{
        let schedule = await Schedule.findByPk(scheduleId);
        if(!schedule){
            return res.status(500).json({ 'message': 'Invalid Schedule' });
        }else{
            await schedule.destroy();
            return res.status(200).json({ 'success': 'Schedule Removed'});
        }
    }catch(err){
        return res.status(500).json({ 'message': err.message });
    }
}



const getUserSchedule = async (req, res) => {
    const { userId, startDate, endDate } = req.body;

    if (!userId) 
        return res.status(400).json({ 'message': 'Bad Request' });
    try{
        const user = await User.findByPk(userId);
        if(!user){
            return res.status(500).json({ 'message': 'Invalid User' });
        }else{
            if(startDate != null && endDate != null){
                const schedules = await Schedule.findAll({
                    where: {
                        userId: userId,
                        workDate:{
                            [Op.between]:[startDate, endDate]
                        } 
                    }
                });
                return res.status(201).json(schedules);
            }else{
                const schedules = await Schedule.findAll({
                    where: {userId: userId}
                });
                return res.status(201).json(schedules);
            }
        }
    }catch(err){
        return res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewSchedule, updateSchedule, removeSchedule, getUserSchedule };