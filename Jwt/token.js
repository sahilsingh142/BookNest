import jwt from 'jsonwebtoken';
import User from '../Schema/userSchema.js';

export const genrateToken = (handleToken) => {
    return jwt.sign(handleToken, process.env.JWT_SECRETKEY);
}

export const jwtAuthMiddle = async (req, res, next) => {

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Token doen't found" })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRETKEY);

        const user = await User.findById(decode.id).select("-password");
        if (!user) {
            return res.status(404).json({
                err: "User Not Found"
            });
        }

        req.user = user;
        next();
    }
    catch (err) {
        console.log(err.message);

        return res.status(401).json({
            err: "Invalid Token"
        });
    }
}

export const authorizeRole = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access Denied"
            });
        }

        next();
    };
};