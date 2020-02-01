import Router from 'koa-router'
import users from './users-router'
import me from './me-router'
import todoists from './todoists-router'

const router = new Router()
const api = new Router()

api.use(users)
api.use(me)
api.use(todoists)

router.use('/v1', api.routes())

export default router
