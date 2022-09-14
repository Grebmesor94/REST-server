import mongoose from 'mongoose'

export const dbConnection = async() => { 

  try {
    await mongoose.connect(process.env.MONGODB_CONNECT)
    console.log('DB online');
  } catch (error) {
    throw new Error('Error al iniciar la base de datos')
  }
}