import { Router } from 'express'
import professionalController from './professionals.controller'


const router = Router();

router.get("/", professionalController.getAll);
router.get("/:id",professionalController.getOneById);
router.post("/", professionalController.create);
router.delete("/:id",professionalController.deleteById);
router.patch("/:id",professionalController.updateById);

export default router;