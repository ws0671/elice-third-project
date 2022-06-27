import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import dog from "../../assets/images/dog.jpg";
import { Grid } from "@mui/material";
import { ServiceTitle, ServiceContent, ServiceButton } from "./SliderStyle";

// 서비스 소개 Slide 틀
const Slide = ({ src, service }) => {
    const navigate = useNavigate();

    return (
        <Grid container>
            <Grid item lg={6} sx={{ padding: "10px", margin: "0 auto" }}>
                <Img src={src} />
            </Grid>
            <Grid
                item
                lg={6}
                sx={{
                    padding: "20px",
                    margin: "0 auto",
                    width: "100%",
                }}
            >
                <ServiceTitle>{service.name}</ServiceTitle>
                <ServiceContent>{service.content}</ServiceContent>
                <ServiceButton
                    onClick={() => {
                        navigate(service.url);
                    }}
                >
                    바로 가기
                </ServiceButton>
            </Grid>
        </Grid>
    );
};

const Slide1 = () => {
    return (
        <Grid
            style={{
                backgroundImage: `url(${dog})`,
                padding: "25% 0",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            집사야, 우리가 궁금하냥? 반려동물의 모든 것!
        </Grid>
    );
};

const Slide2 = () => {
    return (
        <Slide
            src="https://cdn.pixabay.com/photo/2022/06/22/06/53/cabinet-7277181_960_720.jpg"
            service={{
                name: "우리동네 지도",
                content:
                    "우리 동네에 있는 반려동물 관련 장소를 간편하고 쉽게 찾아보세요!\n반려동물의 산책로,카페,미용실,병원을 클릭 한번으로 찾아보세요\n찜 기능으로 마이페이지에서 나만의 장소를 저장하세요!",
                url: "/map",
            }}
        />
    );
};

const Slide3 = () => {
    return (
        <Slide
            src={
                "https://cdn.pixabay.com/photo/2022/06/22/06/53/cabinet-7277181_960_720.jpg"
            }
            service={{
                name: "AI 종 분석",
                content:
                    "AI로 반려동물의 정확한 종을 알아보세요! 쉽고 간편하게 사진으로 확인해요!",
                url: "/ai",
            }}
        />
    );
};

const Slide4 = () => {
    return (
        <Slide
            src={
                "https://cdn.pixabay.com/photo/2022/06/22/06/53/cabinet-7277181_960_720.jpg"
            }
            service={{
                name: "소통 공간",
                content:
                    "소통 공간을 통해 궁금한 점을 해결해보세요! 거기다 꿀팁까지!",
                url: "/board",
            }}
        />
    );
};

export { Slide1, Slide2, Slide3, Slide4 };

const Img = styled.img`
    width: 100%;
`;
