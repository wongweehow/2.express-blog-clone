require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const homeRoutes = require('./routes/home.routes');
const privateRoutes = require('./routes/private.routes');

const app = express();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// routes
app.use('/', homeRoutes);
app.use('/private', privateRoutes);

// mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<dbname>?retryWrites=true&w=majority
const mongoDBConnectionString = process.env.MONGODB_CONNECTION_STRING;
const serverPort = 5000;

main().catch(error => console.log(error));
async function main() {
  await mongoose.connect(mongoDBConnectionString);
  console.log('Connection to database established');
  app.listen(serverPort, () => {
    console.log(`App is listening on port ${serverPort}`);
  });
}