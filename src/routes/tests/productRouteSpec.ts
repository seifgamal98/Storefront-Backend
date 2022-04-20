import supertest from 'supertest'
import db from '../../Database'
import { Product } from '../../models/productmodel'
import { ProductsModel } from '../../models/productmodel'
import { User } from '../../models/usermodel'
import { UserModel } from '../../models/usermodel'
import app from '../../index'
const ProductsModelRoutetest = new ProductsModel()
const UserModelroutetest = new UserModel()
const req = supertest(app)
let tokenWanted = ``
describe('Testing the Product Endpoint', () => {
  const testproduct = {
    price: 40,
    name: `testproduct`
  } as Product
  const testUser = {
    email: `test.test@test.com`,
    firstname: `test`,
    lastname: `test lastname`,
    password: `test1234`
  } as User

  beforeAll(async () => {
    const createtestProduct = await ProductsModelRoutetest.create(testproduct)
    testproduct.id = createtestProduct.id
    const createtestUser = await UserModelroutetest.create(testUser)
    testUser.id = createtestUser.id
  })
  afterAll(async () => {
    const conn = await db.connect()
    const sqlQuery1 = 'DELETE FROM products;'
    const sqlQuery2 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1;'
    const sqlQuery3 = 'DELETE FROM users;'
    const sqlQuery4 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;'
    await conn.query(sqlQuery1)
    await conn.query(sqlQuery2)
    await conn.query(sqlQuery3)
    await conn.query(sqlQuery4)
    conn.release()
  })
  describe('Checking if the Authintication methods for testing a Product', () => {
    it('Creating and authenticating a user to provide a token for the Product', async () => {
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
  describe('Testing the Products API`s', () => {
    it('Testing the Create new product API', async () => {
      const res = await req
        .post(`/pages/products/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${tokenWanted}`)
        .send({
          price: 55,
          name: `testproduct2`
        } as Product)
      expect(res.status).toBe(200)
      expect(res.status).toBeTruthy()
      const { price, name } = res.body.data.product
      // const{message}=res.body.message;
      expect(price).toBe(55)
      expect(name).toBe(`testproduct2`)
      // expect(message).toBe('User Created')
    })
    it('Testing the show all products API', async () => {
      const res = await req
        .get(`/pages/products/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${tokenWanted}`)
      expect(res.status).toBe(200)
      expect(res.status).toBeTruthy()
      expect(res.body.data.Allproducts.length).toBeGreaterThanOrEqual(1)
    })
    it('Testing the one user API', async () => {
      const res = await req
        .get(`/pages/products/${testproduct.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${tokenWanted}`)
      expect(res.status).toBe(200)
      expect(res.status).toBeTruthy()
      expect(res.body.data.Oneproduct.price).toBe(testproduct.price)
      expect(res.body.data.Oneproduct.name).toBe(`testproduct`)
    })
    it('Testing the update one product API', async () => {
      const res = await req
        .patch(`/pages/products/${testproduct.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${tokenWanted}`)
        .send({
          id: '1',
          price: 50,
          name: 'apple'
        })
      expect(res.status).toBe(200)
      expect(res.status).toBeTruthy()
      expect(res.body.data.Updatedproduct.price).toBe(50)
      expect(res.body.data.Updatedproduct.name).toBe('apple')
    })
    it('Testing the delete one product API', async () => {
      const res = await req
        .delete(`/pages/products/${testproduct.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${tokenWanted}`)
      expect(res.status).toBe(200)
      expect(res.status).toBeTruthy()
      expect(res.body.data.Deletedproduct.price).toBe(50)
      expect(res.body.data.Deletedproduct.name).toBe('apple')
    })
  })
})
