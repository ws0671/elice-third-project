import { mbtiService } from "../services/mbtiService";

class mbtiController {
  // 사용자의 Mbti에 따른 궁합 조회
  static getMbtiResult = async (req, res, next) => {
    try {
      const userMbti = req.params.mbti;

      const mbtiResult = await mbtiService.findMbtiResult({
        userMbti,
      });

      res.status(200).json(mbtiResult);
    } catch (error) {
      next(error);
    }
  };

  // Mbti에 해당하는 동물 종 조회
  static getPetMbti = async (req, res, next) => {
    try {
      const petMbti = req.params.mbti;

      const mbtiResult = await mbtiService.findPetMbti({
        petMbti,
      });

      res.status(200).json(mbtiResult);
    } catch (error) {
      next(error);
    }
  };
}

export { mbtiController };
