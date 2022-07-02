import is from "@sindresorhus/is";

const bodyValidator = (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "요청 내용이 빈 객체입니다. headers의 Content-Type을 다시 확인해주세요."
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

export { bodyValidator };
