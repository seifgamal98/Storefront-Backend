import { Request, Response, NextFunction } from 'express'
import Jwt from 'jsonwebtoken'
import config from '../config'
import Error from '../interfaces/interfaceerror'

const tokenvalidatormiddleware = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const header = req.get('Authorization')
    if (header) {
      const incomingstring = header.split(' ')[0].toLowerCase()
      const incomingtoken = header.split(' ')[1]
      if (incomingtoken && incomingstring === 'bearer') {
        const decoder = Jwt.verify(incomingtoken, config.secerttoken as unknown as string)
        if (decoder) {
          next()
        } else {
          const error1: Error = new Error(`wrong decoder`)
          error1.status = 401
          next(error1)
        }
      } else {
        const error1: Error = new Error(`token type not bearer or the token doesnot exsist`)
        error1.status = 401
        next(error1)
      }
    } else {
      const error1: Error = new Error(`there are no token present`)
      error1.status = 401
      next(error1)
    }
  } catch (error) {
    const error1: Error = new Error('error while login')
    error1.status = 401
    next(error1)
  }
}
export default tokenvalidatormiddleware
