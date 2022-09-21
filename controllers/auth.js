import { request, response } from "express";
import bcryptjs from 'bcryptjs'

import User from "../models/user.js";
import { generateJWT } from "../helpers/generateJWT.js";
import { googleVerify } from "../helpers/google-validation.js";

export const login = async(req = request, res = response ) => { 
  const { email, password } = req.body;

  try {
    //? VERIFICAR USUARIO CON CORREO Y ESTADO
    const user = await User.findOne({ email })
    if( !user ) return res.status(400).json( {msg: "User or password incorrect"} )
    if( !user.state ) return res.status(400).json( { msg: "Status is false" } )

    //? VERIFICAR PASSWORD
    const validPassword = bcryptjs.compare( password, user.password )
    if( !validPassword ) return res.status(400).json( { msg: "Password is invalid" } )

    //? GENERAR JWT
    const token = await generateJWT( user.id )


    res.json({ user, token })
    
  } catch (error) {
    return res.status(500).json({ msg: 'Hable con el administrador' })
  }
  
}

export const googleSignIn = async( req = request, res = response ) => { 
  const { id_token } = req.body;

  try {
    const { name, picture: img, email } = await googleVerify( id_token )

    let user = await User.findOne({ email })
    if( !user ) { 
      const data = { 
        name,
        email,
        password: 'gg wp',
        img,
        google: true
      }

      user = new User()
      await user.save()
    }

    //todo usuario con state en false
    if( !user.state ) return res.status(401).json({
      msg: 'speak with the Admin. User blocked'
    })

    const token = await generateJWT( user.id )
    
    res.json({ user, token })

  } catch (error) {
    res.status(400).json({ 
      ok: false,
      msg: 'Token could not be verified'
    })
  }

  
}