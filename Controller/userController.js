import { genrateToken } from "../Jwt/token.js";
import userSchema from "../Schema/userSchema.js"
import bcrypt from "bcrypt";
import { signupSchema } from "../Validation/validation.js";

export const signup = async (req, res) => {
    try {

        const result = signupSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                errors: result.error.issues,
            });
        }

        const { name, email, password, role } = req.body;
        const existingUser = await userSchema.findOne({ email });
        const hashedPassword = await bcrypt.hash(password, 10);

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const newUser = new userSchema({
            name,
            email,
            password: hashedPassword,
            role
        });
        const userData = await newUser.save();

        const payload = {
            name: name,
            id: userData.id,
            role: userData.role
        }
        const token = genrateToken(payload);

        res.status(201).json({
            message: "Signup Successful",
            data: userData,
            token: token
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== role) {
            return res.status(400).json({ message: "Invalid Role" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        const payload = {
            name: user.name,
            id: user.id,
            role: user.role
        }
        const token = genrateToken(payload);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "Login Successful", data: user, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server Error"
        });
    }

};

export const logout = (req, res) => {

    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });

    res.status(200).json({
        message: "Logout Successful"
    });
};