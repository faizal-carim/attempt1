const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const app = require("./app");

app.listen(port, () => {
    console.log('APIs are available on port : ${process.env.PORT}')
  })