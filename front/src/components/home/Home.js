import { useNavigate } from "react-router-dom";

import HomePhoto01 from "../../assets/images/001.png";
import HomePhoto02 from "../../assets/images/002.png";
import HomePhoto03 from "../../assets/images/003.png";
import HomePhoto04 from "../../assets/images/004.png";

import {
    ServiceWrap,
    ServiceContent,
    TitleLineWrap,
    TitleLine,
    LeftContent,
    RightContent,
    RightContentTitle,
    LeftContentTitle,
    RightContentButton,
    LeftContentButton,
    LeftContentWrap,
    RightContentWrap,
    ImageWrap,
} from "./HomeStyle";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <TitleLineWrap>
                <TitleLine>
                    반려동물에 관한 정보를 <br />
                    쉽고 편리하게 조회할 수 있는 서비스
                    <br />
                    "궁금하냥?" 에서 다양한 서비스를 만나보세요.
                </TitleLine>
            </TitleLineWrap>

            <ServiceWrap>
                {/* 첫번째 서비스  */}
                <ServiceContent>
                    <ImageWrap
                        style={{ backgroundImage: `url(${HomePhoto03})` }}
                    />
                    <RightContent>
                        <RightContentWrap>
                            <RightContentTitle>
                                반려동물 백과사전
                            </RightContentTitle>
                            다양한 고양이와 강아지를 소개해 드립니다.
                            <br /> 127종의 강아지와 13종의 고양이에 대한 정보를
                            알려드립니다.
                            <RightContentButton
                                onClick={() => {
                                    navigate("/dict");
                                }}
                            >
                                바로가기
                            </RightContentButton>
                        </RightContentWrap>
                    </RightContent>
                </ServiceContent>

                {/* 두번째 서비스  */}
                <ServiceContent>
                    <LeftContent>
                        <LeftContentWrap>
                            <LeftContentTitle>
                                AI 종 분석 서비스
                            </LeftContentTitle>
                            반려동물의 품종이 궁금하세요?
                            <br />
                            127종의 강아지와 13종의 고양이를 구분해드려요!
                            <br />
                            사진으로 간단하게 품종을 확인하세요!
                            <LeftContentButton
                                onClick={() => {
                                    navigate("/ai");
                                }}
                            >
                                바로가기
                            </LeftContentButton>
                        </LeftContentWrap>
                    </LeftContent>
                    <ImageWrap
                        style={{ backgroundImage: `url(${HomePhoto01})` }}
                    />
                </ServiceContent>

                {/* 세번째 서비스  */}
                <ServiceContent>
                    <ImageWrap
                        style={{ backgroundImage: `url(${HomePhoto02})` }}
                    />
                    <RightContent>
                        <RightContentWrap>
                            <RightContentTitle>우리 동네 MAP</RightContentTitle>
                            우리 동네에 있는 반려동물 관련 장소를
                            알고싶으신가요?
                            <br />
                            반려동물의 산책로, 병원, 카페, 미용실을 쉽고
                            편리하게 찾아보세요!
                            <br />
                            <RightContentButton
                                onClick={() => {
                                    navigate("/map");
                                }}
                            >
                                바로가기
                            </RightContentButton>
                        </RightContentWrap>
                    </RightContent>
                </ServiceContent>

                {/* 네번째 서비스  */}
                <ServiceContent style={{ border: "none" }}>
                    <LeftContent>
                        <LeftContentWrap>
                            <LeftContentTitle>알.쓸.펫.잡</LeftContentTitle>
                            알아둬야 쓸 수 있는 펫 잡학사전
                            <br />
                            궁금한 점을 해결하고, 반려동물에 관한 정보를
                            얻어가세요!
                            <LeftContentButton
                                onClick={() => {
                                    navigate("/board");
                                }}
                            >
                                바로가기
                            </LeftContentButton>
                        </LeftContentWrap>
                    </LeftContent>
                    <ImageWrap
                        style={{ backgroundImage: `url(${HomePhoto04})` }}
                    />
                </ServiceContent>
            </ServiceWrap>
        </>
    );
};

export default Home;
