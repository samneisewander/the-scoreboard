const mongoose = require('mongoose')

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI)
    .then((conn, err) =>{
        if (err) console.log('[mongoose] Connection failure.', err)
        else console.log('[mongoose] Connection successful!')
    })

const userSchema = new mongoose.Schema({
    
})
mongoose.model('User', userSchema)

module.exports = mongoose.connection