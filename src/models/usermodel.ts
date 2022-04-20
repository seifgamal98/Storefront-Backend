import db from '../Database'
import config from '../config'
import bcrypt from 'bcrypt'
const hashedpassword = (password: string) => {
  const salt = parseInt(config.salt as unknown as string, 10)
  return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}
type User = {
  id?: string
  email: string
  firstname: string
  lastname: string
  password: string
}

class UserModel {
  async create(user: User): Promise<User> {
    try {
      const conn = await db.connect()
      const sqlQuery = `INSERT INTO users(email,firstname,lastname,password) VALUES ($1,$2,$3,$4) RETURNING id,email,firstname,lastname`
      const output = await conn.query(sqlQuery, [
        user.email,
        user.firstname,
        user.lastname,
        hashedpassword(user.password)
      ])
      conn.release()
      return output.rows[0]
    } catch (err) {
      throw new Error(`Unable to create a new user ${err}`)
    }
  }
  async index(): Promise<User[]> {
    //Show all the users
    try {
      const conn = await db.connect()
      const sqlQuery = `SELECT id,email,firstname,lastname FROM users`
      const output = await conn.query(sqlQuery)
      conn.release()
      return output.rows
    } catch (err) {
      throw new Error(`Unable to view all the users ${err}`)
    }
  }
  async show(id: string): Promise<User> {
    //Show one user
    try {
      const conn = await db.connect()
      const sqlQuery = `SELECT id,email,firstname,lastname FROM users WHERE id=($1)`
      const output = await conn.query(sqlQuery, [id])
      conn.release()
      return output.rows[0]
    } catch (err) {
      throw new Error(`Unable to view this user ${id} ${err}`)
    }
  }
  async delete(id: string): Promise<User> {
    //delete one user
    try {
      const conn = await db.connect()
      const sqlQuerystar = `DELETE FROM users WHERE id=($1) RETURNING id,email,firstname,lastname`
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
      throw new Error(`Unable to delete this user ${id} ${err}`)
    }
  }
  async update(user: User): Promise<User> {
    //Show one user
    try {
      const conn = await db.connect()
      const sqlQuery = `UPDATE users SET email=$1,firstname=$2,lastname=$3,password=$4 WHERE id=$5 RETURNING id,email,firstname,lastname`
      const sqlQuery_ = 'ALTER SEQUENCE productorder_id_seq RESTART WITH 1;'
      const sqlQuery11 = 'ALTER SEQUENCE products_id_seq RESTART WITH 1;'
      const sqlQuery22 = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1;'
      const sqlQuery33 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;'
      const output = await conn.query(sqlQuery, [
        user.email,
        user.firstname,
        user.lastname,
        hashedpassword(user.password),
        user.id
      ])
      await conn.query(sqlQuery_)
      await conn.query(sqlQuery11)
      await conn.query(sqlQuery22)
      await conn.query(sqlQuery33)
      conn.release()
      return output.rows[0]
    } catch (err) {
      throw new Error(`Unable to delete this user ${err}`)
    }
  }
  async authenticate(email: string, password: string): Promise<User | null> {
    //Authenticate one user
    try {
      const conn = await db.connect()
      const sqlQuery = `SELECT password FROM users WHERE email=$1`
      const output = await conn.query(sqlQuery, [email])
      if (output.rows.length) {
        const { password: hashedpassword2 } = output.rows[0]
        const correctpassword = bcrypt.compareSync(`${password}${config.pepper}`, hashedpassword2)
        if (correctpassword) {
          const sqlQuery2 = `SELECT id,email,firstname,lastname FROM users WHERE email=$1`
          const output2 = await conn.query(sqlQuery2, [email])
          return output2.rows[0]
        }
      }
      conn.release()
      return null
    } catch (err) {
      throw new Error(`Unable to login ${err}`)
    }
  }
}
export { UserModel, User }
