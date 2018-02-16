import passport from 'passport';
import { Router } from 'express';
import { User } from '../models';

const router = Router();

// Main route
router.get("/", function(req, res, next) {
  res.render("index", { user: req.user ? req.user : null });
});

// User registration and login routes
router.get("/register", function(req, res, next) {
  res.render("register", {});
});

router.post("/register", function(req, res, next) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err) {
    if (err) {
      console.log("Error while registering user: ", err);
      return next();
    } else {
      console.log("User registered.");
      res.redirect('/');
    }
  });
});

router.get("/login", function(req, res, next) {
  res.render("login", {});
});

router.post("/login", passport.authenticate('local'), function(req, res, next) {
  res.redirect('/');
});

export default router;

