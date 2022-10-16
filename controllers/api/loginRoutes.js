const router = require('express').Router();
const { User } = require('../../models');

router.get('/login', (req, res) => {
    // If you are logged in you go to home page otherwise you go to login screen
  //  if (req.session.logged_in) {
  //    res.redirect('/');
  //    return;
  //  }
 
   res.render('login');
 });

 router.post('/login', async (req, res) => {
  try {
    // Finding the user based on the email address they entered, if it doesn't find the email, they'll get an error
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Checking to see that password entered is in the database, if its not there, they'll get an error
    const validPassword = await userData.checkPassword(req.body.password);
    console.log("Is the Password Valid", validPassword); // This will log "false" when a User logs in

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Saving their user id and logged in status to the session and setting them as logged in 
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
      console.log(userData.id, "This is the logged in user id");
    });

  } catch (err) {
    res.status(400).json(err);
   
  }
});
 
 module.exports = router;
 