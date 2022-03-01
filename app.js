const express = require('express')
const app = express()

const bcrypt = require("bcrypt");
const sequelize = require("./util/database");
const User = require("./models/user");
const Schedule = require("./models/schedule");
const authentication = require("./auth/tokenValidation");

User.hasMany(Schedule, {onDelete: 'cascade', hooks:true});

app.use(express.json());
app.use('/register', require('./routes/register'));
app.use('/newSchedule',authentication.loggedInAdmin, require('./routes/schedule'));
app.use('/updateSchedule',authentication.loggedInAdmin, require('./routes/schedule'));
app.use('/removeSchedule',authentication.loggedInAdmin, require('./routes/schedule'));
app.use('/getUserSchedule',authentication.loggedIn, require('./routes/schedule'));
app.use('/updateUser', authentication.loggedInAdmin, require('./routes/user'));
app.use('/removeUser', authentication.loggedInAdmin, require('./routes/user'));
app.use('/getUsersInOrderOfTotalShiftLength',authentication.loggedInAdmin, require('./routes/user'));
app.use('/getAllUsersSchedules',authentication.loggedIn, require('./routes/allStaff'));
app.use('/login', require('./routes/login'));

app.get('/', (req, res) => {
  res.send('APIs are available!')
})


module.exports = app;