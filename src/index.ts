import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import config from './config'
import routes from './routes'
import errormiddleware from './middleware/errormiddleware'
dotenv.config()

const PORT = config.port || 3000
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan('short'))
app.use(express.json())
// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
})
app.use('/pages', routes)
app.use(errormiddleware)
// pg.connect().then((client)=>{
//   return client.query('SELECT NOW()').then((res)=>{
//     client.release
//     console.log(res.rows)
//   }).catch((err)=>{
//     client.release
//     console.log(err.stack)
//   })
// })

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})

export default app
