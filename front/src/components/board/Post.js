import { Grid, Button, InputBase } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import {
    Left,
    Right,
    Title,
    User,
    UserName,
    UserDate,
    UserImg,
    Content,
    PostImg,
    PostTag,
    PostInfo,
    Comment,
    CommentName,
    CommentWrite,
    Tag,
} from "./PostStyle";

const Post = () => {
    const navigate = useNavigate();
    return (
        <>
            <Container
                max-width="lg"
                style={{
                    display: "flex",
                    paddingTop: "105px",
                    justifyContent: "space-between",
                    paddingBottom: "50px",
                }}
            >
                <Left>
                    <User>
                        <UserImg
                            style={{
                                backgroundImage:
                                    "url(http://www.urbanbrush.net/web/wp-content/uploads/edd/2019/01/urbanbrush-20190108131811238895.png)",
                                backgroundSize: "100% 100%",
                                backgroundRepeat: "no-repeat",
                            }}
                        />
                        <UserName>Aerim</UserName>
                        <UserDate>
                            2022.06.09
                            <Button
                                size="small"
                                sx={{
                                    color: "#FAC213",
                                    margin: " 0 5px",
                                }}
                            >
                                수정
                            </Button>
                            <Button
                                size="small"
                                sx={{
                                    padding: "0",
                                    color: "#F77E21",
                                }}
                            >
                                삭제
                            </Button>
                        </UserDate>
                    </User>
                    <Grid
                        style={{
                            display: "flex",
                            minHeight: "500px",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            padding: " 1% 3%",
                        }}
                    >
                        <Grid>
                            <Title>[초보집사] 고양이 산책! 궁금해요! </Title>

                            <PostImg>
                                <img
                                    src="https://src.hidoc.co.kr/image/lib/2022/5/4/1651651323632_0.jpg"
                                    alt="이미지 없음"
                                    style={{
                                        width: "100%",
                                        borderRadius: "10px",
                                    }}
                                />
                            </PostImg>
                            <Content>
                                고양이도 산책 할 수 있나요? <br />
                                우리집 고양이 너무 귀엽죠 <br />
                                나도 알아요 <br />
                                고양이랑 같이 산책하고 싶어요 <br />
                            </Content>
                        </Grid>
                        <Grid>
                            <PostTag>
                                <Tag>해시태그</Tag>
                                <Tag>해시태그2</Tag>
                            </PostTag>
                        </Grid>
                    </Grid>
                </Left>
                <Right>
                    <PostInfo>
                        <Grid>
                            <IconButton>
                                <FavoriteBorderIcon
                                    sx={{ margin: "0 5%", color: "white" }}
                                />
                            </IconButton>
                            1541
                        </Grid>
                        <Grid>
                            <IconButton>
                                <CloseIcon
                                    sx={{ margin: "0 5%", color: "#EC9B3B" }}
                                    onClick={() => {
                                        navigate("/board");
                                    }}
                                />
                            </IconButton>
                        </Grid>
                    </PostInfo>
                    <Comment>
                        <CommentName>닉네임</CommentName>
                        가나다라마바사아자차카타파하
                        <br />
                        <Button
                            size="small"
                            sx={{
                                padding: "0",
                                width: "15px",
                            }}
                        >
                            수정
                        </Button>
                        <Button
                            size="small"
                            sx={{
                                padding: "0",
                                color: "Red",
                            }}
                        >
                            삭제
                        </Button>
                    </Comment>
                    <Comment>
                        <CommentName>닉네임</CommentName>안녕
                    </Comment>

                    <CommentWrite>
                        <InputBase
                            variant="standard"
                            placeholder="댓글을 입력해 주세요."
                            width="100%"
                        />
                        <Button
                            size="small"
                            sx={{
                                padding: "0",
                                width: "15px",
                            }}
                        >
                            입력
                        </Button>
                    </CommentWrite>
                </Right>
            </Container>
        </>
    );
};

export default Post;
