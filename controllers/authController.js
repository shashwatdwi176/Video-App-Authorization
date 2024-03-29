const User = require('../models/userModel')
const {validationResult} = require('express-validator')

const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const registerUser = async(req,res) => {
    try{
       const errors = validationResult(req);
       if (!errors.isEmpty()){
        return  res.status(200).json({
            success: false,
            msg: "Errors",
            errors: errors.array()
        })
       }

       const {name ,email , password} = req.body
       const isExitUser = await User.findOne({email})
       if (isExitUser){
        return res.status(200).json({
            success: false,
            msg: 'Email already exists!!!'
        })
       }

      const hashedPassword = bcrypt.hash(password , 10)
      const user =new User({
        name,
        email,
        password: hashedPassword
      })

     const userData =  await user.save()

     return res.status(200).json({
        success: true,
        msg: 'Registered Successfully',
         data: userData
     })
    }catch(error){
        return res.status(400).json({
            success:false,
            msg: error.message
        })
    }
}

const generateAccessToken = async(user) => {
    jwt.sign(user,)
}

const loginUser = async(req, res) => {
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(200).json({
                success: false,
                msg: "Errors",
                errors: errors.array()
            })
        }

        const {email , password} = req.body;

        const userData = await User.findOne({email});

        if (!userData){
            return res.status(400).json({
                success: false,
                msg: 'Email & Password is incorrect'
            })
        }

        const isPasswordMatch = await bcrypt.compare(password , userData.password);

        if (!isPasswordMatch){
            return res.status(400).json({
                success: false,
                msg: 'Email & Password is incorrect'
            })
        }

        return res.status(200).json({
            success: true,
            msg: 'Login Successfully',
            data: userData
        })

    }catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser
}