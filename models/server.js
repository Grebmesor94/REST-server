import express from 'express'
import cors from 'cors'
import router from '../routes/user.js'
import { dbConnection } from '../db/config.js'

export default class Server { 

  constructor(){ 
    this.app = express()
    this.port = process.env.PORT
    this.usuariosPath = '/api/users'

    //conectar DB
    this.connectDB();
    // middleware
    this.middlewares();
    //rutas
    this.routes();
  }

  async connectDB() { 
    await dbConnection()
  }

  middlewares(){
    // cors
    this.app.use( cors() )
    // lectura y parseo del body
    this.app.use( express.json() )
    //directorio publico 
    this.app.use( express.static('public') )
  }

  routes() { 
    this.app.use(this.usuariosPath, router )
  }
  listen() {
    this.app.listen(this.port, () => { 
      console.log('running on port: ', this.port);
    })
  }
}
