import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import {
  UserImgWrapper,
  UserImg,
  UserName,
  Info,
  InfoTitle,
  InfoContent,
  Species,
} from "./styledCP";

const MyInfo = ({ setIsEditing, myInfo }) => {
  return (
    <>
      <UserImgWrapper>
        <UserImg src={myInfo.imageUrl} alt="프로필 사진" />
      </UserImgWrapper>
      <UserName>{myInfo.name}</UserName>
      <Info>
        <InfoTitle>이메일</InfoTitle>
        <InfoContent>{myInfo.email}</InfoContent>
      </Info>
      <Info>
        <InfoTitle>소개</InfoTitle>
        <InfoContent>{myInfo.description}</InfoContent>
      </Info>
      <Info>
        <InfoTitle>반려동물</InfoTitle>
        <InfoContent>
          {myInfo.speciesArray.map((item, idx) => {
            return <Species key={idx}>{item}</Species>;
          })}
        </InfoContent>
      </Info>
      <Button
        variant="contained"
        size="medium"
        onClick={() => {
          setIsEditing(true);
        }}
      >
        <EditIcon sx={{ marginRight: "5px" }} />
        수정하기
      </Button>
    </>
  );
};

export default MyInfo;
