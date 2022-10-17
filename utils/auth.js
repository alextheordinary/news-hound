const withAuth = (req, res, next) => {
    // Forces you to login page if not logged in
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };

  module.exports = {withAuth};