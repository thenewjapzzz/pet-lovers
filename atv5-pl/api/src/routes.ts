import { Router } from 'express'
import { login } from './controllers/auth-controller'

const router = Router()

// Rota de login
router.post('/', login)

export default router