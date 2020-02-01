import Router from 'koa-router'

import TodoistController from 'controllers/todoists-controller'
import TodoistValidate from '../validators/todoists-schema'

const router = new Router()

router.get('/todoists', TodoistController.index)

router.post('/todoists', TodoistValidate.create(), TodoistController.create)

router.get('/todoists/:id', TodoistController.show)
router.put('/todoists/:id', TodoistValidate.update(), TodoistController.update)
router.delete('/todoists/:id', TodoistController.destroy)

export default router.routes()
