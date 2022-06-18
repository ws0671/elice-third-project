import { OutsideApi } from "../common/OutsideApi";
import { Router } from "express";

const OutsideApiRouter = Router();

OutsideApiRouter.get("/shoppingList", async (req, res, next) => {
  try {
    const category = req.query.category;
    const shoppingList = await OutsideApi.getShoppingList(category);
    res.status(200).json(shoppingList);
  } catch (error) {
    next(error);
  }
});

export { OutsideApiRouter };
