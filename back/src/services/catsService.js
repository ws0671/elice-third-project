import { CatsModel } from "../db";

class catsService {
  static findCats = async ({ catId }) => {
    const cats = await CatsModel.find({ id: catId });
    return cats;
  };
}

export { catsService };
