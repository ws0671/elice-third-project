import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import {
    Left,
    Right,
    Title,
    User,
    UserName,
    UserDate,
    UserImg,
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
                        <UserName />
                        <UserDate />
                    </User>
                    <Title>제목</Title>
                </Left>
                <Right>댓글쪽</Right>
            </Container>
        </>
    );
};

export default Post;
