require('dotenv').config();
const sequelize = require('./db')
const express = require('express');
const models = require('./models/model');
const cors = require('cors');
const router = require("./router/index");
const errorHandler = require('./middleware/ErrroHandler')

const app = express()
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

app.get("/", (req, res) => {
    res.status(200).json({message: "Welcome to the server"})
})

const start = async ()=>{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(process.env.PORT, () => {console.log('server started!')});
    }catch(err){
        console.log(err)
    }
}

start()