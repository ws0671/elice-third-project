import { Grid, Button, InputBase } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import { Container } from "@mui/system";
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
} from "./PostStyle";

const Post = () => {
    return (
        <>
            <Container
                max-width="lg"
                style={{
                    display: "flex",
                    padding: "0",
                    justifyContent: "space-between",
                }}
            >
                <Left>
                    <User>
                        <UserImg />
                        <UserName>Aerim</UserName>
                        <UserDate>
                            2022.06.09
                            <Button
                                sx={{
                                    padding: "0",
                                }}
                            >
                                수정
                            </Button>
                            <Button
                                sx={{
                                    padding: "0",
                                }}
                            >
                                삭제
                            </Button>
                        </UserDate>
                    </User>
                    <Title>[초보집사] 고양이 산책! 궁금해요! </Title>

                    <PostImg>이미지</PostImg>
                    <Content>고양이도 산책 할 수 있나요?</Content>
                    <PostTag>
                        <Button
                            sx={{
                                color: "#818479",
                                border: "solid 1px",
                                borderRadius: "20px",
                                fontSize: "0.5rem",
                                margin: "0 5px 0 0",
                            }}
                        >
                            해시태그
                        </Button>
                    </PostTag>
                </Left>
                <Right>
                    <PostInfo>
                        <IconButton>
                            <FavoriteBorderIcon sx={{ margin: "0 5%" }} />
                        </IconButton>
                        1541
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
