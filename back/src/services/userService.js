import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { UserModel } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class userAuthService {
  static async addUser({ name, email, password }) {
    // 이메일 중복 확인
    const user = await UserModel.findOne({ email });
    if (user) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // userId 는 유니크 값 부여
    const userId = uuidv4();
    const newUser = { userId, name, email, password: hashedPassword };

    // db에 저장
    const createdNewUser = await UserModel.create(newUser);
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  }

  static async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await UserModel.findOne({ email });
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ userId: user.userId }, secretKey);

    const loginUser = {
      token,
      userId: user.userId,
      email,
      name: user.name,
      description: user.description,
      errorMessage: null,
    };

    return loginUser;
  }

  static async getUsers() {
    const users = await UserModel.find({});
    return users;
  }

  static async setUser({ userId, toUpdate }) {
    // 우선 해당 userId 의 유저가 db에 존재하는지 여부 확인
    let user = await UserModel.findOne({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    Object.keys(toUpdate).forEach((key) => {
      if (toUpdate[key] === undefined || toUpdate[key] === null) {
        delete toUpdate[key];
      }
    });

    user = await UserModel.findOneAndUpdate(
      { userId },
      { $set: toUpdate },
      { returnOriginal: false }
    );

    return user;
  }

  static async getUserInfo({ userId }) {
    const user = await UserModel.findOne({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return user;
  }
}

export { userAuthService };
