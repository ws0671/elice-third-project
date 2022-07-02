import { IconButton, Grid } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import {
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
    <Grid container>
      <Grid item lg={5} md={5} sm={12} xs={12}>
        <ImgWrapper>
          <Img src={myInfo.imageUrl} alt="프로필 사진"></Img>
        </ImgWrapper>
      </Grid>
      <Grid item lg={7} md={7} sm={12} xs={12}>
        <InfoWrapper>
          <Name>{myInfo.name}</Name>
          <Email>{myInfo.email}</Email>
          <Desc>{myInfo.description}</Desc>
          <Animals>
            {myInfo.speciesArray?.map((item) => {
              return (
                <Animal key={item}>
                  <span>{item}</span>
                </Animal>
              );
            })}
          </Animals>
          <IconButton
            aria-label="edit myInfo"
            component="span"
            sx={{
              position: "absolute",
              right: "20px",
              top: "0px",
            }}
            onClick={() => {
              setIsEditing(true);
            }}
          >
            <EditIcon />
          </IconButton>
        </InfoWrapper>
      </Grid>
    </Grid>
  );
};

export default MyInfo;
