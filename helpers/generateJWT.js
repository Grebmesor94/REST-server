import jwt from 'jsonwebtoken'

export const generateJWT = ( uid = '' ) => { 

  return new Promise ( (resolve, reject) => { 

    const payload = { uid } ;
    jwt.sign( payload, process.env.SECRETORPRIVATEKEY, { 
      expiresIn: '1h',
      algorithm: 'HS256',
    }, ( error, token ) => { 
      if( error ) {
        console.log( error );
        reject('Token could not be generated')
      } else { 
        resolve( token )
      }
    })
  })  
}