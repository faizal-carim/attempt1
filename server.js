const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const app = require("./app");
const sequelize = require("./util/database");
sequelize.sync({force:true});
app.listen(port, () => {
    console.log('APIs are available on port : ${process.env.PORT}')
  })