import is from "@sindresorhus/is";
import { catsService } from "../services/catsService";

class catsController {
  static getCats = async (req, res, next) => {
    try {
      const { id1, id2, id3 } = req.query;
      const findCat = await catsService.findCats({
        id1,
        id2,
        id3,
      });

      res.status(201).json(findCat);
    } catch (error) {
      next(error);
    }
  };
}

export { catsController };
