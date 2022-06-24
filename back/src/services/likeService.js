import { LikeModel, BoardModel } from "../db";

class likeService {
  // likeInfo를 담을 json 생성
  static addLikeInfo = async ({ userId }) => {
    const isLikeInfoExist = await LikeModel.findOne({ userId });
    if (isLikeInfoExist) {
      const errorMessage = "해당 userId에 대한 likeInfo가 이미 존재합니다.";
      throw new Error(errorMessage);
    }

    const newLikeInfo = { userId };
    const createdNewLikeInfo = await LikeModel.create(newLikeInfo);

    return createdNewLikeInfo;
  };

  // userId에 해당하는 likeInfo를 찾고, boardIdArray를 반환
  static findLikedBoardIdArray = async ({ userId }) => {
    const likeInfo = await LikeModel.findOne({ userId });
    const likedBoardIdArray = likeInfo.boardIdArray;
    return likedBoardIdArray;
  };

  // userId에 해당하는 likeInfo에서 toUpdate 적용
  static setLikedBoardIdArray = async ({ userId, toUpdate }) => {
    const likeInfo = await LikeModel.findOne({ userId });
    if (!likeInfo) {
      const errorMessage = "해당 userId에 대한 likeInfo가 존재하지 않습니다.";
      throw new Error(errorMessage);
    }

    let likedBoardIdArray = likeInfo.boardIdArray;
    const existIndex = likedBoardIdArray.findIndex(
      (currentBoardId) => currentBoardId === toUpdate.boardId
    );

    // 좋아요 수를 수정하기 위한 변수
    let updateLikeCount = 0;

    if (existIndex > -1) {
      // 이미 좋아요 목록에 존재할 시 목록에서 삭제
      likedBoardIdArray.splice(existIndex, 1);

      // 해당 게시글 likeCount 1 감소
      updateLikeCount = -1;
    } else {
      // 좋아요 목록에 존재하지 않을 시 목록에 추가
      likedBoardIdArray.push(toUpdate.boardId);

      // 해당 게시글 likeCount 1 증가
      updateLikeCount = 1;
    }
    // 좋아요 수 update -> 프론트에 수정된 값(좋아요 수)을 직접 전달해서 해당 값을 이용하여 UI를 구성할지, 프론트에서 상태값을 임의로 변경할지 의논 필요
    await BoardModel.findOneAndUpdate(
      { boardId: toUpdate.boardId },
      { $inc: { likeCount: updateLikeCount } },
      { returnOriginal: false }
    );

    const newBoardIdArray = likedBoardIdArray;
    const updatedLikeInfo = await LikeModel.findOneAndUpdate(
      { userId },
      { $set: { boardIdArray: newBoardIdArray } },
      { returnOriginal: false }
    );

    const updatedLikedBoardIdArray = updatedLikeInfo.boardIdArray;
    return updatedLikedBoardIdArray;
  };
}

export { likeService };
