import { Router } from "express";
// import { loginRequired } from "../middlewares/loginRequired";
import { aiController } from "../controllers/aiController";
const aiRouter = Router();

aiRouter.post(
    "/predictcat",
    // loginRequired,
    aiController.sendPredictCat
);

aiRouter.post(
    "/predictdog",
    // loginRequired,
    aiController.sendPredictDog
);


export { aiRouter };
