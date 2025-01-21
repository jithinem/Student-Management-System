console.warn("Student Management System");
const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require("./config/database");  
const routes = require('./routes');
const {seedUser} = require('./seed/user.seed');

dotenv.config();

connectDB();

seedUser();

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use(cors());

app.use("/api", routes); 

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});