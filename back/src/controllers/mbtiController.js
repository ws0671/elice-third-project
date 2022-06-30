import { mbtiService } from "../services/mbtiService";

class mbtiController {
  // 사용자의 MBTI에 따른 궁합을 찾고, 해당하는 동물 종 조회
  static getMbtiResult = async (req, res, next) => {
    try {
      const userMbti = req.query.mbti;

      const mbtiResult = await mbtiService.findMbtiResult({
        userMbti,
      });

      res.status(200).json(mbtiResult);
    } catch (error) {
      next(error);
    }
  };
}

export { mbtiController };
