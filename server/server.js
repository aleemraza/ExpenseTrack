const app  = require('./index')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})

// -----------------DBCONTECT------------//
require('./DB_CONECTION/DB_CONECTION')



// const port = 8080
app.set("PORT", 8080 || process.env.PORT)

app.listen(app.get('PORT'), '192.168.100.204', ()=>{
    console.log("http://192.168.100.204:" + app.get('PORT'));
})