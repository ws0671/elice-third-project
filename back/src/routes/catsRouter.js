import { Router } from "express";
import { catsController } from "../controllers/catsController";

const catsRouter = Router();

catsRouter.get("/cats", catsController.getCats);

export { catsRouter };
