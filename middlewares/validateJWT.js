import jwt from 'jsonwebtoken'
import { request, response } from 'express'
import User from '../models/user.js'

export const validateJWT = async( req = request, res = response, next ) => { 

  const token = req.header('x-token') 
  if( !token ) return res.status(401).json({
    msg: 'There is no token in the request'
  })

  try {
    
    const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
 
    const user = await User.findById( uid )
    if( !user ) {
      res.status(401).json({ 
        msg: 'User does not exist'
      })
    }

    if( !user.state ) { 
      res.status(401).json({ 
        msg: 'User with state: false'
      })
    }

    req.user = user;
    next()

  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Invalid token'
    })
  }

}