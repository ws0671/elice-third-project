import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid, InputBase } from "@mui/material";
import { StylesProvider } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";

import {
    PostList,
    PostUserImg,
    PostUserInfo,
    PostInfo,
    PostSubInfo,
    ListName,
    ListDate,
    ListTitle,
    WritePost,
    TagButton,
    Count,
} from "./BoardStyle";

const Newposts = () => {
    const navigate = useNavigate();

    return (
        <>
            <Grid
                container
                style={{
                    borderRadius: "10px",
                    backgroundColor: "#386150",
                    justifyContent: "space-between",
                    padding: "0px 10px",
                    width: "100%",
                    height: "45px",
                    overflow: "hidden",
                }}
            >
                <Grid
                    style={{
                        fontSize: "17px",
                        color: "white",
                        margin: "10px",
                        minWidth: "500px",
                    }}
                >
                    질문을 통해 궁금한 점을 해결하고 다양한 정보를 얻어가세요!
                </Grid>
                <Grid sx={{ position: "relative" }}>
                    <SearchIcon
                        sx={{
                            color: "white",
                            fontSize: "25px",
                            position: "absolute",
                            top: "20%",
                        }}
                    />
                    <InputBase
                        placeholder="검색어를 입력하세요."
                        sx={{ color: "white", margin: "0 0 0 25px" }}
                    />
                    <StylesProvider injectFirst>
                        <WritePost
                            style={{
                                fontSize: "18px",
                            }}
                            onClick={() => {
                                navigate("/posting");
                            }}
                        >
                            글쓰기
                        </WritePost>
                    </StylesProvider>
                </Grid>
            </Grid>
            <Grid>
                <PostList
                    container
                    onClick={() => {
                        navigate("/post");
                    }}
                >
                    <PostUserImg />
                    <PostUserInfo>
                        <ListName>Aerim</ListName>
                        <ListDate>2022-05-01</ListDate>
                    </PostUserInfo>
                    <PostInfo>
                        <ListTitle>초보집사! 궁금한게 있어요!</ListTitle>
                        <TagButton>#해시태그</TagButton>
                    </PostInfo>
                    <PostSubInfo>
                        <VisibilityIcon
                            style={{
                                margin: "0 5px",
                            }}
                        />
                        <Count> 3 </Count>
                        <FavoriteIcon />
                        <Count> 10</Count>
                    </PostSubInfo>
                </PostList>
            </Grid>
        </>
    );
};

export default Newposts;
