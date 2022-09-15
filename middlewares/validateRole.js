import { request, response } from 'express'


export const validateAdminRole = async( req = request, res = response, next ) => { 

  if( !req.user ) return res.status(500).json({ 
    msg: 'role verifying not possible because of unvalid token'
  })
  
  const { role } = req.user; 
  if( role !== 'ADMIN_ROLE' ) return res.status(401).json({ 
    msg: `${ name } is not an Admin, therefore, can not perform this action`
  })
  
  next()
}

export const validateRoles = ( ...roles ) => {
  return ( req = request, res = response, next ) => { 
    
    if( !req.user ) return res.status(500).json({ 
      msg: 'role verifying not possible because of unvalid token'
    })

    if( !roles.includes( req.user.role ) ) return res.status(401).json({
      msg: `This service requires one of these roles: ${ roles }`
    })

    next()
  }
}