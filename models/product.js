import { model, Schema } from "mongoose";


const productSchema = Schema({
  name: { 
    type: String,
    required: [true, 'Name is required']
  },
  state: { 
    type: Boolean,
    default: true,
    required: true
  },
  price: { 
    type: Number,
    default: 0
  },
  category: { 
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  description: { type: String },
  available: { type: Boolean, default: true },
  img: { type: String },
  user: { 
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

productSchema.methods.toJSON = function() { 
  const { __v, state, ...data } = this.toObject();
  return data;
}

export const Product = model( 'Product', productSchema )