import { v4 as uuidv4 } from "uuid";
import { BoardModel } from "../db";

class boardService {
  // board 생성
  static addBoard = async ({ authorId, title, content }) => {
    const itemId = uuidv4();
    const newBoard = { itemId, authorId, title, content };

    const createdNewBoard = await BoardModel.create(newBoard);
    createdNewBoard.errorMessage = null;

    return createdNewBoard;
  };
}

export { boardService };
