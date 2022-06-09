import "dotenv/config";
const { format } = require("util");
const Multer = require("multer");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage();

// 파일 업로드를 처리하고 해당 파일을 사용하기 위해 Multer가 필요
// req.files.
const uploadImageMulter = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

// 파일을 담을 버킷
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

const uploadImage = (req, res, next) => {
  // 이미지 선택을 안 했을 경우, 업로드 처리 없이 넘어감
  // console.log(req.file);
  if (!req.file) {
    next();
    return;
  }

  // 버킷에 새로운 blob을 생성하고 파일 데이터를 업로드
  // 중복된 이미지를 방지하여 Date.now() 추가
  const blob = bucket.file(`${Date.now()}_` + req.file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on("error", (err) => {
    res
      .status(400)
      .send("이미지 업로드에 오류가 발생하였습니다, 다시 한 번 시도해주세요.");
    next(err);
  });

  const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
  blobStream.on("finish", () => {
    // The public URL can be used to directly access the file via HTTP.
    const imageUrl = format(publicUrl);
    res.status(200).send({ imageUrl });
  });

  blobStream.end(req.file.buffer);
};

export { uploadImageMulter, uploadImage };
