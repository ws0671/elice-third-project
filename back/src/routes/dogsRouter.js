import { Router } from "express";
import { dogsController } from "../controllers/dogsController";

const dogsRouter = Router();

dogsRouter.get("/dogs", dogsController.getDogs);

export { dogsRouter };
