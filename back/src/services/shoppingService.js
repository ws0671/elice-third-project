import axios from "axios";

class shoppingService {
  static connectNaver = ({ params }) => {
    const SearchRes = axios.get(
      "https://openapi.naver.com/v1/search/shop.json",
      {
        params,
        headers: {
          "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
        },
      }
    );
    return SearchRes;
  };
}

export { shoppingService };
