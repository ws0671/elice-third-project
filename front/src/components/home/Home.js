import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import {
    MainTopBanner,
    MainSlogan,
    Domain,
    SloganInner,
    ServiceWrap,
    ServiceContent,
    TitleLineWrap,
    TitleLine,
    SloganButton,
} from "./HomeStyle";

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
            <TitleLineWrap>
                <TitleLine>
                    반려동물에 관한 정보를 <br />
                    쉽고 편리하게 조회할 수 있는 서비스
                    <br />
                    "궁금하냥? 그렇다멍!" 에서 다양한 서비스를 만나보세요
                </TitleLine>
            </TitleLineWrap>

            <ServiceWrap sx="lg">
                <ServiceContent />
                <ServiceContent />
                <ServiceContent />
                <ServiceContent />
            </ServiceWrap>
        </>
    );
};

export default Home;
