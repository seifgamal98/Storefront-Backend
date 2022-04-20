import { Router, Request, Response, NextFunction } from 'express'
import { OrderModel } from '../../models/ordermodel'
import tokenvalidatormiddleware from '../../middleware/authmiddleware'
const routes = Router()
const OrderModelnew = new OrderModel()
routes.post(
  '/',
  tokenvalidatormiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    // Create the product api
    try {
      const order = await OrderModelnew.create(req.body)
      res.json({
        data: { order },
        message: 'Order Created'
      })
    } catch (error) {
      next(error)
    }
  }
)
routes.post(
  '/:id/addproduct',
  tokenvalidatormiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    // Show one product to order api
    try {
      const newproduct = await OrderModelnew.addnewproducttoorder(
        req.body.quantity,
        req.params.id as unknown as string,
        req.body.productid
      )
      res.json({
        data: { newproduct },
        message: 'This product is shown succssuffly'
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
    // Show one order api
    try {
      const Oneorder = await OrderModelnew.Showorder(req.params.id)
      res.json({
        data: { Oneorder },
        message: 'This order is shown succssuffly'
      })
    } catch (error) {
      next(error)
    }
  }
)
routes.get(
  '/',
  tokenvalidatormiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    // Show All order api
    try {
      const Allorders = await OrderModelnew.indexOrders()
      res.json({
        data: { Allorders },
        message: 'All orders is shown succssuffly'
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
    // delete one order api
    try {
      const Deletedorder = await OrderModelnew.delete(req.params.id as unknown as string)
      res.json({
        data: { Deletedorder },
        message: 'This One order is Deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }
)
routes.delete(
  '/:orderid/removeproduct/:productid',
  tokenvalidatormiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    // delete one order api
    try {
      const removeproduct = await OrderModelnew.removeproductOForder(
        req.params.orderid as unknown as string,
        req.params.productid as unknown as string
      )
      res.json({
        data: { removeproduct },
        message: 'This One product is removed from the order successfully'
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
    // update one order api
    try {
      const Updatedorder = await OrderModelnew.update(req.body)
      res.json({
        data: { Updatedorder },
        message: 'This One order is updated successfully'
      })
    } catch (error) {
      next(error)
    }
  }
)
export default routes
