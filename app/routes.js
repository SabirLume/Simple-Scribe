module.exports = function (app, passport, db) {
  const multer = require('multer');
  const upload = multer({
    dest: 'uploads/' // this saves your file into a directory called "uploads"
  });

  var Tesseract = require('tesseract.js')

  // normal routes ===============================================================

  // MULTER
  // It's very crucial that the file name matches the name attribute in your html
  app.post('/fileUpload', upload.single('file-to-upload'), (req, res) => {
    console.log("file upload", req.file)
    // Recognize text of any language in any format
    Tesseract.recognize(req.file.path)
      .then(function (result) {
        console.log(result.text)
        db.collection('documents').save({ user: req.session.passport.user, title: req.body.title, note: result.text }, (err, result) => {
          if (err) return console.log(err)
          console.log('saved to database')
          res.redirect('/my-notes');
        })
      });
  });

  // show the home page (will also have our login links)
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });
  // folders SECTION =========================
  app.get('/folders', isLoggedIn, function (req, res) {
    db.collection('documents').find({ user: req.session.passport.user }).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('folders.ejs', {
        // user : req.user,

        //passing the array of objects into file to use it
        documents: result
      })
      console.log("this is showing the results", result)
      // console.log("this is showing the results" , result)
    })
  });

  app.get('/my-notes', function (req, res) {
    res.render('my-notes.ejs');
  });

  app.post('/my-notes', (req, res) => {
    db.collection('documents').save({ user: req.session.passport.user, title: req.body.title, note: req.body.note }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/my-notes')
    })

  })





  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.delete('/my-notes', (req, res) => {
    // console.log('Looking for message id', req.body.messageid)
    //  converting string into a special object mongo can use id string to id object
    db.collection('documents').findOneAndDelete({title: req.body.title, note: req.body.note }, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
      console.log('Message Deleted')
    })
  })


  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/folders', // redirect to the secure folders section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/folders', // redirect to the secure folders section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect('/folders');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
