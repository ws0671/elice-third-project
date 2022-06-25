import { useEffect, useState } from "react";

import { Container, Grid } from "@mui/material";

import * as Api from "../api";

import Header from "../components/common/Header";
import MyInfoEditor from "../components/mypage/MyInfoEditor";
import MyInfo from "../components/mypage/MyInfo";
import MyLike from "../components/mypage/MyLike";

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
      ...currentUser,
    });
  };

  useEffect(() => {
    getCurrentUser();
  }, [isEditing]);

  return (
    <>
      <Header />
      <Container component="main" maxWidth="lg" sx={{ paddingTop: "65px" }}>
        <Grid container>
          <Grid
            item
            md={6}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              paddingRight: "10px",
              minHeight: "650px",
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
            <MyLike />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MypagePage;
