import { Container, Grid, Button } from "@mui/material";
import { PageTitle, TitleWrite, Write } from "./PostEditorStyle";
import { useNavigate } from "react-router-dom";

const Posting = () => {
    const navigate = useNavigate();
    return (
        <>
            <Container maxWidth="lg" style={{ paddingTop: "70px" }}>
                <PageTitle>새 글 작성</PageTitle>
                <TitleWrite
                    required
                    maxRows={1}
                    placeholder="제목을 입력하세요"
                />
                <Write
                    required
                    minRows={15}
                    maxRows={15}
                    placeholder="내용을 입력하세요"
                />
                <Write required maxRows={1} placeholder="태그를 입력하세요" />
                <Grid style={{ color: "gray", padding: "1%" }}>
                    입력된 해시태그가 없습니다.
                </Grid>
                <Grid
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "1% 0",
                    }}
                >
                    <Grid>
                        <Button
                            sx={{
                                color: "#82954B",
                                border: "solid 1px #82954B",
                            }}
                        >
                            이미지 첨부
                        </Button>
                    </Grid>
                    <Grid>
                        <Button
                            sx={{
                                color: "#187498",
                                border: "solid 1px #187498",
                            }}
                        >
                            작성 완료
                        </Button>
                        {"  "}
                        <Button
                            sx={{
                                color: "#FF4949",
                                border: "solid 1px #FF4949",
                            }}
                            onClick={() => navigate("/board")}
                        >
                            취소
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Posting;
