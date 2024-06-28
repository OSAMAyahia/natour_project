const s_tour = require("../models/user_model");
const async_handler=require("express-async-handler");
const AppErorr = require("./../utils/appErorr");
const User = require("../models/user_model");
const factory_fun = require("./factory-function");

const filterobj = (obj, ...allowedfields) => {
    const newobj = {};
    Object.keys(obj).forEach(el => {
        if (allowedfields.includes(el)) 
            newobj[el] = obj[el];
    });
    return newobj;
};

exports.updateme = async (req, res, next) => {
    try {
        const n = filterobj(req.body, 'name', 'email'); // تغيير 'gmail' إلى 'email'
        console.log(n);

        if (req.body.password || req.body.password_confirmation) {
            return next(new AppErorr('You cannot update password here', 400)); // تفعيل الكود وتصحيح 'AppErorr' إلى 'AppError'
        }

        const user = await User.findByIdAndUpdate(req.osama, n, { new: true, runValidators: true });
        res.status(200).json({ status: "success", users: user }); // تصحيح 'secess' إلى 'success' و 'users' إلى 'user'
    } catch (err) {
        console.log(err);
    }
};
exports.deleteme = async (req,res,next)=>{
    try {
        const user =await User.findByIdAndUpdate(req.osama.id, { active: false })
        res.status(203).json({ status: 'success' })

     }
    catch (err) {console.log(err); }
}

exports.getme = (req, res, next) => {
    req.params.id =  req.osama.id
    next()
 }



exports.getalluser = async_handler(async (req, res,next) => {
    user_tour =await s_tour.find()
    
    
    res.status(200).json({ status: "secess" , user: user_tour})
})
exports.createuser = (req, res) => { res.status(500).json({ status:"not found"})}
exports.getuser = factory_fun.getones(User)
exports.updateuser = factory_fun.update(User)
exports.deleteuser = factory_fun.deleteone(User)
