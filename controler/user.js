// util =require('util')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const AppErorr = require("./../utils/appErorr");
const user = require("../models/user_model");
const sendEmail = require("../utils/send_email");
const crypto= require('crypto');

console.log("the user isss ",user)
signtoken=(id)=>{return jwt.sign({id:id}, process.env.SECRET, {expiresIn: process.env.TIMES})}

createsendtoken = (userr, statusCode, res) => {
    const cookiesoptions ={
        expires: new Date(Date.now() + process.env.COOKIES_EXPIRE * 12 * 60 * 60 * 1000),
        httpOnly: true
    }
    const token = signtoken(userr._id)
    res.cookie('jwt', token,cookiesoptions )
userr.password =undefined
    res.status(statusCode).json({status: 'success', token,userr}) 
}

// const jwt = require('');
dotenv.config({ path: 'config.env' });
const async_handler = require("express-async-handler");
const { promisify } = require('util');
const { Console } = require('console');
// user_m=require("../models/user_model")
exports.signup = async_handler(async (req, res, next) => {
    const new_user = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, // تحويل كلمة المرور يمكن أن يحدث هنا
        // على عكس req.body بيتم التحويل داخل قاعدة البيانات ودي ممكن تبقى مشكلة
        password_confirmation: req.body.password_confirmation,
        passwordChangeAt: req.body.passwordChangeAt,
        role: req.body.role
    })
    createsendtoken (new_user,201,res)
    // const token=signtoken(new_user._id)
    // res.status(201).json({status: 'success', token, data:{new_user}}) 
})


exports.login = async_handler(async (req, res, next) => {
    const {email,password} = req.body
    if (!email || !password) {
        return next(new AppErorr('enter password and email',400))
    
    }
    const users = await user.findOne({ email: email }).select('+password')
    /*And so this variable here right now is a user document, right? Because it's a result of querying the user model.
Because it's a result of querying the user model.*/
    // const passw=( await users.comparepass(password, users.password)) 
  

    if (!users || !(await users.comparepass(password, users.password))) {
        return next(new AppErorr('incorrect password and email',401))
    }
    console.log("r is", users,users._id)
    const token = signtoken(users._id)

    res.status(201).json({status: 'success', token}) 
})



exports.protect = async_handler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        
    }
    console.log(token);
    if (!token) { return next(new AppErorr('plz login', 401)) }
    
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET)
    console.log(decoded);
    const freshuser = await user.findById(decoded.id)
    if (!freshuser) {
        return next(new AppErorr('the user doesnt exsit', 401))
    }
    console.log("the re is", freshuser)
    

    // const s = await
    if ( freshuser.changepass(decoded.iat)) {
   return next( AppErorr('plz login', 401))
    }
    req.osama = freshuser

    // console.log((req.osama));
next(); 
})
/* لو محتاج استخدم  req.osama في middleware 
 اخر لازم هذه middleware  تشتغل مباشرة بعد 
 middleware  الذي يحتوي على  req.osama*/ 
exports.restrictto = (...role)=>{
    return (req, res, next) => {
        console.log("from restrictto", req.osama);
        if (!role.includes(req.osama.role)) { //[ admin , lead-aguide]include(admin) =true
            return next(new AppErorr('the user doesnt exsit', 403))
        }
req.os="hello world"
        next();
    }
}


exports.forget_password = async_handler(async function (req, res, next) {
    const users = await user.findOne({ email: req.body.email });
    if (!users) {
        return next(new AppErorr('the user doesnt exsit', 401))
    }
    const resettoken = users.createPasswordResetToken()
    console.log("osama", resettoken)
    await users.save({ validateBeforeSave: false }) // هنا وضعنا الخيار ده علشان محتاجين نحفظ فبيرجع لاسكيما
    // عكس لوج ان ماكناش بنحفظ فكان مفيش تحقق من شييء جوه المونجو
    // console.log( "from forget_password",req.os)
    // console.log( "from forget_password", req.os)
    // console.log("from forget_password", req.os)
    // console.log("from forget_password",req.osama);

    // next()
    message = `Hello ${users.name},\n we've received a request to reset your password for your account. If you didn't make this request, don't worry. Your account is still secure, and no action is needed.\n${resettoken}`;

    await sendEmail({ email: users.email, subject: "Your Reset Code", message });
    
    res.status(200).json({
        status: 'success',
        message: "Token sent to email!"
    });
    
})

exports.reset_password = async function (req, res, next) { 
    try {
        const cry_pass = crypto.createHash('sha256').update(PasswordResetToken.token).digest('hex');
        const users = await user.findOne({
            PasswordResetToken: cry_pass,
            PasswordResetExpires: { $gt: Date.now() }
        });

        if (!users) {
            return next(new Error('Invalid password reset token', 400));
        }

    

        users.password = req.body.password;
        users.password_confirmation = req.body.password_confirmation;
        users.PasswordResetToken = undefined;
        users.PasswordResetExpires = undefined;

        await users.save();
        const token=signtoken(users._id)
        res.status(200).json({status: 'Password reset successful', token})
    } catch (error) {
console.log(error)    }
}


exports.updatePassword = async(req, res, next) => {
    users = await user.findById(req.osama.id).select('password')
    if (!users) {
        return next(new Error('the pass not correct',400))
    }
    if ( !(await users.comparepass(req.body.passwordCurrent, users.password))) {
        return next(new AppErorr('incorrect password and email',401))
    }

    users.password = req.body.password
    users.password_confirmation = req.body.password_confirmation;
    users.passwordChangeAt=Date.now()-1000
   await users.save();
    const token=signtoken(users._id)
    res.status(200).json({status: 'success', token}) 

 }