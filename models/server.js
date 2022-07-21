const express = require('express');
const cors = require('cors')
const morgan = require('morgan')


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 5000;

        //setting
        //middlewares
        this.middlewares()
        //routes
        this.routes()        
    }
    middlewares(){
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(morgan("dev"))
    }

    routes(){
        this.app.use('/', require('../routes'))
    }

    listen(){
        this.app.listen(this.port, ()=> console.log(`Server is runnig on port: ${this.port}`))
    }
}


module.exports = Server;