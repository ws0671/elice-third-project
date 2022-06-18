import { Container } from "@mui/material";

import Header from "../components/common/Header";
import FindBreed from "../components/aipage/FindBreed"; 


const AiPage = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ paddingTop: "65px" }}>
        <FindBreed />
      </Container>
    </>
  );
};

export default AiPage;