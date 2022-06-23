import { scrapeShopItems } from "../common/scrapeShopItems";
import { Router } from "express";

const scrapeShopItemsRouter = Router();

scrapeShopItemsRouter.get("/shoppingList", async (req, res, next) => {
  try {
    const category = req.query.category;
    const shoppingList = await scrapeShopItems.getShoppingList(category);
    res.status(200).json(shoppingList);
  } catch (error) {
    next(error);
  }
});

export { scrapeShopItemsRouter };
