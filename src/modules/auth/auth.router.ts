import { Request, Response, Router } from 'express'
import * as authController from './auth.controller'

const router = Router()

router.post('/register', authController.registerController);

router.post('/login', authController.loginController);

export default router