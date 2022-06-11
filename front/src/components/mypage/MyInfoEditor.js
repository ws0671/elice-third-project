import { Button, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddIcon from "@mui/icons-material/Add";

import {
  UserImgWrapper,
  UserImg,
  UserName,
  Info,
  InfoTitle,
  InfoContent,
  Species,
} from "./styledCP";

import * as Api from "../../api";

import { useSelector } from "react-redux";

const MyInfoEditor = ({ setIsEditing, myInfo, setMyInfo }) => {
  const user = useSelector((state) => state.auth.value);

  const handleChange = (e) => {
    setMyInfo((current) => {
      return { ...current, [e.target.name]: e.target.value };
    });
  };

  const handleRemoveClick = (e) => {
    // 반려동물 삭제하기
    console.log("remove click");

    // const species = e.target.parentElement.parentElement.innerText;

    // const newSpeciesArray = myInfo.speciesArray.filter(
    //   (item) => item !== species
    // );

    // setMyInfo((current) => {
    //   return { ...current, speciesArray: newSpeciesArray };
    // });
  };

  const handleAddClick = () => {
    // 반려동물 추가하기
    console.log("add click");
  };

  const handleSaveClick = async () => {
    try {
      await Api.put(`users/${user.userId}`, {
        description: myInfo.description,
      });
      setIsEditing(false);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <UserImgWrapper>
        <UserImg src={myInfo.imageUrl} alt="프로필 사진" />
      </UserImgWrapper>
      <UserName>
        <TextField
          size="small"
          value={myInfo.name}
          name="name"
          onChange={handleChange}
        />
      </UserName>

      <Info>
        <InfoTitle>이메일</InfoTitle>
        <InfoContent>{myInfo.email}</InfoContent>
      </Info>
      <Info>
        <InfoTitle>소개</InfoTitle>
        <TextField
          fullWidth
          size="small"
          value={myInfo.description}
          name="description"
          onChange={handleChange}
        />
      </Info>
      <Info>
        <InfoTitle>반려동물</InfoTitle>
        {myInfo.speciesArray.map((item, index) => {
          return (
            <Species key={index}>
              {item} <RemoveCircleIcon onClick={handleRemoveClick} />
            </Species>
          );
        })}
        <AddIcon onClick={handleAddClick} />
      </Info>
      <Button variant="contained" size="medium" onClick={handleSaveClick}>
        <CheckCircleIcon sx={{ marginRight: "5px" }} /> 저장하기
      </Button>
    </>
  );
};

export default MyInfoEditor;
