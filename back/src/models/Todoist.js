import bookshelf, { Model } from 'models'
import User from './User'

const todoist = Model({
  tableName: 'todoists',
  uuid: true,
  users: function() {
    return this.belongsToMany(User)
  }
})

export default todoist
