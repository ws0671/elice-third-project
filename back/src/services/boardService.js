import { v4 as uuidv4 } from "uuid";
import { BoardModel } from "../db";

class boardService {
  // board 생성
  static addBoard = async ({ authorId, title, content }) => {
    const boardId = uuidv4();
    const newBoard = { boardId, authorId, title, content };

    const createdNewBoard = await BoardModel.create(newBoard);

    return createdNewBoard;
  };

  // board 목록 조회 - pagination 기능이 포함되어 있지 않음
  static findBoards = async () => {
    const boards = await BoardModel.find({});
    return boards;
  };

  // board 상세 조회
  static findBoard = async ({ boardId }) => {
    const board = await BoardModel.findOne({ boardId });
    return board;
  };

  // board 수정
  static updateBoard = async ({ boardId, toUpdate }) => {
    const board = await BoardModel.findOne({ boardId });

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
      { boardId },
      { $set: toUpdate },
      { returnOriginal: false }
    );

    return updatedBoard;
  };

  // board 삭제
  static deleteBoard = async ({ boardId }) => {
    const result = await BoardModel.deleteOne({ boardId });
    const deleteResult = result.deletedCount === 1;

    if (!deleteResult) {
      const errorMessage =
        "해당 boardId를 가진 게시글은 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return deleteResult;
  };
}

export { boardService };
