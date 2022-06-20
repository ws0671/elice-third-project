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
    LeftContent,
    RightContent,
    RightContentTitle,
    LeftContentTitle,
    RightContentButton,
    LeftContentButton,
    LeftContentWrap,
    RightContentWrap,
    ImageWrap,
    Footer,
    ReadyWrap,
    ReadyContent,
    ReadySlogan,
    JoinButton,
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

            <ServiceWrap>
                {/* 첫번째 서비스  */}
                <ServiceContent>
                    <ImageWrap />
                    <RightContent>
                        <RightContentWrap>
                            <RightContentTitle>
                                우리 동네 산책로
                            </RightContentTitle>
                            우리 동네에 있는 산책로를 <br />
                            간편하고 쉽게 찾아보세요!
                            <RightContentButton>바로가기</RightContentButton>
                        </RightContentWrap>
                    </RightContent>
                </ServiceContent>

                {/* 두번째 서비스  */}
                <ServiceContent>
                    <LeftContent>
                        <LeftContentWrap>
                            <LeftContentTitle>
                                우리 동네 동물병원
                            </LeftContentTitle>
                            우리 동네에 있는 동물 병원을 <br />
                            간편하고 쉽게 찾아보세요!
                            <LeftContentButton>바로가기</LeftContentButton>
                        </LeftContentWrap>
                    </LeftContent>
                    <ImageWrap />
                </ServiceContent>

                {/* 세번째 서비스  */}
                <ServiceContent>
                    <ImageWrap />
                    <RightContent>
                        <RightContentWrap>
                            <RightContentTitle>
                                종 분석 서비스
                            </RightContentTitle>
                            반려동물의 정확한 종을 알아보세요!
                            <br />
                            쉽고 간편하게
                            <br />
                            사진으로 확인 가능!
                            <RightContentButton>바로가기</RightContentButton>
                        </RightContentWrap>
                    </RightContent>
                </ServiceContent>

                {/* 네번째 서비스  */}
                <ServiceContent>
                    <LeftContent>
                        <LeftContentWrap>
                            <LeftContentTitle>소통 공간</LeftContentTitle>
                            소통 공간을 통해
                            <br />
                            궁금한 점을 해결해보세요!
                            <br />
                            꿀팁까지!
                            <LeftContentButton>바로가기</LeftContentButton>
                        </LeftContentWrap>
                    </LeftContent>
                    <ImageWrap />
                </ServiceContent>
            </ServiceWrap>
            {/* 회원가입및 로그인 권유 */}
            <ReadyWrap>
                <ReadyContent>
                    <ReadySlogan>Ready to get started?</ReadySlogan>
                    <Grid>
                        <JoinButton>Login</JoinButton>
                        <JoinButton>Sign Up</JoinButton>
                    </Grid>
                </ReadyContent>
            </ReadyWrap>

            {/* footer */}
            <Footer />
        </>
    );
};

export default Home;
