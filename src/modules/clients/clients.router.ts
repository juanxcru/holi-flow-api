import { Router } from 'express'
import clientController from './clients.controller'


const router = Router();

router.get("/",clientController.getAll);
router.get("/:id",clientController.getOneById);
router.post("/", clientController.create);
router.delete("/:id",clientController.deleteById);
router.patch("/:id",clientController.updateById);

export default router;