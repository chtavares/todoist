export const up = knex =>
  knex.schema
    .createTable('users', table => {
      table
        .uuid('id')
        .unique()
        .primary()
        .notNullable()
      table
        .string('email')
        .unique()
        .notNullable()
      table.string('password').notNullable()
      table.timestamps(true, true)
    })
    .createTable('todoists', table => {
      table
        .uuid('id')
        .unique()
        .primary()
        .notNullable()
      table.string('text').notNullable()
      table.boolean('isChecked').defaultTo(false)
    })
    .createTable('todoists_users', table => {
      table
        .increments('id')
        .unique()
        .primary()
        .notNullable()
      table.uuid('user_id')
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
      table.uuid('todoist_id')
      table
        .foreign('todoist_id')
        .references('id')
        .inTable('todoists')
      table.timestamps(true, true)
    })

export const down = knex =>
  knex.schema
    .dropTableIfExists('todoists_users')
    .dropTableIfExists('users')
    .dropTableIfExists('todoists')
