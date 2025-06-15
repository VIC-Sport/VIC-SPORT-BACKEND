require('dotenv').config();
const express = require('express');
// const fileUpload = require('express-fileupload');
const connection = require('./config/database');
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//config fileupload
//luu y: phai config phia tren route
//default options
// app.use(fileUpload());

// config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async() => { 
  try {
    await connection();
    app.listen(port, hostname, () => {
    console.log(`backend zero app listening on port ${port}`)
  });
  } catch (error) {
    console.log(">>> Err connect to db: ", error);
  }
})()

