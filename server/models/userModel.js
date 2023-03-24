const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoURI =
  'mongodb+srv://PaulSturtz:s4Tdzlc1KMAkWJ0D@baseballtracker.vjbxmpt.mongodb.net/test';
mongoose
  .connect(mongoURI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'BaseballTracker',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));


const SALT_WORK_FACTOR = 10;


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  favoriteTeam: { type: Number, required: true },
});

userSchema.pre('save', function(next) {
    const user = this
      bcrypt.genSalt(SALT_WORK_FACTOR, function(saltError, salt) {
        if (saltError) {
          return next(saltError);
        } else {
          bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) next({
              log: `Error message: ${err}`,
              message: {
                err: 'Error hashing password',
              },
            });
            user.password = hash;
            next();
          });
        }
      });
})
userSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(error);
    } else {
      callback(null, isMatch);
    }
  });
};


module.exports = mongoose.model('User', userSchema);