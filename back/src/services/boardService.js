import { v4 as uuidv4 } from "uuid";
import { BoardModel } from "../db";

class boardService {
  // board 생성
  static addBoard = async ({ authorId, title, content }) => {
    const itemId = uuidv4();
    const newBoard = { itemId, authorId, title, content };

    const createdNewBoard = await BoardModel.create(newBoard);

    return createdNewBoard;
  };

  // boardlist 조회 - pagination 기능이 포함되어 있지 않음
  static findBoardList = async () => {
    const boardList = await BoardModel.find({});
    return boardList;
  };

  // board 상세 조회
  static findBoard = async ({ itemId }) => {
    const board = await BoardModel.findOne({ itemId });
    return board;
  };

  // board 수정
  static updateBoard = async ({ itemId, toUpdate }) => {
    const board = await BoardModel.findOne({ itemId });

    if (!board) {
      const errorMessage =
        "해당하는 게시글이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    Object.keys(toUpdate).forEach((key) => {
      if (toUpdate[key] === undefined || toUpdate[key] === null) {
        delete toUpdate[key];
      }
    });

    const updatedBoard = await BoardModel.findOneAndUpdate(
      { itemId },
      { $set: toUpdate },
      { returnOriginal: false }
    );

    return updatedBoard;
  };
}

export { boardService };
