import is from "@sindresorhus/is";
import axios from "axios";

class shoppingController {
  //네이버 쇼핑 api와 연결
  static connectNaverApi = async (req, res, next) => {
    const query = req.query;
    const params = query;
    const result = await axios.get(
      "https://openapi.naver.com/v1/search/shop.json",
      {
        params,
        headers: {
          "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
        },
      }
    );
    res.status(200).json(result.data.items);
  };
}

export { shoppingController };
