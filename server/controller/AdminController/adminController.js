import jwt from "jsonwebtoken";
import User from "../../models/userShcema.js";
const adminLogin = async (req, res) => {
  try {
    console.log("Admin login route hit");
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if credentials match
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASS
    ) {
      // Generate JWT token
      const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        adminToken: token,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error("Error in adminLogin:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const usersList = async (req, res) => {
  try {
    console.log("users list running");

    const users = await User.find({});

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const editUser=async (req,res)=>{
  try {
   
    
    const id=req.params.id
    const {name,place,age}=req.body
    
    const updatedUser=await User.findByIdAndUpdate(id,
      {
      name,
      place,
      age
    },{new:true})
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({success:true,message:"user updated successfully.",user:updatedUser})
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
    
  }
}
const userDelete = async (req, res) => {
  try {
    console.log('Deleting user...');
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, message: 'User deleted successfully'});
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
export { adminLogin, usersList ,editUser,userDelete};
