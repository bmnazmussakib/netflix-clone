const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const cors = require('cors')


const authRouter = require('./routes/authRoute')
const userRouter = require('./routes/usersRoute')
const app = express()
const port = 4000 


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())

dotenv.config()



const main = async () => {
  await mongoose.connect(process.env.MONGO_URL);
}

main().then(()=>console.log("🧡 Database Connection Successful🧡")).catch(err => console.log(err));





app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})