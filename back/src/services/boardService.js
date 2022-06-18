import { v4 as uuidv4 } from "uuid";
import { BoardModel, UserModel } from "../db";

class boardService {
  // board 생성
  static addBoard = async ({
    authorId,
    title,
    content,
    imageUrl,
    hashTagArray,
  }) => {
    const boardId = uuidv4();
    // authorId를 통해 해당하는 user(author)의 정보를 얻음
    // 게시판의 정보를 받아올 때 populate를 사용하기 위해 해당 user의 _id를 author에 저장
    const author = await UserModel.findOne({ userId: authorId });
    const newBoard = {
      boardId,
      author: author._id,
      title,
      content,
      imageUrl,
      hashTagArray,
    };

    const createdNewBoard = await BoardModel.create(newBoard);

    return createdNewBoard;
  };

  // board 목록 조회 - pagination 기능이 포함되어 있지 않음
  static findBoards = async ({ sort, direction }) => {
    const sortMap = {
      date: "createdAt",
      view: "viewCount",
      like: "likeCount",
    };
    const boards = await BoardModel.find({})
      .populate("author")
      .sort({
        ...(sort ? { [sortMap[sort]]: direction } : { createdAt: -1 }),
      });
    return boards;
  };

  // board 상세 조회
  static findBoard = async ({ userId, boardId }) => {
    let board = await BoardModel.findOne({ boardId }).populate("author");
    console.log(board);
    // 현재 상세 조회를 진행하는 사용자가 작성한 글이 아닐 경우에만 조회수 증가
    // 증가된 조회수가 적용된 board를 반환
    if (userId !== board.author.userId) {
      board = await BoardModel.findOneAndUpdate(
        { boardId },
        { $inc: { viewCount: 1 } },
        { returnOriginal: false }
      ).populate("author");
    }
    console.log(board);
    return board;
  };

  // board 수정
  static updateBoard = async ({ boardId, toUpdate }) => {
    const board = await BoardModel.findOne({ boardId }).populate("author");

    if (!board) {
      const errorMessage =
        "해당하는 게시글이 없습니다. 다시 한 번 확인해 주세요.";
      throw new Error(errorMessage);
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
    ).populate("author");

    return updatedBoard;
  };

  // board 삭제
  static deleteBoard = async ({ boardId }) => {
    const result = await BoardModel.deleteOne({ boardId });
    const deleteResult = result.deletedCount === 1;

    if (!deleteResult) {
      const errorMessage =
        "해당 boardId를 가진 게시글은 없습니다. 다시 한 번 확인해 주세요.";
      throw new Error(errorMessage);
    }

    return deleteResult;
  };

  //title로 검색한 board 목록의 마지막 페이지 반환
  static async getFinalPage({ title, perPage }) {
    const boardList = await BoardModel.countDocuments({
      title: { $regex: title, $options: "i" },
    });
    const finalPage = Math.ceil(boardList / perPage);
    return finalPage;
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
      .populate("author")
      .sort({ ...(sort ? { [sortMap[sort]]: direction } : { createdAt: -1 }) }) //최신순,조회순,좋아요순으로 정렬
      .limit(perPage) //한페이지에서 확인할 수 있는 결과의 수
      .skip((page - 1) * perPage) //페이지에 따른 skip 기준
      .lean();
  }
}

export { boardService };
