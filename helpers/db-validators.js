import { Category } from "../models/category.js"
import { Product } from "../models/product.js"
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
  if( !validUser ) { 
    throw new Error(`Id: ${ id } does not exist.`)
  }
}

export const checkCategoryById = async( id ) => { 

  const validCategory = await Category.findById({ id })
  if( !validCategory ) { 
    throw new Error(`Category with ID: ${ id } doesn't exist`)
  }
}

export const checkProductById = async( id ) => { 
  const validProduct = await Product.findById( id )
  if( !validProduct ) { 
    throw new Error(`Product with id: ${ id } does not exist`)
  }
}

export const allowedCollections = ( collection = '', collections = [] ) => { 

  const included = collections.includes( collection )
  if( !included ) throw new Error( `Collection ${ collection } is not allowed. ${ collections }`)

  return true;
}