const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cookieParser = require('cookie-parser');
const loginRouter = require('./routes/loginRouter')
const registerRouter = require('./routes/registerRouter');
const homeRouter = require('./routes/homeRouter');
const statsController = require('./controllers/statsController');


app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../build')));

app.use('/login/', loginRouter);

app.use('/register/', registerRouter)

app.use('/home/', homeRouter);

app.get('/stats/:homePlayer/:oppPlayer', statsController.getMatchup, (req, res) => {
  console.log(res.locals.data)
  return res.status(200).json(res.locals.stats)
})

app.use('/hi', (req, res) => {
  return res.status(200).json('Hello from');
})

app.use((req, res) =>
  res.status(404).json("This is not the page you're looking for...")
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
