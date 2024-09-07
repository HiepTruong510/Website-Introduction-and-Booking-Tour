require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
var cors = require('cors');
const mongoose = require('mongoose')

const authRouter = require('./routes/auth')
const userinfoRouter = require('./routes/userinfo')
const tourRouter = require('./routes/tour')
const booktourRouter = require('./routes/booktour')
const contactRouter = require('./routes/contact')

const connetcDB = async () => {
    try
    {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD }@doanweb.aco1i0s.mongodb.net/?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true
        })
        console.log('mongoDB connected')
    }catch (error){
        console.log(error.message)
        process.exit(1)
    }
}

connetcDB()

const app = express()
app.use(express.json())
app.use(bodyParser.json());
app.use(cors());

//app.get('/', (req, res) => res.send('hello word'))
app.use('/api/auth', authRouter)
app.use('/api/userinfos', userinfoRouter)
app.use('/api/tours', tourRouter)
app.use('/api/booktours', booktourRouter)
app.use('/api/contacts', contactRouter)

const PORT = 5001

app.listen(PORT, () => console.log(`server start on port ${PORT}`))

