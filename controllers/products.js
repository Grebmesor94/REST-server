import { request, response } from "express";
import { Product } from "../models/product.js";

export const productsGET = async( req = request, res = response ) => { 
  const { limit = 5, from = 0 } = req.query; 

  try {
    const [ products, total ] = await Promise.all([
      Product.find({ state: true })
        .skip( Number(from) ) //? desde donde se va a leer la informacion
        .limit( Number(limit) ) //? limite que vendra en la response
        .populate( 'user', 'name' ) 
        .populate( 'category', 'name' ), 
      Product.countDocuments({ state: true })
    ])

    res.json({ products, total });

  } catch (error) {
    res.status(400).json({ 
      msg: error
    })
  }
}
export const productGET = async( req = request, res = response ) => { 
  const { id } = req.params;

  try { 

    const product = await Product.findById({ id })
                          .populate( 'user', 'name' )
                          .populate( 'category', 'name' )

    res.json({ product })

  } catch ( error ) { 
    res.status(400).json({ msg: error })
  }
}
export const productsPOST = async( req = request, res = response ) => { 
  const { name, user, state, ...rest } = req.body;
  name = req.body.name.toUpperCase()

  try {
    const productDB = await Product.findOne({ name })
    if( productDB ) return res.status(400).json({
      msg: `Product ${ productDB.name } already exist`
    })

    const data = { 
      name, 
      ...rest,
      user: req.user._id
    }

    const product = new Product( data )
    product.save()

    res.status(201).json({ product })
  } catch (error) {
    res.status(400).json({ msg: error })
  }

}

export const productsPUT = async( req = request, res = response ) => { 
  const { id } = req.params;
  const { state, user, ...data } = req.body;
  data.name = data.name.toUpperCase();
  data.user = req.user._id

  try {
    const product = await Product.findByIdAndUpdate( id, data, { new: true } )
    res.json({ product })
  } catch (error) {
    res.status(400).json({ msg: error })
  }
}
export const productsDELETE = async( req = request, res = response ) => { 
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate( id, { state: false }, { new: true } )

  res.status(200).json({ category })
}