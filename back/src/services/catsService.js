import { CatsModel } from "../db";

class catsService {
  static findCats = async ({ id1, id2, id3 }) => {
    let cats = [];
    const first = await CatsModel.findOne({ id: id1 });
    const second = await CatsModel.findOne({ id: id2 });
    const third = await CatsModel.findOne({ id: id3 });
    cats.push(first);
    cats.push(second);
    cats.push(third);
    return cats;
  };
}

export { catsService };
