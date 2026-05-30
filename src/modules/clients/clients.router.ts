import { Router } from 'express'
import * as clientController from './clients.controller'


const router = Router();

router.get("/",clientController.getAllClientsController);
router.get("/:id",clientController.getClientByIdController);
router.post("/", clientController.createClientController);
router.delete("/:id",clientController.deleteClientByIdController);
router.patch("/:id",clientController.updateClientByIdController);

export default router;