import is from "@sindresorhus/is";
import { catsService } from "../services/catsService";

class catsController {
  static getCats = async (req, res, next) => {
    try {
      const { catId } = req.query;
      const findCat = await catsService.findCats({
        catId,
      });

      res.status(201).json(findCat);
    } catch (error) {
      next(error);
    }
  };
}

export { catsController };
