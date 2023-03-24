const Model = require('../models/userModel')

const userController = {};

userController.findUser = (req, res, next) => {
  const { username , password } = req.body;
  console.log(username, password)
  try {
  Model.findOne({ username })
    .then(function(user) { 
      console.log(user)
      if (!user) {
        next({
          log: `Error message: nonexistent user`,
          message: {
            err: 'Error finding User',
          },
        });
      }
      return user;
    }).then(function(user) {
      user.comparePassword(password, function (matchError, isMatch) {
        if (matchError) {
          next({
            log: `Error message: ${matchError}`,
            message: {
              err: 'Error matching password',
            },
          });
        } else if (!isMatch) {
          res.locals.loginStatus = 'Incorrect';
          next();
        } else {
          res.locals.user = user
          res.locals.loginStatus = 'Success'
          next();
        }
      })});
    } catch(error) {
      next({
        log: `Error message: ${error}`,
        message: {
          err: 'Error in query',
        },
      });
    }
  }

userController.createUser = async (req, res, next) => {
  const {username, password, firstName, favoriteTeam} = req.body;
  console.log(req.body)
  const newUser = new Model({ username, password, firstName, favoriteTeam });
  newUser.save()
  .then((data) => {
    console.log(data)
    res.locals.user = data;
    return next();
  })
  .catch((err) => {
    console.log(err)
    next({
        log: `Error message: ${err}`,
        message: {
          err: 'Error creating user',
        },
      });
  })
};

module.exports = userController;