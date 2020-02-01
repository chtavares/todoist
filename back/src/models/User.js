import bookshelf, { Model } from 'models'
import Todoist from './Todoist'

const user = Model({
  tableName: 'users',
  uuid: true,
  todoists: function() {
    return this.belongsToMany(Todoist)
  },
  toJSON: function() {
    const { password, ...user } = bookshelf.Model.prototype.toJSON.apply(
      this,
      arguments
    )

    return user
  }
})

export default user
