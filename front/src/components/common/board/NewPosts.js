import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Container, Grid } from "@mui/material";
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
    PostMenu,
    SelectMenu,
    UnSelectMenu,
    TagButton,
    Count,
} from "./BoardStyle";

import { StylesProvider } from "@material-ui/core";

const Newposts = () => {
    const navigate = useNavigate();

    return (
        <>
            <Container maxWidth="lg" style={{ padding: "0" }}>
                <PostMenu>
                    <StylesProvider injectFirst>
                        <SelectMenu style={{ fontSize: "22px" }}>
                            New Post
                        </SelectMenu>
                        <span style={{ color: "#D9D9D9" }}>|</span>
                        <UnSelectMenu style={{ fontSize: "22px" }}>
                            Best Post
                        </UnSelectMenu>
                    </StylesProvider>
                </PostMenu>
                <Grid>
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
                            질문을 통해 궁금한 점을 해결하고 다양한 정보를
                            얻어가세요!
                        </Grid>
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
                    <PostList container>
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
            </Container>
        </>
    );
};

export default Newposts;
