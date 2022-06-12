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
  static findBoards = async (sort, direction) => {
    const sortMap = {
      date: "createdAt",
      view: "viewCount",
      like: "likeCount",
    };
    const boards = await BoardModel.find({}).sort({
      ...(sort ? { [sortMap[sort]]: direction } : { createdAt: -1 }),
    });
    return boards;
  };

  // board 상세 조회
  static findBoard = async ({ userId, boardId }) => {
    const board = await BoardModel.findOne({ boardId });

    // 현재 상세 조회를 진행하는 사용자가 작성한 글이 아닐 경우에만 조회수 증가
    if (userId !== board.authorId) {
      await BoardModel.findOneAndUpdate(
        { boardId },
        { $inc: { viewCount: 1 } },
        { returnOriginal: false }
      );
    }

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

  //title로 검색한 board 목록의 마지막 페이지 반환
  static async getLastPage({ title, perPage }) {
    const boardList = await BoardModel.countDocuments({
      title: { $regex: title, $options: "i" },
    });
    const lastPage = Math.ceil(boardList / perPage);
    return lastPage;
  }

  // title로 board리스트를 찾아 페이징처리하여 반환하는 함수
  static async getSearchList({ title, page, perPage, sort, direction }) {
    //title 정규식에 따른 board리스트 불러오기
    //paging 처리
    const sortMap = {
      date: "createdAt",
      view: "viewCount",
      like: "likeCount",
    };
    return await BoardModel.find({
      title: { $regex: title, $options: "i" },
    })
      .sort({ ...(sort ? { [sortMap[sort]]: direction } : { createdAt: -1 }) }) //최신순,조회순,좋아요순으로 정렬
      .limit(perPage) //한페이지에서 확인할 수 있는 결과의 수
      .skip((page - 1) * perPage) //페이지에 따른 skip 기준
      .lean();
  }
}

export { boardService };
