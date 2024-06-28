const mongoose = require('mongoose');
const validator= require('validator');
const bcrypt= require('bcryptjs');
const crypto= require('crypto');
const user_tour = new mongoose.Schema({
    name: { type: 'string', required: true },
    email: {
        type: 'string', required: true, unique: true
        , lowercase: true,
          validate:validator.isEmail
    }
    ,
    role: {
        type: String,
        enum: ['user', 'lead-guide', 'guide','admin'],
        // default: 'user'
        required: true
    },
    password: {
        type: 'string', required: true, minLength: 8,
        select:false
    },
    password_confirmation: {
        type: 'string', required: true,
        // this function only works on create and save !!! and not update
        validate: { validator: function(el){
         return el===this.password
        },message: 'password are not the same'}
    },
    passwordChangeAt: Date,
    PasswordResetToken: String, 
    PasswordResetExpires: Date,
    active: {
        type: 'boolean',
        default: true
    }
})
// after recieving data and before saving it will be work
user_tour.pre('save', async function (next) {
    // only run if password is modified
    if (this.isModified('password')) {
        //the current pass in ducment
        this.password = await bcrypt.hash(this.password, 12)
        // this.osama=this.password
        this.password_confirmation = undefined
        next()
    }
    else{ next()}

})

/*

هناك توضيحات مهمة في هذا النص:

1. **`this.password_confirmation`**: 
هو حقل يُستخدم لتأكيد كلمة المرور.
 بمجرد التحقق من صحة كلمة المرور وتأكيدها،
  لم يعد هذا الحقل مطلوبًا 
  أو مهمًا بعد ذلك، لذا يتم تعيين قيمته إلى `undefined`.

2. **تعيين إلى `undefined`**: 
بتعيين الحقل إلى `undefined`، 
يتم إزالته من الوثيقة قبل حفظها في قاعدة البيانات.
 هذا يعني أنه لن يتم حفظ الحقل `password_confirmation` في قاعدة البيانات،
  وبالتالي لا داعي للقلق بشأن استمرارية وجوده.

3. **التحقق من الصحة فقط**
: تم استخدام حقل `password_confirmation`
 فقط لتأكيد أن المستخدم قد أدخل كلمتي مرور متطابقتين.
 بعد التحقق من صحة كلمة المرور،
 لم يعد هذا الحقل مطلوبًا، ولن يتم حفظه في قاعدة البيانات.

4. **الدعوة إلى `next()`**: 
في النهاية، يتم استدعاء `next()` للسماح بالانتقال إلى middleware الحفظ التالية. هذا ضروري لضمان استمرار عملية الحفظ بشكل صحيح بعد اكتمال جميع المهام الضرورية.

*/
// instanced method  تقوم بتطبيق على ducments
// And so therefore it is available on all the user documents. 
user_tour.pre('find', function(next) { 
    this.find({ active: {$ne:false} })
    next()
})
user_tour.methods.comparepass = async function (bodypass, mongopass) {
   return await bcrypt.compare(bodypass,mongopass)
}

user_tour.methods.changepass = function (jwttime) {
    if (this.passwordChangeAt) {
        const changedpasstamp = parseInt( this.passwordChangeAt.getTime()/1000,10);
        console.log(jwttime,changedpasstamp);
        return jwttime < changedpasstamp;
    
    }
    return false
 }

user_tour.methods.createPasswordResetToken = function () {
    resetToken = crypto.randomBytes(32).toString('hex');
    this.PasswordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    console.log({resetToken},  this.PasswordResetToken);
    
    this.PasswordResetExpires = Date.now() + 10 * 60 * 1000
    return resetToken;
}

const u_t = mongoose.model('user_tour', user_tour);


module.exports = u_t;

