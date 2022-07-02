import is from "@sindresorhus/is";
import { userAuthService } from "../services/userService";
import { likeService } from "../services/likeService";

class userController {
  static async register(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      // req (request) 에서 데이터 가져오기
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;

      // 위 데이터를 유저 db에 추가하기
      const newUser = await userAuthService.addUser({
        name,
        email,
        password,
      });

      const userId = newUser.userId;
      await likeService.addLikeInfo({
        userId,
      });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      // req (request) 에서 데이터 가져오기
      const email = req.body.email;
      const password = req.body.password;

      // 위 데이터를 이용하여 유저 db에서 유저 찾기
      const user = await userAuthService.getUser({ email, password });

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  static async getUsers(req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userAuthService.getUsers();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }

  static async getCurrentUserInfo(req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const userId = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({
        userId,
      });

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }

  static async setUserInfo(req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const userId = req.params.userId;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const { name, email, password, description, imageUrl, speciesArray } =
        req.body;
      const toUpdate = {
        name,
        email,
        password,
        description,
        imageUrl,
        speciesArray,
      };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({ userId, toUpdate });

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  static async getUserInfo(req, res, next) {
    try {
      const userId = req.params.userId;
      const currentUserInfo = await userAuthService.getUserInfo({ userId });

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
}

export { userController };
