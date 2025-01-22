import bcrypt from "bcrypt";
import User from "../../models/userShcema.js";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    console.log("poda funde", req.body);

    const { name, email, password, place, age } = req.body;
    if (!name || !email || !password || !place) {
      return res.json({
        success: false,
        message: "all field must be required !",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      place,
      age,
      date: Date.now(),
    });
    const savedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "sign up succecsully.",
      userData: savedUser,
    });
  } catch (error) {
    console.log(`error`, error);
    return res.json({ error });
  }
};

const login = async (req, res) => {
  try {
    console.log("user login ",req.body);
    
    const { email, password } = req.body;
    if ((!email, !password)) {
      return res.json({
        success: false,
        message: "email and passord must be required",
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      
      
      return res.json({ success: false, message: "User not found" });
    }
    

    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!comparePassword) {
      return res.json({ success: false, message: "Password not match.." });
    }
   

    const playload = {
      userId: existingUser._id,
      userName: existingUser.name,
      userEmail: existingUser.email,
    };

    
    const token = await jwt.sign(playload, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({
        success: true,
        message: "login succesfully",
        token,
        user: existingUser.name,
      });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};

const userDetails = async (req, res) => {
  try {
    console.log("its user details is running successfully...");
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.json({ success: false, message: "token not found !" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decode.userId });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User data ", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const addImage = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    if (!req.file) {
      return res.json({ success: false, message: "No File uploaded" });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    const updatedUser = await User.findByIdAndUpdate(userId, {
      profile: imagePath,
    },{new:true});

    return res.status(200).json({
      success:true,
      message:'Image uploaded and user updated successfully',
      user: updatedUser
    })
  } catch (error) {
    console.error('Error updating user with image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

};
export { signup, login, userDetails, addImage };
