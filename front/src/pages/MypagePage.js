import { useEffect, useState } from "react";

import { Grid, Box } from "@mui/material";
import styled from "styled-components";

import * as Api from "../api";

import Header from "../components/common/Header";
import MyInfoEditor from "../components/mypage/MyInfoEditor";
import MyInfo from "../components/mypage/MyInfo";
import MyLike from "../components/mypage/MyLike";
import Layout from "../components/common/Layout";

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
      <Layout>
        <Part>PROFILE</Part>
        <MyBox>
          {isEditing ? (
            <MyInfoEditor
              setIsEditing={setIsEditing}
              myInfo={myInfo}
              setMyInfo={setMyInfo}
            />
          ) : (
            <MyInfo setIsEditing={setIsEditing} myInfo={myInfo} />
          )}
        </MyBox>
        <Part>FAVORITE</Part>
        <MyLike />
      </Layout>
    </>
  );
};

export default MypagePage;

const Part = styled.div`
  border-bottom: solid 5px #65949e;
  text-align: center;
  width: 150px;
  margin: 0px auto 30px;
  font-size: 36px;
`;

const MyBox = styled(Box)`
  padding: 20px 20px;
  margin-bottom: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 2px 10px #d9d9d9;
`;
