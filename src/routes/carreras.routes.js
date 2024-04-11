import {Router, response} from "express";
import {methods as carrerasController} from "./../controllers/carreras.controller"

const router=Router();

router.get("/",carrerasController.getCarreras);
router.get("/:idCarrera",carrerasController.getEspecialidad);
router.get("/:idCarrera/:Especialidad",carrerasController.getMaterias);
router.post("/",carrerasController.addCarreras);
router.delete("/:idCarrera",carrerasController.deleteCarrera);
router.put("/:idCarrera",carrerasController.updateCarrera);


export default router;