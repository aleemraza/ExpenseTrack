const app  = require('./index')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})

// -----------------DBCONTECT------------//
require('./DB_CONECTION/DB_CONECTION')



const port = 8080

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})