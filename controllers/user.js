import { request, response } from "express";

export const usersGET = ( req = request, res = response ) => { 
  const queryParams = req.query; //? QUERY PARAMS: vienen como string
  res.json({
    msg: 'GET API - controlador',
    queryParams
  })
}

export const usersPOST = (req = request, res = response) => { 
  
  const body = req.body; //? BODY DE LOS POST PARA PUBLICAR 
  res.json({
    msg: 'POST API - controlador',
    body
  })
}

export const usersPUT = (req = request, res = response) => { 
  const segmentParams = req.params; //? SEGMENT PARAMS: viene como un string
  res.json({
    msg: 'PUT API - controlador',
    segmentParams
  })
}

export const usersPATCH = (req = request, res = response) => { 
  res.json({
    msg: 'PATCH API - controlador'
  })
}

export const usersDELETE = (req = request, res = response) => { 
  res.json({
    msg: 'DELETE API - controlador'
  })
}