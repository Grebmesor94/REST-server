import { request, response } from "express";
import { fileUploadHelper } from "../helpers/fileUpload";
import path from 'path'
import { fileURLToPath } from "url";
import fs from 'fs'
import { getModel } from "../helpers/getModel";
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config( process.env.CLOUDINARY_URL )
const __dirname = fileURLToPath( new URL( '.', import.meta.url ) )

export const fileUpload = async( req = request, res = response ) => { 

  try {   
    const fileName = await fileUploadHelper( req.files, undefined , 'images' ) //? undefined para mandar argumentos por defecto
    res.json({ name: fileName })
  } catch ( msg ) {
    res.status(400).json({ msg })
  }
  
}

export const updateImage = async( req = request, res = response ) => { 
  const { collection, id } = req.params

  let model = await getModel( collection, id )
  if( !model ) return res.status(400).json({ msg: `Does not exist an user with id: ${ id }`})

  //borrar las imagenes
  if( model.img ) { 
    const imgPath = path.join( __dirname, '../uploads/', collection, model.img )
    if( fs.existsSync( imgPath ) ) fs.unlinkSync( imgPath ) 
    //
    //? unlinksync sirve para borrar un archivo del filesystem del server
    //
  }

  model.img = await fileUploadHelper( req.files, undefined , collection )
  await model.save()

  res.json({ model })

}

export const updateImageCloudinary = async( req = request, res = response ) => { 
  const { collection, id } = req.params

  let model = await getModel( collection, id )
  if( !model ) return res.status(400).json({ msg: `Does not exist an user with id: ${ id }`})

  //borrar las imagenes
  if( model.img ) { 
    const nameArr = model.img.split('/')
    const name = nameArr[ nameArr.length - 1 ]
    const [ public_id ] = name.split('.')
    cloudinary.uploader.destroy( public_id );
  }

  const { tempFilePath } = req.files.file
  const { secure_url } = await cloudinary.uploader.upload( tempFilePath )
  model.img = secure_url;

  await model.save()

  res.json({ model })

}

export const showImage = async( req = request, res = response ) => { 
  const { collection, id } = request.params

  let model = await getModel( collection, id )
  if( !model ) return res.status(400).json({ msg: `Does not exist an user with id: ${ id }`})

  if( model.img ) { 

    const imgPath = path.join( __dirname, '../uploads/', collection, model.img )

    if( fs.existsSync( imgPath ) ) return res.sendFile( img )
    
  }

  const imgPath = path.join( __dirname, '../assets/no-image.png')
  res.sendFile( imgPath )

}

