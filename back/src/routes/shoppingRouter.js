import { Router } from "express";
import "dotenv/config";
import { shoppingController } from "../controllers/shoppingController";

const shoppingRouter = Router();

shoppingRouter.get("/search/shop", shoppingController.connectNaverApi);

export { shoppingRouter };
