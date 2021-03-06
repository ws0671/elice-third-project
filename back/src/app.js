import "dotenv/config";
import cors from "cors";
import express from "express";
const { format } = require("util");
const Multer = require("multer");
const { Storage } = require("@google-cloud/storage");

import { errorMiddleware } from "./middlewares/errorMiddleware";
import { userAuthRouter } from "./routes/userRouter";
import { boardRouter } from "./routes/boardRouter";
import { commentRouter } from "./routes/commentRouter";
import { likeRouter } from "./routes/likeRouter";
import { shoppingRouter } from "./routes/shoppingRouter";
import { scrapeShopItemsRouter } from "./routes/scrapeShopItemsRouter";
import { mbtiRouter } from "./routes/mbtiRouter";
import { dogsRouter } from "./routes/dogsRouter";
import { catsRouter } from "./routes/catsRouter";

const app = express();

// CORS 에러 방지
app.use(cors());
// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 페이지
app.get("/", (req, res) => {
    res.send("안녕하세요, 레이서 프로젝트 API 입니다.");
});

app.use(userAuthRouter);
app.use(boardRouter);
app.use(commentRouter);
app.use(likeRouter);
app.use(shoppingRouter);
app.use(scrapeShopItemsRouter);
app.use(mbtiRouter);
app.use(dogsRouter);
app.use(catsRouter);

// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

export { app };
