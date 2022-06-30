import is from "@sindresorhus/is";
import { dogsService } from "../services/dogsService";
import axios from "axios";

class dogsController {
  static getDogs = async (req, res, next) => {
    try {
      const { id1, id2, id3 } = req.query;
      const findDog = await dogsService.findDogs({
        id1,
        id2,
        id3,
      });

      res.status(201).json(findDog);
    } catch (error) {
      next(error);
    }
  };

  static dogSearch = async (req, res, next) => {
    try {
      const { name } = req.query;
      const page = req.query.page || 1; //default 1페이지
      const perPage = req.query.perPage || 10; //default 10페이지

      const lastPage = await dogsService.getLastPage({ name, perPage });
      const searchList = await dogsService.getSearchList({
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

export { dogsController };
