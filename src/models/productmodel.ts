import db from '../Database'
type Product = {
  id?: string
  price: number
  name: string
}

class ProductsModel {
  async create(product: Product): Promise<Product> {
    try {
      const conn = await db.connect()
      const sqlQuery = `INSERT INTO products(name,price) VALUES ($1,$2) RETURNING id,name,price`
      const output = await conn.query(sqlQuery, [product.name, product.price])
      conn.release()
      return output.rows[0]
    } catch (err) {
      throw new Error(`Unable to create a new product ${err}`)
    }
  }
  async index(): Promise<Product[]> {
    //Show all the users
    try {
      const conn = await db.connect()
      const sqlQuery = `SELECT id,name,price FROM products`
      const output = await conn.query(sqlQuery)
      conn.release()
      return output.rows
    } catch (err) {
      throw new Error(`unable to view all the products ${err}`)
    }
  }
  async show(id: string): Promise<Product> {
    //Show one user
    try {
      const conn = await db.connect()
      const sqlQuery = `SELECT id,name,price FROM products WHERE id=($1)`
      const output = await conn.query(sqlQuery, [id])
      conn.release()
      return output.rows[0]
    } catch (err) {
      throw new Error(`unable to view this product ${id} ${err}`)
    }
  }
  async delete(id: string): Promise<Product> {
    //delete one user
    try {
      const conn = await db.connect()
      const sqlQuerystar = `DELETE FROM products WHERE id=($1) RETURNING *`
      const output = await conn.query(sqlQuerystar, [id])
      const sqlQuery_ = 'ALTER SEQUENCE productorder_id_seq RESTART WITH 1;'
      const sqlQuery11 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1;'
      const sqlQuery22 = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1;'
      const sqlQuery33 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;'
      await conn.query(sqlQuery_)
      await conn.query(sqlQuery11)
      await conn.query(sqlQuery22)
      await conn.query(sqlQuery33)
      conn.release()
      return output.rows[0]
    } catch (err) {
      throw new Error(`Unable to delete this product ${id} ${err}`)
    }
  }
  async update(product: Product): Promise<Product> {
    //update one user
    try {
      const conn = await db.connect()
      const sqlQuery = `UPDATE products SET price=$1,name=$2 WHERE id=$3 RETURNING *`
      const sqlQuery_ = 'ALTER SEQUENCE productorder_id_seq RESTART WITH 1;'
      const sqlQuery11 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1;'
      const sqlQuery22 = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1;'
      const sqlQuery33 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;'
      const output = await conn.query(sqlQuery, [product.price, product.name, product.id])
      await conn.query(sqlQuery_)
      await conn.query(sqlQuery11)
      await conn.query(sqlQuery22)
      await conn.query(sqlQuery33)
      conn.release()
      return output.rows[0]
    } catch (err) {
      throw new Error(`Unable to update this user ${err}`)
    }
  }
}
export { ProductsModel, Product }
