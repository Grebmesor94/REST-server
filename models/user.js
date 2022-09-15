import { model, Schema } from 'mongoose'

const userSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false
  }
})


//? ESTE METODO PERMITE DEVOLVER LO QUE YO QUIERA DEL MODELO, AQUI SE DESCARTA EL PASSWORD Y VERSION
userSchema.methods.toJSON = function() { 
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id
  return user;
}

export default model('User', userSchema)
