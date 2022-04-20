import { Router, Request, Response, NextFunction } from 'express'
import { ProductsModel } from '../../models/productmodel'
import tokenvalidatormiddleware from '../../middleware/authmiddleware'

const routes = Router()
const ProductsModelnew = new ProductsModel()
routes.post(
  '/',
  tokenvalidatormiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    // Create the product api
    try {
      const product = await ProductsModelnew.create(req.body)
      res.json({
        data: { product },
        message: 'product Created'
      })
    } catch (error) {
      next(error)
    }
  }
)
routes.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // Show all product api
  try {
    const Allproducts = await ProductsModelnew.index()
    res.json({
      data: { Allproducts },
      message: 'All Products are shown successfully'
    })
  } catch (error) {
    next(error)
  }
})
routes.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  // Show one product api
  try {
    const Oneproduct = await ProductsModelnew.show(req.params.id as unknown as string)
    res.json({
      data: { Oneproduct },
      message: 'This One product is shown successfully'
    })
  } catch (error) {
    next(error)
  }
})
routes.delete(
  '/:id',
  tokenvalidatormiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    // delete one user api
    try {
      const Deletedproduct = await ProductsModelnew.delete(req.params.id as unknown as string)
      res.json({
        data: { Deletedproduct },
        message: 'This One product is Deleted successfully'
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
    // update one user api
    try {
      const Updatedproduct = await ProductsModelnew.update(req.body)
      res.json({
        data: { Updatedproduct },
        message: 'This One product is updated successfully'
      })
    } catch (error) {
      next(error)
    }
  }
)
export default routes
