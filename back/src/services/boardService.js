import { v4 as uuidv4 } from "uuid";
import { BoardModel } from "../db";

class boardService {
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

  // board 생성
  static addBoard = async ({ authorId, title, content }) => {
    const itemId = uuidv4();
    const newBoard = { itemId, authorId, title, content };

    const createdNewBoard = await BoardModel.create(newBoard);

    return createdNewBoard;
  };
}

export { boardService };
