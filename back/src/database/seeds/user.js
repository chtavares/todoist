import uuidv4 from 'uuid/v4'

import { encryptPassword } from '../../helpers/password'

export const seed = async knex => {
  await knex('users').del()
  await knex('users').insert([
    {
      id: uuidv4(),
      email: 'christian.tavares@nave.rs',
      password: await encryptPassword('teste1'),
      created_at: new Date(),
      updated_at: new Date()
    }
  ])
}
