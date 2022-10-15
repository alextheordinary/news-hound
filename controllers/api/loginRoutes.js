const router = require('express').Router();

router.get('/login', (req, res) => {
    // If you are logged in you go to home page otherwise you go to login screen
  //  if (req.session.logged_in) {
  //    res.redirect('/');
  //    return;
  //  }
 
   res.render('login');
 });
 
 module.exports = router;
 