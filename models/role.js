import { model, Schema } from "mongoose";

const roleSchema = Schema({
  role: { 
    type: String,
    required: [true, "Role is required"]
  }
})

export default model('role', roleSchema)