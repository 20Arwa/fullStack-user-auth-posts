import { ERRORS } from "../config/constants.js"

const errorTitles = {
    [ERRORS.NOT_FOUND]: "Not Found",
    [ERRORS.SERVER_ERROR]: "Server Error",
    [ERRORS.UNAUTHORIZED]: "Unauthorized",
    [ERRORS.BAD_REQUEST]: "Bad Request",
    [ERRORS.ALREADY_EXISTS]: "Already Exists",
}

const errorHandler = (err, req, res, next) => {
    const statusCode =
        err.statusCode ||
        res.statusCode !== 200
            ? res.statusCode
            : ERRORS.SERVER_ERROR

    res.status(statusCode).json({
        title: errorTitles[statusCode] || "Server Error",
        message: err.message,
        ...(statusCode === ERRORS.UNAUTHORIZED && {
            type: err.type || "AUTH_ERROR"
        }),
        stackTrace:
            process.env.NODE_ENV === "production" ? null : err.stack,
    })
}

export default errorHandler