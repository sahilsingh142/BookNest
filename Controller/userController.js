import userSchema from "../Schema/userSchema.js"
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;
        const existingUser = await userModel.findOne({ email });
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

        res.status(201).json({
            message: "Signup Successful",
            data: "userData"
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
        const user = await userModel.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== role) {
            return res.status(400).json({ message: "Invalid Role" });
        }

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        res.status(200).json({ message: "Login Successful", data: user });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server Error"
        });
    }

};