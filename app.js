const Server = require("./models/server");
require('dotenv').config()
require('./config/conexion')
const server = new Server()

server.listen()