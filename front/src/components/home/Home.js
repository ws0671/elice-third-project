import { Container } from "@mui/system";
import { Button, Grid } from "@mui/material";
import {
    MainTopBanner,
    MainSlogan,
    Domain,
    SloganInner,
    ServiceWrap,
} from "./HomeStyle";
import { styled } from "@mui/material/styles";

const SloganButton = styled(Button)({
    fontSize: "22px",
    color: "white",
    border: "solid 1px white",
    margin: "15px 0",
    padding: "5px 30px",
    borderRadius: "10px",
});

const Home = () => {
    return (
        <>
            <Grid
                style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "65px",
                }}
            >
                <MainTopBanner>
                    <MainSlogan>
                        <SloganInner>집사야, 우리가 &nbsp;</SloganInner>
                        <Domain>
                            궁금하냥?
                            <br />
                            그렇다멍!
                        </Domain>
                        <SloganInner>
                            <span style={{ color: "#D2BBA0" }}>반려동물</span>에
                            대한 모든 것
                        </SloganInner>
                        <SloganButton>더 알아보기</SloganButton>
                    </MainSlogan>
                </MainTopBanner>
            </Grid>
            <ServiceWrap sx="lg"> 여기</ServiceWrap>
        </>
    );
};

export default Home;
