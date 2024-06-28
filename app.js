const express = require("express");
const tourRuter = require("./ROUTER/route_tour");
const userRuter = require("./ROUTER/route_user");
const reviewRuter = require("./ROUTER/route_review");
const AppErorr = require("./utils/appErorr");
const controler_erorr = require("./controler/contoller-Erorr");
const morgan = require("morgan");
const  rate_limit = require("express-rate-limit");
const  helmet = require("helmet");
const app = express()
app.use(helmet())
const limiter = rate_limit({
    max:100,
    windowMs: 60 * 60 * 1000,
    message:'to many requests, please try again in an hour.',
})
app.use('/api',limiter)
app.use(express.static(`${__dirname}/public`));
app.use(express.json({limit:'10kb'}))
app.use(morgan('dev'));
// app.use((req, res, next) => { console.log("helllo from middleware"), next(); })
app.use((req, res, next) => {s=req.requestTime = new Date().toISOString(),next();})
// تحديد وسيطات الوصول لطلبات API
app.use('/api/v1/tour', tourRuter);
app.use('/api/v1/user', userRuter);
app.use('/api/v1/review', reviewRuter);
app.use((err, req, res, next) => { res.status(400).json({ err: err }) })
// يستخدم-مع-اخطاء-في-الروتس-فقط
app.all("*", (req, res, next) => {
    // const err = new Error(`Cannot find ${req.originalUrl} on this server`);
    // err.statuss = 'fail';
    // err.statuscode = 404;
    // console.log(err);
    console.log(new AppErorr(`Cannot find ${req.originalUrl} on this server`, 404))
    next(new AppErorr(`Cannot find ${req.originalUrl} on this server`, 404)); // تمرير الخطأ إلى الـ next()
});
// app.use((req, res, next) => { console.log("helllo from middleware"), next(); })
// يستخدم مع اي خطا في التطبيق 
app.use(controler_erorr);


module.exports = app;
