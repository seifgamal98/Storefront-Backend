import db from '../../Database'
import { User } from '../usermodel'
import { UserModel } from '../usermodel'

const usermodeltest = new UserModel()

describe('User Model Testing', () => {
  describe('Testing the exsistance of User Model Methods', () => {
    it('The Create Method exsists ', () => {
      expect(usermodeltest.create).toBeDefined()
    })
    it('The Show all users Method exsists ', () => {
      expect(usermodeltest.index).toBeDefined()
    })
    it('The Show one user Method exsists ', () => {
      expect(usermodeltest.show).toBeDefined()
    })
    it('The Authenticate Method exsists ', () => {
      expect(usermodeltest.authenticate).toBeDefined()
    })
    it('The Delete One User Method exsists ', () => {
      expect(usermodeltest.delete).toBeDefined()
    })
    it('The Update One User Method exsists ', () => {
      expect(usermodeltest.update).toBeDefined()
    })
  })
  describe('Testing the UserModel', () => {
    const testUser = {
      email: `seif.gamaltest@test.com`,
      firstname: `seif`,
      lastname: `gamaltest`,
      password: `test1234`
    } as User

    beforeAll(async () => {
      const createtestUser = await usermodeltest.create(testUser)
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
    it('Create method returing a user correctly', async () => {
      const testUser2 = await usermodeltest.create({
        email: `seif.gamaltest2@test.com`,
        firstname: `seif`,
        lastname: `gamaltest2`,
        password: `test1234`
      } as User)
      expect(testUser2).toEqual({
        id: testUser2.id as unknown as string,
        email: `seif.gamaltest2@test.com`,
        firstname: `seif`,
        lastname: `gamaltest2`
      } as User)
    })
    it('Returning all users method is working correctly', async () => {
      const AllUsers = await usermodeltest.index()
      expect(AllUsers.length).toBeGreaterThan(1)
    })
    it('Returning the asked for user correctly', async () => {
      const Oneuser = await usermodeltest.show(testUser.id as unknown as string)
      expect(Oneuser.id).toBe(testUser.id as unknown as string)
      expect(Oneuser.email).toBe(`seif.gamaltest@test.com`)
      expect(Oneuser.firstname).toBe(`seif`)
      expect(Oneuser.lastname).toBe(`gamaltest`)
    })
    it('Checking if the Authenticating methode is working', async () => {
      const UserAuth = await usermodeltest.authenticate(
        testUser.email,
        testUser.password as unknown as string
      )
      expect(UserAuth?.email).toBe(testUser.email)
      expect(UserAuth?.firstname).toBe(testUser.firstname)
      expect(UserAuth?.lastname).toBe(testUser.lastname)
    })
    it('Checking if the Delete methode is working', async () => {
      const Userdeleted = await usermodeltest.delete(testUser.id as unknown as string)
      expect(Userdeleted?.id).toBe(testUser.id)
      expect(Userdeleted?.email).toBe(testUser.email)
      expect(Userdeleted?.firstname).toBe(testUser.firstname)
      expect(Userdeleted?.lastname).toBe(testUser.lastname)
    })
    it('Checking if the Update methode is working', async () => {
      const testUser3 = await usermodeltest.create({
        email: `seif.gamaltest3@test.com`,
        firstname: `seif`,
        lastname: `gamaltest2`,
        password: `test1234`
      } as User)
      const Userupdated = await usermodeltest.update(testUser3)
      expect(Userupdated?.id).toBe(testUser3.id)
      expect(Userupdated?.email).toBe(testUser3.email)
      expect(Userupdated?.firstname).toBe(testUser3.firstname)
      expect(Userupdated?.lastname).toBe(testUser3.lastname)
    })
  })
})
