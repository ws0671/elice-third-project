import { Router } from "express";
import { mbtiController } from "../controllers/mbtiController";

const mbtiRouter = Router();

// 사용자의 MBTI에 따른 궁합을 찾고, 해당하는 동물 종 조회
mbtiRouter.get("/mbti/combination", mbtiController.getMbtiResult);

// MBTI에 해당하는 동물 종 조회
mbtiRouter.get("/petMbti/:mbti", mbtiController.getPetMbti);

export { mbtiRouter };
