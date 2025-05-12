const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    resetOtp:{type:String,default:''},
    resetPasswordExpiredAt:{type:String,default:''},
});

module.exports= mongoose.models.Users || mongoose.model('Users',userSchema,'Users');
