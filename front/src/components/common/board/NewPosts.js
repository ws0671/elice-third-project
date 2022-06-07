import { Container, Grid, Box } from "@mui/material";
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
} from "./BoardStyle";
import { StylesProvider } from "@material-ui/core";

const Newposts = () => {
    return (
        <>
            <Container maxWidth="lg" style={{ padding: "0" }}>
                <PostMenu>
                    <StylesProvider injectFirst>
                        <SelectMenu style={{ fontSize: "24px" }}>
                            New Post
                        </SelectMenu>
                        <span style={{ color: "#D9D9D9" }}>|</span>
                        <UnSelectMenu style={{ fontSize: "24px" }}>
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
                        }}
                    >
                        <Grid
                            item
                            style={{
                                fontSize: "20px",
                                color: "white",
                                margin: "10px",
                            }}
                        >
                            질문을 통해 궁금한 점을 해결하고 다양한 정보를
                            얻어가세요!
                        </Grid>
                        <StylesProvider injectFirst>
                            <WritePost style={{ fontSize: "18px" }}>
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
                        </PostInfo>
                        <PostSubInfo>
                            <Grid> 조회수</Grid>
                            <Grid> 추천수</Grid>
                        </PostSubInfo>
                    </PostList>
                </Grid>
            </Container>
        </>
    );
};

export default Newposts;
