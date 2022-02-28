const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define("user",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    role:{
        type: Sequelize.ENUM('ADMIN','STAFF'),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
},
{
    associate: function(models) {
      User.hasMany(models.Schedule, { onDelete: 'cascade' });
    }
});

module.exports = User;