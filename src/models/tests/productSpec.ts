import db from '../../Database'
import { Product } from '../productmodel'
import { ProductsModel } from '../productmodel'

const productmodeltest = new ProductsModel()

describe('Product Model Testing', () => {
  describe('Testing the exsistance of Product Model Methods', () => {
    it('The Create Method exsists ', () => {
      expect(productmodeltest.create).toBeDefined()
    })
    it('The Show all products Method exsists ', () => {
      expect(productmodeltest.index).toBeDefined()
    })
    it('The Show one product Method exsists ', () => {
      expect(productmodeltest.show).toBeDefined()
    })
    it('The Delete one product Method exsists ', () => {
      expect(productmodeltest.delete).toBeDefined()
    })
    it('The Update one product Method exsists ', () => {
      expect(productmodeltest.update).toBeDefined()
    })
  })
  describe('Testing the ProductModel', () => {
    const testproduct = {
      price: 40,
      name: `testproduct`
    } as Product

    beforeAll(async () => {
      const createtestProduct = await productmodeltest.create(testproduct)
      testproduct.id = createtestProduct.id
    })
    afterAll(async () => {
      const conn = await db.connect()
      const sqlQuery = 'DELETE FROM products;'
      const sqlQuery2 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1;'
      await conn.query(sqlQuery)
      await conn.query(sqlQuery2)
      conn.release()
    })
    it('Create method returing a product correctly', async () => {
      const productUser2 = await productmodeltest.create({
        price: 55,
        name: `testproduct2`
      } as Product)
      expect(productUser2).toEqual({
        id: productUser2.id as unknown as string,
        price: 55,
        name: `testproduct2`
      } as Product)
    })
    it('Returning all products method is working correctly', async () => {
      const Allproducts = await productmodeltest.index()
      expect(Allproducts.length).toBeGreaterThan(1)
    })
    it('Returning the asked for product correctly', async () => {
      const Oneproduct = await productmodeltest.show(testproduct.id as unknown as string)
      expect(Oneproduct.id).toBe(testproduct.id as unknown as string)
      expect(Oneproduct.price).toBe(40)
      expect(Oneproduct.name).toBe(`testproduct`)
    })
    it('Checking if the Delete product method is working', async () => {
      const productdeleted = await productmodeltest.delete(testproduct.id as unknown as string)
      expect(productdeleted?.id).toBe(testproduct.id)
      expect(productdeleted?.price).toBe(testproduct.price)
      expect(productdeleted?.name).toBe(testproduct.name)
    })
    it('Checking if the Update product method is working', async () => {
      const testUser3 = await productmodeltest.create({
        price: 60,
        name: `producttest2`
      } as Product)
      const productupdated = await productmodeltest.update(testUser3)
      expect(productupdated?.id).toBe(testUser3.id)
      expect(productupdated?.price).toBe(testUser3.price)
      expect(productupdated?.name).toBe(testUser3.name)
    })
  })
})
