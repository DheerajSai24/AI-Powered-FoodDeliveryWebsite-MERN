import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


// create token
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// login user
const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try {
        // check if user exists
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User doesn't exist"})
        }

        // compare password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }

        // create JWT token
        const token = createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// register user
const RegisterUser = async (req,res)=>{
    const {name,email,password} = req.body;
    try {
        // check if user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }

        // validate email format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        // validate password strength
        if(password.length < 8){
            return res.json({success:false,message:"Please enter a strong password (min 8 characters)"})
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // create new user
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save();

        // create JWT token
        const token = createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log("Registration Error:", error);
        res.json({success:false,message:"Error: " + error.message})
    }
}

export {loginUser,RegisterUser}