import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"

// Register 
const registUser = asyncHandler(async(req, res) =>{
    const {user_name, email, password} = req.body

    // Validation
    if (!user_name || !email || !password) {
        res.status(400)
        throw new Error("All Feilds Must Be Filled")
    }
    
    // Check If User Already Existing
    const existing = await User.findOne({email: email.toLowerCase()})
    
    if (existing) {
        res.status(409)
        throw new Error("You already have an account, please log in")
    }
    // Create New User 
    const user = await User.create({
        user_name,
        email: email.toLowerCase(),
        password,
    })

    const accessToken = jwt.sign(
            {
                user: {
                    user_name: user.user_name, 
                    email: user.email,
                    id: user.id
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "1h"}
    )
    
    res.status(201).json({
        message: "Account is created successfully",
        user: {email: user.email, user_name: user.user_name}, 
        accessToken
    })
})

// Login
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    
    const user = await User.findOne({email: email.toLowerCase()})

    // If User Was Not Found
    if (!user) {
        res.status(404)
        throw new Error("Not found, please register")
    }
    
    // Check If Password Is Correct
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
        const error = new Error("Password is wrong")
        error.type = "INVALID_PASSWORD"
        res.status(401)
        throw error
    }
    
    if (user && isMatch) {
        const accessToken = jwt.sign(
            {
                user: {
                    user_name: user.user_name, 
                    email: user.email,
                    id: user.id
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "1h"}
        )
        res.status(200).json({
            message: "Logged in successfully",
            accessToken
        })
    }
})


// Logout
const logoutUser = asyncHandler(async(req,res) => {
        res.status(200).json({
            message: "Logged out successfully"
        })
})

// Get A User
const getUserInfo = asyncHandler(async(req, res) => {
    const user = req.user

    res.status(200).json({
        message: "User Info",
        user: {user_id: user.id, user_name: user.user_name, email: user.email}
    })
})

export {registUser, loginUser,logoutUser, getUserInfo}