const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("MONGODB CONECTED")
})
.catch(error=>{
    console.error("ERROR:",error)
})