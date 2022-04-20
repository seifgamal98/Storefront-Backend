import supertest from 'supertest'
import db from '../../Database'
import { User } from '../../models/usermodel'
import { UserModel } from '../../models/usermodel'
import app from '../../index'
import exp from 'constants'
const UserModelroutetest = new UserModel()
const req = supertest(app)
let tokenWanted = ``
describe('Testing the user Endpoints', async () => {
  const testUser = {
    email: `test.test@test.com`,
    firstname: `test`,
    lastname: `test lastname`,
    password: `test1234`
  } as User

  beforeAll(async () => {
    const createtestUser = await UserModelroutetest.create(testUser)
    testUser.id = createtestUser.id
  })
  afterAll(async () => {
    const conn = await db.connect()
    const sqlQuery = 'DELETE FROM users;'
    const sqlQuery2 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;'
    await conn.query(sqlQuery)
    await conn.query(sqlQuery2)
    conn.release()
  })
  describe('Checking if the Authintication methods are working', () => {
    it('When Authentication should get a token', async () => {
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
  describe('Testing the Users API`s', () => {
    it('Testing the created new user API', async () => {
      const res = await req
        .post(`/pages/users/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${tokenWanted}`)
        .send({
          email: `test2.test2@test.com`,
          firstname: `test2`,
          lastname: `test2 lastname`,
          password: `test1234`
        } as User)
      expect(res.status).toBe(200)
      expect(res.status).toBeTruthy()
      const { email, firstname, lastname } = res.body.data.user
      // const{message}=res.body.message;
      expect(email).toBe(`test2.test2@test.com`)
      expect(firstname).toBe(`test2`)
      expect(lastname).toBe(`test2 lastname`)
      // expect(message).toBe('User Created')
    })
    it('Testing the show all users API', async () => {
      const res = await req
        .get(`/pages/users/`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${tokenWanted}`)
      expect(res.status).toBe(200)
      expect(res.status).toBeTruthy()
      expect(res.body.data.Allusers.length).toBeGreaterThanOrEqual(1)
    })
    it('Testing the show one user API', async () => {
      const res = await req
        .get(`/pages/users/${testUser.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${tokenWanted}`)
      expect(res.status).toBe(200)
      expect(res.status).toBeTruthy()
      expect(res.body.data.Oneuser.email).toBe(`test.test@test.com`)
      expect(res.body.data.Oneuser.firstname).toBe(`test`)
      expect(res.body.data.Oneuser.lastname).toBe(`test lastname`)
    })
    it('Testing the update one user API', async () => {
      const res = await req
        .patch(`/pages/users/${testUser.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${tokenWanted}`)
        .send({
          id: '1',
          email: 'rana.gamal99@gmail.com',
          firstname: 'rana',
          lastname: 'gamal',
          password: '1234'
        })
      expect(res.status).toBe(200)
      expect(res.status).toBeTruthy()
      expect(res.body.data.Updateduser.email).toBe('rana.gamal99@gmail.com')
      expect(res.body.data.Updateduser.firstname).toBe('rana')
      expect(res.body.data.Updateduser.lastname).toBe('gamal')
    })
    it('Testing the delete one user API', async () => {
      const res = await req
        .delete(`/pages/users/${testUser.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${tokenWanted}`)
      expect(res.status).toBe(200)
      expect(res.status).toBeTruthy()
      expect(res.body.data.Deleteduser.email).toBe('rana.gamal99@gmail.com')
      expect(res.body.data.Deleteduser.firstname).toBe('rana')
      expect(res.body.data.Deleteduser.lastname).toBe('gamal')
    })
  })
})
