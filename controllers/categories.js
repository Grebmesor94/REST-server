import { request, response } from "express";
import { Category } from "../models/category.js";
import User from "../models/user.js";


export const categoriesGET = async( req = request, res = response ) => { 
  const { limit = 5, from = 0 } = req.query;

  try {
    const [ categories, total ] = await Promise.all([
      Category.find({ state: true })
        .skip( Number(from) ) //? desde donde se va a leer la informacion
        .limit( Number(limit) ) //? limite que vendra en la response
        .populate( 'user', 'name' ), 
      Category.countDocuments({ state: true })
    ])

    res.json({ categories, total });

  } catch (error) {
    res.status(400).json({ 
      msg: error
    })
  }
}

export const categoryGET = async( req = request, res = response ) => { 
  const { id } = req.params;

  try { 

    const category = await Category.findById({ id }).populate( 'user', 'name' )
    res.json({ category })

  } catch ( error ) { 
    res.status(400).json({ msg: error })
  }
}

export const categoriesPOST = async( req = request, res = response ) => { 

  try {

    const name = req.body.name.toUpperCase()
    const categoryDB = await Category.findOne({ name })
    if( categoryDB ) return res.status(400).json({
      msg: `Category: ${ categoryDB.name } already exist`
    })

    const data = { 
      name, 
      user: req.user._id
    }

    const category = new Category( data )
    category.save()

    res.status(201).json({ category })

  } catch (error) {
    res.status(400).json({ msg: error })
  }
}

export const categoriesPUT = async( req = request, res = response ) => { 
  const { id } = req.params;
  const { state, user, ...data } = req.body;
  data.name = data.name.toUpperCase()
  data.user = req.user._id

  try {
    const category = await Category.findByIdAndUpdate( id, data, { new: true } )
    res.json({ category })
    
  } catch (error) {
    res.status(400).json({ msg: error })
  }
}

export const categoriesDELETE = async( req = request, res = response ) => { 
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate( id, { state: false }, { new: true } )

  res.status(200).json({ category })
}