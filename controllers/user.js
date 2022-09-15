import { request, response } from "express";
import User from "../models/user.js";
import bcryptjs from 'bcryptjs'


export const usersGET = async( req = request, res = response ) => { 
  const { limit = 5, from = 0 } = req.query; //? los query params vienen en string, se parsean a number

  // const users = await User.find({ state: true })
  //   .skip( Number(from) ) //? desde donde se va a leer la informacion
  //   .limit( Number(limit) ) //? limite que vendra en la response

  // const total = await User.countDocuments({ state: true })

  const [ users, total ] = await Promise.all([
    User.find({ state: true })
      .skip( Number(from) )
      .limit( Number(limit) ),
    User.countDocuments({ state: true })
  ])

  res.json({ total, users })
}

export const usersPOST = async (req = request, res = response) => { 

  
  const { name, email, password, role } = req.body; //? BODY DE LOS POST PARA PUBLICAR 
  const user = new User({ name, email, password, role })
  
  //crypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync( password, salt )

  await user.save()

  res.json({ user })
}

export const usersPUT = async (req = request, res = response) => { 
  const { id } = req.params; //? SEGMENT PARAMS: viene como un string
  const { _id, password, google, email, ...rest } = req.body;

  //todo: validar contra base de dato 
  if( password ){ 
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync( password, salt )
  }

  const user = await User.findByIdAndUpdate( id, rest )

  res.json({ user })
}

export const usersPATCH = (req = request, res = response) => { 
  res.json({
    msg: 'PATCH API - controlador'
  })
}

export const usersDELETE = async(req = request, res = response) => { 
  const  { id } = req.params; 
  // const user = await User.findByIdAndDelete( id ) //? borrar fisicamente de la DB

  const user = await User.findByIdAndUpdate( id, { state: false} )
  const authenticatedUser = req.user;
  
  res.json({
    user,
    authenticatedUser,
  })
}