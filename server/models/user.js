const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_I = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSChema = mongoose.Schema({
    email:{
        type:String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        trim: true,
        minLength: 5
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    lastname:{
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    cart:{
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    role:{
        type: Number,
        default: 0
    },
    token: {
        type:String
    }
});

userSChema.pre('save',function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I, (err, salt) => {
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }else{
        next();
    }
   
})

userSChema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

userSChema.methods.generateToken = function(cb){
    const user = this;

    const token = jwt.sign(user._id.toHexString(), process.env.SECRET)

    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user)
    })
}


userSChema.statics.findByToken = function(token, cb){
    const user = this;

    jwt.verify(token, process.env.SECRET, function(err, decode){
        user.findOne({"_id": decode, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null,user);
        })
    })
}

const User = mongoose.model('User', userSChema);

module.exports = {User};