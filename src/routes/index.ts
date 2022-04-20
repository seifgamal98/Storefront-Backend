import { Router } from 'express'
import user_routes from './pages/user_route'
import product_routes from './pages/product_route'
import order_routes from './pages/order_route'
const routes = Router()

routes.use('/users', user_routes)
routes.use('/products', product_routes)
routes.use('/orders', order_routes)

export default routes
