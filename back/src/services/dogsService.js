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
  //name로 검색한 dogs 목록의 마지막 페이지 반환
  static async getLastPage({ name, perPage }) {
    const dogList = await DogsModel.countDocuments({
      nameKor: { $regex: name, $options: "i" },
    });
    const lastPage = Math.ceil(dogList / perPage);
    return lastPage;
  }

  // name으로 dogs리스트를 찾아 페이징처리하여 반환하는 함수
  static async getSearchList({ name, page, perPage }) {
    //name 정규식에 따른 dogs리스트 불러오기
    //paging 처리
    return await DogsModel.find({
      nameKor: { $regex: name, $options: "i" },
    })
      .limit(perPage) //한페이지에서 확인할 수 있는 결과의 수
      .skip((page - 1) * perPage) //페이지에 따른 skip 기준
      .lean();
  }
}

export { dogsService };
