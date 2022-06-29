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
  static catSearch = async (req, res, next) => {
    try {
      const { name } = req.query;
      const page = req.query.page || 1; //default 1페이지
      const perPage = req.query.perPage || 10; //default 10페이지

      const lastPage = await catsService.getLastPage({ name, perPage });
      const searchList = await catsService.getSearchList({
        name,
        page,
        perPage,
      });
      const listPaged = {
        lastPage,
        searchList,
      };
      res.status(200).json(listPaged);
    } catch (error) {
      next(error);
    }
  };
}

export { catsController };
