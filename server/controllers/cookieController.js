const cookieController = {};

cookieController.createCookie = async (req, res, next) => {
  if (res.locals.user && !req.cookies.favTeam) {
    await res.cookie('favTeam', `${res.locals.user.favoriteTeam}`)
    .cookie('firstName', `${res.locals.user.firstName}`);
  }
  return next()
};


module.exports = cookieController