import User from 'models/User'
import bcrypt from 'bcryptjs'
import { Unauthorized, encryptPassword, generateJWTToken } from '../helpers'

const UsersController = {
  login: async ctx => {
    const { body } = ctx.request

    const user = await new User({ email: body.email }).fetch().catch(() => {
      throw Unauthorized('Unauthorized, User not found')
    })

    const isValid = await bcrypt.compare(
      body.password,
      user.attributes.password
    )

    if (!isValid) {
      throw Unauthorized('Unauthorized, password is invalid')
    }

    const parsedUser = user.toJSON()

    return {
      ...parsedUser,
      token: generateJWTToken({ id: parsedUser.id, role: parsedUser.role })
    }
  },

  index: () => new User().fetchAll({ withRelated: ['todoists'] }),

  show: ctx =>
    new User({ id: ctx.params.id }).fetch({ withRelated: ['todoists'] }),

  create: async ctx => {
    const { body } = ctx.request

    return new User({
      email: body.email,
      password: await encryptPassword(body.password)
    }).save()
  },

  update: async ctx => {
    const { body } = ctx.request

    return new User({ id: ctx.params.id }).save(
      {
        email: body.email,
        password: await encryptPassword(body.password)
      },
      { method: 'update' }
    )
  },

  destroy: ctx => new User({ id: ctx.params.id }).destroy()
}

export default UsersController
