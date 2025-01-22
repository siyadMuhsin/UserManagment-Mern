import mongoose, { Schema } from "mongoose";
const useSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  place: {
    type: String,
  },
 
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
  age:{
    type: Number,
  },
  date: {
    type: String,
  },
});

const User = mongoose.model("User", useSchema);
export default User;
