import Router from 'koa-router'
import getHealth from './health/health'


const router = new Router()

router.get('/health', getHealth)




export default router