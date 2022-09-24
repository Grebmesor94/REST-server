import { response } from "express"
import { Types } from "mongoose"
import { Product } from "../models/product"
import { Category } from "../models/category"
import User from "../models/user"
import Role from "../models/role"

export const searchUsers = async( term = '', res = response ) => { 
  const isMongoID = Types.ObjectId.isValid( term )

  if( isMongoID ) { 
    const user = await User.findById( term )
    return res.json({ 
      results: ( user ) ? [ user ] : []
    })
  }

  const regexp = new RegExp( term, 'i' )
  const users = User.find({
    $or: [{ name: regexp }, { email: regexp }],
    $and: [{ state: true }]
  })

  res.json({ 
    results: [ users ]
  })
}

export const searchProducts = async( term = '', res = response ) => { 
  const isMongoID = Types.ObjectId.isValid( term )

  if( isMongoID ) { 
    const product = await Product.findById( term ).populate('category', 'name')
    return res.json({ 
      results: ( product ) ? [ product ] : []
    })
  }

  const regexp = new RegExp( term, 'i' )
  const products = Product.find({
    $and: [{ state: true }, { name: regexp }]
  }).populate('category', 'name')

  res.json({ 
    results: [ products ]
  })
}

export const searchCategories = async( term = '', res = response ) => { 
  const isMongoID = Types.ObjectId.isValid( term )

  if( isMongoID ) { 
    const category = await Category.findById( term )
    return res.json({ 
      results: ( category ) ? [ category ] : []
    })
  }

  const regexp = new RegExp( term, 'i' )
  const categories = Category.find({
    $and: [{ state: true }, { name: regexp }]
  })

  res.json({ 
    results: [ categories ]
  })
}