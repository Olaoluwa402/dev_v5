import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true, unique: true},
  address: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
 phonenumber: {type: Number, required: true, unique: true},
  
}, {timestamps: true});

 const LibUser = mongoose.model("LibUser", userSchema);
 export default LibUser