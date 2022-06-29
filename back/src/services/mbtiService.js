import { UserMbtiModel, PetMbtiModel } from "../db";

class mbtiService {
  // 사용자의 MBTI에 따른 궁합 조회
  static findMbtiResult = async ({ userMbti }) => {
    const mbtiResult = await UserMbtiModel.findOne({ userMbti });
    return mbtiResult;
  };

  // MBTI에 해당하는 동물 종 조회
  static findPetMbti = async ({ petMbti }) => {
    const mbtiResult = await PetMbtiModel.findOne({ petMbti });
    return mbtiResult;
  };
}

export { mbtiService };
