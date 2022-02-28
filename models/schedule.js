const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Schedule = sequelize.define("schedule",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    workDate:{
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    shiftLength: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
});

module.exports = Schedule;