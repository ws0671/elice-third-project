import { likeService } from "../services/likeService";

class likeController {
  // 좋아요 정보를 담을 json 생성 (회원가입 시 자동 생성)
  static createLikeInfo = async (req, res, next) => {
    try {
      const userId = req.body.userId;

      const newLike = await likeService.addLikeInfo({
        userId,
      });

      res.status(201).json(newLike);
    } catch (error) {
      next(error);
    }
  };

  // scope에 맞는 좋아요 정보 조회
  static getLikeInfo = async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const scope = req.query.scope;

      const likeInfo = await likeService.findLikeInfo({
        userId,
        scope,
      });

      res.status(200).json(likeInfo);
    } catch (error) {
      next(error);
    }
  };

  // 좋아요 상태 수정
  static editLikedInfo = async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const scope = req.query.scope;

      // scope가 boards일 경우 게시글 좋아요 수정
      if (scope === "boards") {
        const boardId = req.body.boardId;
        const toUpdate = { boardId };

        const likedBoardIdArray = await likeService.setLikedBoardIdArray({
          userId,
          toUpdate,
        });

        res.status(200).json(likedBoardIdArray);
      }
      // scope가 places일 경우 장소 좋아요 수정
      else if (scope === "places") {
        const {
          id,
          place_name,
          phone,
          x,
          y,
          address_name,
          road_address_name,
          category,
          place_url,
        } = req.body;
        const toUpdate = {
          id,
          place_name,
          phone,
          x,
          y,
          address_name,
          road_address_name,
          category,
          place_url,
        };

        const likedPlaceArray = await likeService.setLikedPlaceArray({
          userId,
          toUpdate,
        });

        res.status(200).json(likedPlaceArray);
      }
    } catch (error) {
      next(error);
    }
  };
}

export { likeController };
