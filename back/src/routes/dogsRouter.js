import { Router } from "express";
import { dogsController } from "../controllers/dogsController";

const dogsRouter = Router();

dogsRouter.get("/dogs", dogsController.getDogs);
dogsRouter.post("/dogs", dogsController.findDogs);

export { dogsRouter };
