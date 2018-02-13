import { Router } from 'express';
import { User } from '../models';

const router = Router();

// Main route
router.get("/", function(req, res) {
  res.send("Hello world");
});

// User registration routes
router.get("/register", function(req, res) {
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

export default router;

