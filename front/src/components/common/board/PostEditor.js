import { Container, TextareaAutosize } from "@mui/material";
import { PageTitle, TitleWrite, Write } from "./PostEditorStyle";

const Posting = () => {
    return (
        <>
            <Container maxWidth="lg">
                <PageTitle>새 글 작성</PageTitle>
                <TitleWrite
                    required
                    maxRows={1}
                    placeholder="제목을 입력하세요"
                />
                <Write
                    required
                    minRows={20}
                    maxRows={20}
                    placeholder="내용을 입력하세요"
                />
            </Container>
        </>
    );
};

export default Posting;
