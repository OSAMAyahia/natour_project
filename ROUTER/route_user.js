const express = require("express");
const conuser = require("../controler/conuser");
const {getalluser,createuser} = require("./../controler/conuser");
const user_control = require("./../controler/user");






const Ruter = express.Router();
Ruter.route('/me').get(user_control.protect,conuser.getme,conuser.getuser)
Ruter.route('/signup').post(user_control.signup)
Ruter.route('/login').post(user_control.login)
Ruter.route('/forgetpassword').post(/*user_control.protect,user_control.restrictto('admin'),*/user_control.forget_password)
Ruter.route('/resetpassword/:token').patch(user_control.reset_password)
Ruter.route('/updatepassword').patch(user_control.protect,user_control.updatePassword)
Ruter.route('/updateData').patch(user_control.protect, conuser.updateme);
Ruter.route('/deleteme').delete(user_control.protect, conuser.deleteme);
Ruter.route('/').get(user_control.protect,getalluser).post(createuser)
Ruter.route('/:id').get(conuser.getuser).patch(conuser.updateuser).delete(conuser.deleteuser)


module.exports = Ruter;