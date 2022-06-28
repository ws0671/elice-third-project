import { DogsModel } from "../db";

class dogsService {
  static findDogs = async ({ id1, id2, id3 }) => {
    let dogs = [];
    const first = await DogsModel.findOne({ id: id1 });
    const second = await DogsModel.findOne({ id: id2 });
    const third = await DogsModel.findOne({ id: id3 });
    dogs.push(first);
    dogs.push(second);
    dogs.push(third);
    return dogs;
  };
}

export { dogsService };
