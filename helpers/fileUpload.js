import path from "path";
import url from 'url'

import { v4 as uuidv4 } from 'uuid';

const __dirname = url.fileURLToPath( new URL( '.', import.meta.url ) );
// const __filename = url.fileURLToPath( import.meta.url );

export const fileUploadHelper = ( files , validExtensions = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '' ) => {
  return new Promise( ( resolve, reject ) => { 
    
    const { file } = files;
    const splitName = file.name.split('.')
    const extension = splitName[ splitName.length - 1 ]
  
    //validar extension
    if( !validExtensions.includes( extension ) ) {
      return reject(`Invalid file extension, valid extensions: ${ validExtensions }`)
    }
  
    const tempName = uuidv4() + '.' + extension;
    const uploadPath = path.join( __dirname, '../uploads/', carpeta, tempName ) 
  
    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, (err) => {
      if (err){ 
        reject( err )
      } 
      resolve( tempName );
    });
  }) 
}