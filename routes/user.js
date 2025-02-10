const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const warpAsync = require("../utils/warpAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userControllers = require("../controllers/user.js")

router.route("/signup")
.get(userControllers.renderSignUpForm)
.post(warpAsync(userControllers.signup));

router.route("/login")
.get(userControllers.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local" , {failureRedirect:"/login", failureFlash : true}),userControllers.login)

router.get("/logout",userControllers.logout);


module.exports = router;