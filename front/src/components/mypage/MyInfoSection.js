import { useEffect, useState } from "react";

import { Box } from "@mui/material";
import styled from "styled-components";

import * as Api from "../../api";

import MyInfoEditor from "./MyInfoEditor";
import MyInfo from "./MyInfo";

const MyInfoSection = () => {
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
  );
};

export default MyInfoSection;

const MyBox = styled(Box)`
  padding: 20px 20px;
  margin-bottom: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 2px 10px #d9d9d9;
`;
