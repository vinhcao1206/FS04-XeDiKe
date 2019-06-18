const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {User} = require("../../../models/user")
const {authenticating, authorizing} = require("../../../middlewares/auth")

// route      POST /api/users/register
// desc       register new user
// access     Public
const register = (req, res, next) =>{
    const {email, password, fullName, userType, phone, DOB } = req.body;
    //Giả định: input valid
    User.findOne({$or: [{email}, {phone}]})
        .then(user =>{
            if(user) return Promise.reject({errors: "Email exists"})
        const newUser = new User({
            email, password, fullName, userType, phone, DOB
        })
        bcrypt.genSalt(10, (err, salt) =>{
            if(err) return Promise.reject(err);
            
            bcrypt.hash(password, salt, (err, hash) =>{
                if(err) return Promise.reject(err)

                newUser.password = hash
                return newUser.save()
                .then(user => res.status(200).json(user))
                .catch(err => res.status(400).json(err))
            })
        })
    })
    .catch(err => res.status(400).json(err))
}

// route      POST /api/users/login
// desc       login user
// access     Public
const login = (req, res, next) =>{
    const {email, password} = req.body

    User.findOne({email})
        .then(user =>{
            if(!user)
                return Promise.reject({errors: "User does not exists"})
            
                bcrypt.compare(password, user.password, (err, isMatch) =>{
                if(!isMatch)
                    return res.status(400).json({errors: "Wrong password"})
                
                const payload = {
                    id: user._id,
                    email: user.email,
                    fullName: user.fullName,
                    userType: user.userType
                }
                jwt.sign(payload,"XEDIKE",{expiresIn:"30m"}, (err, token) =>{
                    if(err)
                    return  res.status(400).json(err)

                    return res.status(200).json({
                        message: "success",
                        token
                    })
                })
                
            })
        })
        .catch(err => res.status(400).json(err))
}

const testPrivate = (req,res,next) =>{
    
    (req, res) =>{
        res.status(200).json({message:"Now you see me"})
    }
}

const uploadAvatar = (req, res, next) =>{
    const { id } = req.user
        User.findById(id)
            .then(user =>{
                if(!user)  return Promise.reject({errors: "sai thông tin"})

                user.avatar = req.file.path
                return user.save()
            })
            .then(user => res.status(200).json(user))
            .catch(err => res.status(400).json(err))
}

module.exports = {
    register,
    login,
    testPrivate,
    uploadAvatar
} 