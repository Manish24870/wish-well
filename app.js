const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const wishRoutes = require("./routes/wishRoutes");

const app = express();

//Middleware
// app.use(
//     express.urlencoded({
//         extended: false,
//     })
// );
app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));

//Connecting to database
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connected..");
  })
  .catch((err) => {
    console.log(err);
  });

//Routes
app.use("/users", userRoutes);
app.use("/wishes", wishRoutes);

const port = process.env.PORT || 5000;

//Starting a server
app.listen(port, () => {
  console.log("Server started at port " + port);
});
