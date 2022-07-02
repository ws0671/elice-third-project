import { Router } from "express";
import { dogsController } from "../controllers/dogsController";

const dogsRouter = Router();

//id쿼리로 dogs조회
dogsRouter.get("/dogs", dogsController.getDogs);

// dogs 검색
dogsRouter.get("/dogs/search", dogsController.dogSearch);

export { dogsRouter };
