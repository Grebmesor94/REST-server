import dotenv from 'dotenv'
import Server from './models/server.js'
import router from './routes/user.js'

dotenv.config()
const server = new Server()

server.listen()


