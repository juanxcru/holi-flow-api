import { Router } from 'express'
import * as clientController from './clients.controller'


const router = Router();

router.get("/",clientController.getAllClientsController);


export default router;