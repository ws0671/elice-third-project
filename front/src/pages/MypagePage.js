import { useEffect, useState } from "react";

import { Container, Grid } from "@mui/material";

import {
  PageTitle,
  InfoTitle,
  MapInfo,
  Map,
} from "../components/mypage/styledCP";

import * as Api from "../api";

import Header from "../components/common/Header";
import MyInfoEditor from "../components/mypage/MyInfoEditor";
import MyInfo from "../components/mypage/MyInfo";

const MypagePage = () => {
  const [myInfo, setMyInfo] = useState({
    name: "",
    email: "",
    description: "",
    imageUrl: "",
    speciesArray: [],
  });

  const [isEditing, setIsEditing] = useState(false);

  const getCurrentUser = async () => {
    const res = await Api.get("users/current");
    const currentUser = res.data;
    setMyInfo({
      name: currentUser.name,
      email: currentUser.email,
      description: currentUser.description,
      imageUrl: currentUser.imageUrl,
      speciesArray: currentUser.speciesArray,
    });
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
      <Header />
      <Container
        component="main"
        maxWidth="lg"
        sx={{ backgroundColor: "#FDF6F0" }}
      >
        <Grid container>
          <Grid item xs={12}>
            <PageTitle>my page</PageTitle>
          </Grid>
          <Grid
            item
            md={6}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {isEditing ? (
              <MyInfoEditor
                setIsEditing={setIsEditing}
                myInfo={myInfo}
                setMyInfo={setMyInfo}
              />
            ) : (
              <MyInfo setIsEditing={setIsEditing} myInfo={myInfo} />
            )}
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            {/* 임시 코드 */}
            <MapInfo>
              <InfoTitle>내가 찜한 병원</InfoTitle>
              <Map></Map>
            </MapInfo>
            <MapInfo>
              <InfoTitle>내가 찜한 산책로</InfoTitle>
              <Map></Map>
            </MapInfo>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MypagePage;
