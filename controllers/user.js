const User = require("../models/user.js");

module.exports.renderSignUpForm = (req, res) =>{
    res.render("user/signup.ejs")
}

module.exports.signup = async(req, res,next) =>{
    try{
        let {username, email, password} = req.body;
        let newUser = new User({email,username});
        const registeruser =  await User.register(newUser, password);
        console.log(registeruser);
        req.login(registeruser, (err) =>{
            if(err) {
                return next(err)
            }
            req.flash("success","Welcome to Wanderlast");
            res.redirect("/listings")
        })
    }catch (e){
        req.flash("error",e.message);
        res.redirect("/signup")

    }
}

module.exports.renderLoginForm =  (req,res) =>{
    res.render("user/login.ejs")
}


module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to Wanderlasts");
    let redirect = res.locals.redirectUrl || "/listings"
    res.redirect(redirect);
}

module.exports.logout = (req,res,next) =>[
    req.logout((err) =>{
        if(err){
            next(err);
        }else{
            req.flash("success","Logged out successfully");
            res.redirect("/listings");
        }
    })
]