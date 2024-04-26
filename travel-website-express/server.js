import express from 'express'
import cors from 'cors'
import config from './config.js'
import productRoute from './routes/productRoute.js'

const app = express()

app.use(cors())
app.use(express.json())

//routes
app.use('/api', productRoute)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Internal Server Error')
})

app.listen(config.port, () => console.log(`Server is live @ ${config.hostUrl}`))
