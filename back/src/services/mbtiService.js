import { UserMbtiModel, PetMbtiModel } from "../db";

class mbtiService {
  // 사용자의 MBTI에 따른 궁합을 찾고, 해당하는 동물 종 조회
  static findMbtiResult = async ({ userMbti }) => {
    const { bestMbti } = await UserMbtiModel.findOne({ userMbti });
    const bestCombination = await PetMbtiModel.find({
      petMbti: { $in: bestMbti },
    });
    bestCombination.flat();
    return bestCombination;
  };
}

export { mbtiService };
