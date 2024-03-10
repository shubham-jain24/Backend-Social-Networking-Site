const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

const db = mongoose.connect('mongodb+srv://jain:jain@cluster0.rgx2u.mongodb.net/bookAPI?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    });



const port = process.env.PORT || 3000;

const Book = require('./models/bookModel');
const Register= require('./models/registerModel');
const Session = require('./models/sessionModel');

const router = require('./router/bookRouter')(Book, Register, Session);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/', router);

app.get('/', (req, res) => {
    res.send("Welcome to my API");
});

app.listen(port, () => {
    console.log(`Application Running on port ${port}`);
});
