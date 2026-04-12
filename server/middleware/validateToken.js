import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"

const validateToken = asyncHandler(async (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(401)
        throw new Error("No token provided")
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded.user
        next()

    } catch (err) {
        if (err.name === "TokenExpiredError") {
            res.status(401)
            throw new Error("Token expired")
        }
        res.status(401)
        throw new Error("Invalid token")
    }
})

export default validateToken
