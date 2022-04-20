import db from '../Database'
type order = {
  id?: string
  status: string
  userid?: string
}

class OrderModel {
  async create(order: order): Promise<order> {
    try {
      const conn = await db.connect()
      const sqlQuery = `INSERT INTO orders(status,userid) VALUES ($1,$2) RETURNING id,status,userid`
      const output = await conn.query(sqlQuery, [order.status, order.userid])
      conn.release()
      return output.rows[0]
    } catch (err) {
      throw new Error(`unable to create a new order ${err}`)
    }
  }
  async delete(id: string): Promise<order> {
    //delete one order
    try {
      const conn = await db.connect()
      const sqlQuerystar = `DELETE FROM orders WHERE id=($1) RETURNING *`
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
      throw new Error(`Unable to delete this order ${id} ${err}`)
    }
  }
  async update(order: order): Promise<order> {
    //update one order
    try {
      const conn = await db.connect()
      const sqlQuery = `UPDATE orders SET status=$1,userid=$2 WHERE id=$3 RETURNING *`
      const sqlQuery_ = 'ALTER SEQUENCE productorder_id_seq RESTART WITH 1;'
      const sqlQuery11 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1;'
      const sqlQuery22 = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1;'
      const sqlQuery33 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;'
      const output = await conn.query(sqlQuery, [order.status, order.userid, order.id])
      await conn.query(sqlQuery_)
      await conn.query(sqlQuery11)
      await conn.query(sqlQuery22)
      await conn.query(sqlQuery33)
      conn.release()
      return output.rows[0]
    } catch (err) {
      throw new Error(`Unable to update this user 1 ${err}`)
    }
  }
  async addnewproducttoorder(quantity: number, orderid: string, productid: string): Promise<order> {
    try {
      const conn = await db.connect()
      const sqlQuery = `INSERT INTO productorder(quantity,orderid,productid) VALUES ($1,$2,$3) RETURNING id,quantity,orderid,productid`
      const output = await conn.query(sqlQuery, [quantity, orderid, productid])
      conn.release()
      return output.rows[0]
    } catch (err) {
      throw new Error(`can't add product to order ${err}`)
    }
  }
  async removeproductOForder(productid: string, orderid: string): Promise<order> {
    try {
      const conn = await db.connect()
      const sqlQuery = `DELETE FROM productorder WHERE productid=$1 AND orderid=$2 RETURNING *`
      const output = await conn.query(sqlQuery, [productid, orderid])
      conn.release()
      return output.rows[0]
    } catch (err) {
      throw new Error(`can't add product to order ${err}`)
    }
  }
  async Showorder(userid: string): Promise<order[]> {
    try {
      const conn = await db.connect()
      const sqlQuery = `SELECT * FROM orders INNER JOIN productorder ON orders.id=productorder.orderid  
                            INNER JOIN products ON productorder.productid=products.id  WHERE userid=($1)`
      const output = await conn.query(sqlQuery, [userid])
      conn.release()
      return output.rows
    } catch (err) {
      throw new Error(`can't show the user ${err}`)
    }
  }
  async indexOrders(): Promise<order[]> {
    try {
      const conn = await db.connect()
      const sqlQuery = `SELECT * FROM orders`
      const output = await conn.query(sqlQuery)
      conn.release()
      return output.rows
    } catch (err) {
      throw new Error(`can't show all orders  ${err}`)
    }
  }
}
export { OrderModel, order }
