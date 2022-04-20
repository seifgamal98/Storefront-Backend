import db from '../../Database'
import { order } from '../ordermodel'
import { OrderModel } from '../ordermodel'
import { User } from '../usermodel'
import { UserModel } from '../usermodel'
import { Product } from '../productmodel'
import { ProductsModel } from '../productmodel'

const ordermodeltest = new OrderModel()
const usermodeltest = new UserModel()
const productmodeltest = new ProductsModel()
describe('Order Model Testing', () => {
  describe('Testing the exsistance of Order Model Methods', () => {
    it('The Create Method exsists ', () => {
      expect(ordermodeltest.create).toBeDefined()
    })
    it('The add a product to the order Method exsists ', () => {
      expect(ordermodeltest.addnewproducttoorder).toBeDefined()
    })
    it('The Show one order using a user id Method exsists ', () => {
      expect(ordermodeltest.Showorder).toBeDefined()
    })
  })
  describe('Testing the OrderModel,', () => {
    const testUserorder = {
      email: `test.test@test.com`,
      firstname: `order user`,
      lastname: `test`,
      password: `test1234`
    } as User
    const testOrder = {
      status: `active`,
      userid: testUserorder.id as unknown as string
    } as order
    const productordertest = {
      price: 55,
      name: `testproduct`
    } as Product

    const testUserdelete = {
      email: `test.testdelete333@test.com`,
      firstname: `order user`,
      lastname: `test`,
      password: `test1234`
    } as User
    const testorderdelete = {
      status: `active`,
      userid: testUserdelete.id as unknown as string
    } as order

    beforeAll(async () => {
      const createtestUser = await usermodeltest.create(testUserorder)
      testUserorder.id = createtestUser.id
      const createtestOrder = await ordermodeltest.create(testOrder)
      testOrder.id = createtestOrder.id
      const createtestProduct = await productmodeltest.create(productordertest)
      productordertest.id = createtestProduct.id
      const createtestUserdelete = await usermodeltest.create(testUserdelete)
      testUserdelete.id = createtestUserdelete.id
      const createtestOrderdelete = await ordermodeltest.create(testorderdelete)
      testorderdelete.id = createtestOrderdelete.id
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
    it('Create method returing a order correctly', async () => {
      const testUser2 = await usermodeltest.create({
        email: `test2.test2@test.com`,
        firstname: `order user`,
        lastname: `test2`,
        password: `test1234`
      } as User)
      const testorder2 = await ordermodeltest.create({
        status: `complete`,
        userid: testUser2.id as unknown as string
      } as order)
      expect(testorder2).toEqual({
        id: testorder2.id as unknown as string,
        status: `complete`,
        userid: `3`
      } as order)
    })
    it('Returning all products method is working correctly', async () => {
      const Allorders = await ordermodeltest.indexOrders()
      expect(Allorders.length).toBeGreaterThan(1)
    })
    it('Adding a new product to the order correctly', async () => {
      // const productordertest = await productmodeltest.create({
      //     price: 55,
      //     name: `testproduct`
      //   } as Product)
      const productAdd = await ordermodeltest.addnewproducttoorder(
        4,
        testOrder.id as unknown as string,
        productordertest.id as unknown as string
      )
      expect(productAdd.id).toBe(1 as unknown as string)
      expect(productAdd).toBeTruthy()
    })
    it('removing a product of the order', async () => {
      const removeproduct = await ordermodeltest.removeproductOForder(
        productordertest.id as unknown as string,
        testOrder.id as unknown as string
      )
      expect(removeproduct.id).toBe(1 as unknown as string)
      expect(removeproduct).toBeTruthy()
    })
    it('Showing the order with one or more products is succssufull', async () => {
      const productordertest2 = await productmodeltest.create({
        price: 55,
        name: `testproduct2`
      } as Product)
      await ordermodeltest.addnewproducttoorder(
        5,
        testOrder.id as unknown as string,
        productordertest2.id as unknown as string
      )
      const productShow = await ordermodeltest.Showorder(testOrder.userid as unknown as string)
      expect(productShow).toBeTruthy()
    })
    it('Checking if the Update order method is working', async () => {
      const testUserdelete2 = await usermodeltest.create({
        email: `test.testdelet2e@test.com`,
        firstname: `order333 user`,
        lastname: `test33`,
        password: `test123433`
      } as User)
      const testorder3 = await ordermodeltest.create({
        status: `active`,
        userid: testUserdelete2.id as unknown as string
      } as order)
      const orderupdated = await ordermodeltest.update(testorder3)
      expect(orderupdated?.id).toBe(testorder3.id)
      expect(orderupdated?.status).toBe(testorder3.status)
      expect(orderupdated?.userid).toBe(testorder3.userid)
    })
    it('Checking if the Delete order method is working', async () => {
      const orderdeleted = await ordermodeltest.delete(testorderdelete.id as unknown as string)
      // expect(orderdeleted?.id).toBe(testorderdelete.id);
      // expect(orderdeleted?.status).toBe(testorderdelete.status);
      // expect(orderdeleted?.userid).toBe(testorderdelete.userid);
      expect(orderdeleted).toBeTruthy()
    })
  })
})
