const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

userSchema.pre('save', function (next) {
    const user = this;
    console.log('user :: ', user);

    if (user.isModified('password')) { // 비밀번호 바꿀때에만
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch)
    })
}

userSchema.methods.generateToken = function (callback) {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;
    user.save(function (err, user) {
        if (err) return callback(err);
        callback(null, user);
    })
}

userSchema.statics.findByToken = function (token, cb) {
    const user = this;

    // 토큰을 decode
    jwt.verify(token, 'secretToken', function (err, decode) {
        user.findOne({
            _id: decode,
            token: token
        }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        });
    });
}

const User = mongoose.model('User', userSchema);
module.exports = {
    User
};