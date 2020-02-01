import Joi from '@hapi/joi'

import { validateSchema } from 'helpers'

const TodoistsValidate = {
  create: () =>
    validateSchema({
      body: {
        text: Joi.string().required(),
        isChecked: Joi.boolean().optional()
      }
    }),

  update: () =>
    validateSchema({
      body: {
        text: Joi.string().optional(),
        isChecked: Joi.boolean().optional()
      }
    })
}

export default TodoistsValidate
