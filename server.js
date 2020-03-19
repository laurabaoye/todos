const express = require("express");
const app = express();

const MONGO_URI = (
  process.env.MONGODB_URI || 
  "mongodb://localhost/deploy_todoDB"
);



const mongoose = require("mongoose");
const connection = mongoose.connection;
mongoose.connect(
  MONGO_URI, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);
connection.on("error", console.error.bind(console, "connection error:") );
connection.once("open", () => console.log("connected to db instance") );



const logger = require("morgan");
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./views"));



const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    'listening at:',
    `http://localhost:${PORT}`
  );
});
