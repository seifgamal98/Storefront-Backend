import supertest from 'supertest'
import db from '../../Database'
import { Product } from '../../models/productmodel'
import { ProductsModel } from '../../models/productmodel'
import { User } from '../../models/usermodel'
import { UserModel } from '../../models/usermodel'
import { order } from '../../models/ordermodel'
import { OrderModel } from '../../models/ordermodel'
import app from '../../index'
const ordermodelRoutetest = new OrderModel()
const ProductsModelRoutetest = new ProductsModel()
const UserModelroutetest = new UserModel()
const req = supertest(app)
let tokenWanted = ``
describe('Testing the Product Endpoint', () => {
  const testUser = {
    email: `test.test@test.com`,
    firstname: `order user`,
    lastname: `test`,
    password: `test1234`
  } as User
  const testOrder = {
    status: `active`,
    userid: testUser.id as unknown as string
  } as order
  const testproduct = {
    price: 55,
    name: `testproduct`
  } as Product

  beforeAll(async () => {
    const createtestUser = await UserModelroutetest.create(testUser)
    testUser.id = createtestUser.id
    const createtestOrder = await ordermodelRoutetest.create(testOrder)
    testOrder.id = createtestOrder.id
    const createtestProduct = await ProductsModelRoutetest.create(testproduct)
    testproduct.id = createtestProduct.id
  })
  afterAll(async () => {
    const conn = await db.connect()
    const sqlQuery = 'DELETE FROM productorder;'
    const sqlQuery_ = 'ALTER SEQUENCE productorder_id_seq RESTART WITH 1;'
    const sqlQuery1 = 'DELETE FROM products;'
    const sqlQuery11 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1;'
    const sqlQuery2 = 'DELETE FROM orders;'
    const sqlQuery22 = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1;'
    const sqlQuery3 = 'DELETE FROM users;'
    const sqlQuery33 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;'
    await conn.query(sqlQuery)
    await conn.query(sqlQuery_)
    await conn.query(sqlQuery1)
    await conn.query(sqlQuery11)
    await conn.query(sqlQuery2)
    await conn.query(sqlQuery22)
    await conn.query(sqlQuery3)
    await conn.query(sqlQuery33)
    conn.release()
  })
  describe('Checking if the Authintication methods for testing an Order', () => {
    it('Creating and authenticating a user to provide a token for the Order', async () => {
      const res = await req
        .post(`/pages/users/authenticate/`)
        .set('Content-type', 'application/json')
        .send({
          email: `test.test@test.com`,
          password: 'test1234'
        })
      expect(res.status).toBe(200)
      const { id, email, firstname, lastname, Newtoken } = res.body.data
      expect(id).toBe(testUser.id)
      expect(email).toBe(testUser.email)
      tokenWanted = Newtoken
    })
  })
  describe('Testing the Orders API`s', () => {
    it('Testing the Create new Order API', async () => {
      const testUser2 = await UserModelroutetest.create({
        email: `test2.test2@test.com`,
        firstname: `order user`,
        lastname: `test2`,
        password: `test1234`
      } as User)
      const res = await req
        .post(`/pages/orders/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${tokenWanted}`)
        .send({
          status: `active`,
          userid: `${testUser2.id}`
        } as order)
      expect(res.status).toBe(200)
      expect(res.status).toBeTruthy()
      const { id, status, userid } = res.body.data.order
      expect(id).toBe(2)
      // As there is a Created order in the start with has to be done before the test
      expect(status).toBe(`active`)
      expect(userid).toBe(`${testUser2.id}`)
    })
    it('Testing the show all Orders API', async () => {
      const res = await req
        .get(`/pages/orders/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${tokenWanted}`)
      expect(res.status).toBe(200)
      expect(res.status).toBeTruthy()
      expect(res.body.data.Allorders.length).toBeGreaterThanOrEqual(1)
    })
    it('Testing the Add New Product API', async () => {
      const res = await req
        .post(`/pages/orders/${testOrder.id}/addproduct`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${tokenWanted}`)
        .send({
          quantity: 4,
          productid: `${testproduct.id}`
        })
      const { quantity, orderid, productid } = res.body.data.newproduct
      expect(res.status).toBe(200)
      expect(res.status).toBeTruthy()
      expect(quantity).toBe(4)
      expect(orderid).toBe(`${testOrder.id}`)
      expect(productid).toBe(`${testproduct.id}`)
    })
    it('Testing the delete one product API', async () => {
      const res = await req
        .delete(`/pages/orders/3`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${tokenWanted}`)
      expect(res.status).toBe(200)
      expect(res.status).toBeTruthy()
    })
    describe('add product', async () => {
      const res = await req
        .post(`/pages/orders/${testOrder.id}/addproduct`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${tokenWanted}`)
        .send({
          quantity: 4,
          productid: `${testproduct.id}`
        })
      it('Testing the show one Order API', async () => {
        const res = await req
          .get(`/pages/orders/${testOrder.userid}/`)
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${tokenWanted}`)
        expect(res.status).toBe(200)
        expect(res.status).toBeTruthy()
        expect(res.body.data.Oneorder.length).toBeGreaterThanOrEqual(1)
      })
      it('Testing the Remove Product API', async () => {
        const res = await req
          .delete(`/pages/orders/${testOrder.id}/removeproduct/${testproduct.id}`)
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${tokenWanted}`)
        // const{quantity,orderid,productid}=res.body.data.newproduct;
        expect(res.status).toBe(200)
        expect(res.status).toBeTruthy()
        expect(res.body.data.removeproduct.orderid).toBe(testOrder.id)
        expect(res.body.data.removeproduct.productid).toBe(testproduct.id)
      })
    })
    it('Testing the update one order API', async () => {
      const res = await req
        .patch(`/pages/orders/${testOrder.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${tokenWanted}`)
        .send({
          id: '1',
          status: 'active',
          userid: `${testUser.id}`
        })
      expect(res.status).toBe(200)
      expect(res.status).toBeTruthy()
      expect(res.body.data.Updatedorder.status).toBe('active')
      expect(res.body.data.Updatedorder.userid).toBe(`${testUser.id}`)
    })
  })
})
