if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/students');
const studentRouter = require('./routes/students');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
// app.use('/', express.static('assets'));
// app.use('/assets', express.static('assets'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/', indexRouter);
app.use('/students', studentRouter);

app.listen(process.env.PORT || 3000);
