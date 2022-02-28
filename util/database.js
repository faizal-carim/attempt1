const Sequelize = require("sequelize");

const sequelize = new Sequelize("my_db","root","",{
    dialect:"mysql",
    port:"3306",
    host:"127.0.0.1"
});

module.exports = sequelize;