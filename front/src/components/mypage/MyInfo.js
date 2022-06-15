import { IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import {
  Wrapper,
  ImgWrapper,
  Img,
  InfoWrapper,
  Name,
  Email,
  Desc,
  Animals,
  Animal,
} from "./styledCP";

const MyInfo = ({ setIsEditing, myInfo }) => {
  return (
    <>
      <Wrapper>
        <ImgWrapper>
          <Img src={myInfo.imageUrl} alt="프로필 사진"></Img>
        </ImgWrapper>
        <InfoWrapper>
          <IconButton
            aria-label="edit myInfo"
            component="span"
            sx={{ position: "absolute", right: "25px", top: "20px" }}
            onClick={() => {
              setIsEditing(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <Name>{myInfo.name}</Name>
          <Email>{myInfo.email}</Email>
          <Desc>{myInfo.description}</Desc>
          <Animals>
            {myInfo.speciesArray?.map((item) => {
              return <Animal key={item}>{item}</Animal>;
            })}
          </Animals>
        </InfoWrapper>
      </Wrapper>
    </>
  );
};

export default MyInfo;
