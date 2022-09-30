import { model } from "mongoose";
import { Product } from "../models/product";
import User from "../models/user";

export const getModel = async( collection = '', id = '' ) => { 

  switch ( collection ) {
    case 'users':
      try {
        
        model = await User.findById( id )
        return model;
        
      } catch (error) {
        console.log(error);
      } 
    case 'products':
      try {
        
        model = await Product.findById( id )
        return model;
        
      } catch (error) {
        console.log(error);
      } 
    default:
      return null;
  }
}