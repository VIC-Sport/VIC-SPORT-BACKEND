require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const connection = require("./config/database");
const app = express();
const port = process.env.PORT || 8888;


app.use(fileUpload());

// config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data


(async () => {
  try {
    await connection();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Err connect to db: ", error);
  }
})();
