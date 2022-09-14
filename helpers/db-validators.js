import Role from "../models/role.js"
import User from "../models/user.js"

export const checkRole = async( role ) => { 
  const validRole = await Role.findOne({ role })
  if(!validRole) { 
    throw new Error(`Role ${ role } is not registered in the Database`)
  }
}

export const checkEmail = async( email = '' ) => {
  const validEmail = await User.findOne({email})
  if( validEmail ) { 
    throw new Error(`${ email } is already in use`)
  }
}

export const checkUserById = async( id = '' ) => { 
  const validUser = await User.findById( id )
  if( validUser ) { 
    throw new Error(`Id: ${ id } does not exist.`)
  }
}