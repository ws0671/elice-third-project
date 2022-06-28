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
}

export { dogsController };
