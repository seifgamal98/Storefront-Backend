import { Request, Response } from 'express'
import Error from '../interfaces/interfaceerror'

const errormiddleware = (error: Error, req: Request, res: Response) => {
  const status = error.status || 500
  const message = error.message || `Wrong message`
  res.status(status).json({ status, message })
}
export default errormiddleware
