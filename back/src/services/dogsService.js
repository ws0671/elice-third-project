import { DogsModel } from "../db";

class dogsService {
  static findDogs = async ({ dogId }) => {
    const dogs = await DogsModel.find({ id: dogId });
    return dogs;
  };
}

export { dogsService };
