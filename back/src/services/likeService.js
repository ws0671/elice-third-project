import { LikeModel } from "../db";

class likeService {
  // likeInfo를 담을 json 생성
  static addLikeInfo = async ({ userId }) => {
    const isLikeInfoExist = await LikeModel.findOne({ userId });
    if (isLikeInfoExist) {
      const errorMessage = "해당 userId에 대한 likeInfo가 이미 존재합니다.";
      return { errorMessage };
    }

    const newLikeInfo = { userId };
    const createdNewLikeInfo = await LikeModel.create(newLikeInfo);

    return createdNewLikeInfo;
  };

  // userId에 해당하는 likeInfo 찾기
  static findLikeInfo = async ({ userId }) => {
    const likeInfo = await LikeModel.findOne({ userId });
    return likeInfo;
  };

  // userId에 해당하는 likeInfo에서 toUpdate 적용
  static setLikeInfo = async ({ userId, toUpdate }) => {
    const likeInfo = await LikeModel.findOne({ userId });
    if (!likeInfo) {
      const errorMessage = "해당 userId에 대한 likeInfo가 존재하지 않습니다.";
      return { errorMessage };
    }

    let likedBoard = likeInfo.boardIdArray;
    const existIndex = likedBoard.findIndex(
      (currentBoardId) => currentBoardId === toUpdate.boardId
    );

    if (existIndex > -1) {
      // 이미 좋아요 목록에 존재할 시 목록에서 삭제
      likedBoard.splice(existIndex, 1);
    } else {
      // 좋아요 목록에 존재하지 않을 시 목록에 추가
      likedBoard.push(toUpdate.boardId);
    }
    const newBoardIdArray = likedBoard;

    const updatedLikeInfo = await LikeModel.findOneAndUpdate(
      { userId },
      { $set: { boardIdArray: newBoardIdArray } },
      { returnOriginal: false }
    );

    return updatedLikeInfo;
  };
}

export { likeService };
