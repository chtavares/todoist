import Todoist from 'models/Todoist'
import bcrypt from 'bcryptjs'
import { Unauthorized, encryptPassword, generateJWTToken } from '../helpers'

const TodoistsController = {
  index: () => new Todoist().fetchAll(),

  show: ctx => new Todoist({ id: ctx.params.id }).fetch(),

  create: async ctx => {
    const { body } = ctx.request

    const todoist = await new Todoist({
      text: body.text,
      isChecked: body.isChecked
    }).save()

    await todoist.related('users').attach({ user_id: ctx.state.user.id })

    return todoist
  },

  update: async ctx => {
    const { body } = ctx.request

    return new Todoist({ id: ctx.params.id }).save(
      {
        text: body.text,
        isChecked: body.isChecked
      },
      { method: 'update' }
    )
  },

  destroy: async ctx => {
    const todoist = await new Todoist({ id: ctx.params.id }).fetch()
    await todoist.related('users').detach(null)
    return new Todoist({ id: ctx.params.id }).destroy()
  }
}

export default TodoistsController
