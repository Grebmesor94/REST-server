import { request, response } from 'express';
import { validationResult } from "express-validator";

export const validateEntries = ( req = request, res = response, next ) => { 

  //? Aqui llegan los errores de los middleware de express-validator
  const errors = validationResult(req); 
  if( !errors.isEmpty() ) { 
    return res.status(400).json(errors)
  }

  next()

}