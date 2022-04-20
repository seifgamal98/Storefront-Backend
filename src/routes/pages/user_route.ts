import { Router, Request, Response, NextFunction } from 'express'
import { UserModel } from '../../models/usermodel'
import Jwt from 'jsonwebtoken'
import config from '../../config'
import tokenvalidatormiddleware from '../../middleware/authmiddleware'
const routes = Router()
const UserModelnew = new UserModel()
routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
  // Create the user api
  try {
    const user = await UserModelnew.create(req.body)
    res.json({
      data: { user },
      message: 'User Created'
    })
  } catch (error) {
    next(error)
  }
})
routes.get(
  '/',
  tokenvalidatormiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    // Show all users api
    try {
      const Allusers = await UserModelnew.index()
      res.json({
        data: { Allusers },
        message: 'All Users are shown successfully'
      })
    } catch (error) {
      next(error)
    }
  }
)
routes.get(
  '/:id',
  tokenvalidatormiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    // Show one user api
    try {
      const Oneuser = await UserModelnew.show(req.params.id as unknown as string)
      res.json({
        data: { Oneuser },
        message: 'This One Users is shown successfully'
      })
    } catch (error) {
      next(error)
    }
  }
)
routes.delete(
  '/:id',
  tokenvalidatormiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    // Show one user api
    try {
      const Deleteduser = await UserModelnew.delete(req.params.id as unknown as string)
      res.json({
        data: { Deleteduser },
        message: 'This One Users is Deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }
)
routes.patch(
  '/:id',
  tokenvalidatormiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    // Show one user api
    try {
      const Updateduser = await UserModelnew.update(req.body)
      res.json({
        data: { Updateduser },
        message: 'This One Users is updated successfully'
      })
    } catch (error) {
      next(error)
    }
  }
)
routes.post('/authenticate', async (req: Request, res: Response, next: NextFunction) => {
  // Authenticate the user
  try {
    const { email, password } = req.body
    const Authuser = await UserModelnew.authenticate(email, password)
    const Newtoken = Jwt.sign({ Authuser }, config.secerttoken as unknown as string)
    if (!Authuser) {
      res.json({
        data: Authuser,
        message: 'The user email or password do not match'
      })
    }
    res.json({
      data: { ...Authuser, Newtoken },
      message: 'The user is available'
    })
  } catch (error) {
    next(error)
  }
})
export default routes
