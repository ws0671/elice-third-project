import is from "@sindresorhus/is";
import axios from "axios";
import { shoppingService } from "../services/shoppingService";

class shoppingController {
  //네이버 쇼핑 api와 연결
  static connectNaverApi = async (req, res, next) => {
    const query = req.query;
    const params = query;
    const result = await shoppingService.connectNaver({ params });
    res.status(200).json(result.data.items);
  };
}

export { shoppingController };
