import { request, response } from "express";
import { searchCategories, searchProducts, searchUsers } from "../helpers/search";

const allowedCollections = [
  'users',
  'categories',
  'products'
]

export const search = ( req = request, res = response) => { 

  const { collection, term } = req.params;

  if( !allowedCollections.includes( collection ) ) return res.status(400).json({
    msg: `Allowed Collections are: ${ allowedCollections }`
  })

  switch ( collection ) {
    case 'users':
      searchUsers( term, res )
      break;
    case 'categories':
      searchCategories( term, res )
      break;
    case 'products':
      searchProducts( term, res )
      break;
    default:
      res.status(500).json({
        msg: 'Forgot to do this search'
      })
  }
  
  res.json({ 
    collection, term
  })


}