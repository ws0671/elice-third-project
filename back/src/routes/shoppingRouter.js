import { Router } from "express";
import "dotenv/config";
import { shoppingController } from "../controllers/shoppingController";

const shoppingRouter = Router();

shoppingRouter.get("/shop/search", shoppingController.connectNaverApi);

export { shoppingRouter };
