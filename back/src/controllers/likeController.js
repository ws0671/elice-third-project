import is from "@sindresorhus/is";
import { likeService } from "../services/likeService";

class likeController {
  // 좋아요 정보를 담을 json 생성 (회원가입 시 자동 생성)
  static createLikeInfo = async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "요청 내용이 빈 객체입니다. headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      const userId = req.body.userId;
      const newLike = await likeService.addLikeInfo({
        userId,
      });

      if (newLike.errorMessage) {
        throw new Error(newLike.errorMessage);
      }

      res.status(201).json(newLike);
    } catch (error) {
      next(error);
    }
  };

  // 해당 유저의 좋아요 정보 조회
  static getLikeInfo = async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const LikeInfo = await likeService.findLikeInfo({ userId });

      if (LikeInfo.errorMessage) {
        throw new Error(LikeInfo.errorMessage);
      }

      res.status(200).json(LikeInfo);
    } catch (error) {
      next(error);
    }
  };

  // 좋아요 상태 수정
  static editLikeInfo = async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const boardId = req.body.boardId;

      const toUpdate = { boardId };
      const LikeInfo = await likeService.setLikeInfo({ userId, toUpdate });

      if (LikeInfo.errorMessage) {
        throw new Error(LikeInfo.errorMessage);
      }

      res.status(200).json(LikeInfo);
    } catch (error) {
      next(error);
    }
  };
}

export { likeController };
