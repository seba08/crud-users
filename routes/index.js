const { Router } = require('express')
const router = Router();

const fs = require('fs')

const PAHT_ROUTES = __dirname;

const removeExt = (filename)=>{
    return filename.split('.').shift()
}

fs.readdirSync(PAHT_ROUTES).filter(file=>{

    const name = removeExt(file);

    if(name != 'index'){
        router.use(`/${name}`, require(`./${file}`))
    }

    router.get('/', (req, res) =>{
        res.send("INDEX")
    })
})

module.exports = router;