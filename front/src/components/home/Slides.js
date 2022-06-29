import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import banner4 from "../../assets/images/computer_and_dog.jpg";
import banner1 from "../../assets/images/avi-richards-aYHgchNOsGY-unsplash.jpg";
import banner5 from "../../assets/images/josh-rakower-zBsXaPEBSeI-unsplash.jpg";
import banner2 from "../../assets/images/french-bulldog-walking-leash-park.jpg";
import banner3 from "../../assets/images/mikhail-vasilyev-NodtnCsLdTE-unsplash.jpg";
import { Container, Grid } from "@mui/material";
import {
    ServiceTitle,
    ServiceContent,
    ServiceButton,
    SubDomain,
    Domain,
} from "./SliderStyle";

// 서비스 소개 Slide 틀
const Slide = ({ src, service }) => {
    const navigate = useNavigate();

    return (
        <Banner
            container
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${src})`,
            }}
        >
            <TextBox2
                sx={{
                    padding: "20px",
                    margin: "0 auto",
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
            </TextBox2>
        </Banner>
    );
};

const Slide1 = () => {
    return (
        <Banner
            container
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${banner1})`,
            }}
        >
            <TextBox1
                sx={{
                    padding: "20px",
                    margin: "0 auto",
                }}
            >
                {" "}
                <SubDomain>집사야, 우리가</SubDomain>
                <Domain>궁금하냥</Domain>
                <SubDomain>반려동물에 관한 모든것</SubDomain>
            </TextBox1>
        </Banner>
    );
};

const Slide2 = () => {
    return (
        <Slide
            src={banner2}
            service={{
                name: "우리동네 지도",
                content:
                    "우리 동네에 있는 반려동물 관련 장소를 \n간편하고 쉽게 찾아보세요!\n산책로,카페,미용실,병원\n찜 기능까지!",
                url: "/map",
            }}
        />
    );
};

const Slide3 = () => {
    const navigate = useNavigate();
    return (
        <Banner
            container
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${banner5})`,
            }}
        >
            <TextBox3
                sx={{
                    padding: "20px",
                    margin: "0 auto",
                }}
            >
                {" "}
                <ServiceTitle>AI 종 분석</ServiceTitle>
                <ServiceContent>
                    반려동물의 정확한 종이 궁금하지 않으신가요?
                    <br />
                    사진으로 간단하게 품종을 확인하세요!
                </ServiceContent>
                <ServiceButton
                    onClick={() => {
                        navigate("/ai");
                    }}
                >
                    바로 가기
                </ServiceButton>
            </TextBox3>
        </Banner>
    );
};

const Slide4 = () => {
    return (
        <Slide
            src={banner4}
            service={{
                name: "소통 공간",
                content: "소통 공간을 통해 궁금한 점을 해결해보세요!",
                url: "/board",
            }}
        />
    );
};

export { Slide1, Slide2, Slide3, Slide4 };

const TextBox3 = styled(Grid)`
    color: white;
    text-align: left;
    font-weight: bold;
    position: absolute;
    right: 40%;
    width: 50%;
`;

const TextBox2 = styled(Grid)`
    color: white;
    text-align: right;
    font-weight: bold;
    position: absolute;
    right: 10%;
    width: 50%;
    min-width: 300px;

    @media screen and (max-width: 750px) {
        right: 0%;
    }
`;

const TextBox1 = styled(Grid)`
    color: white;
    text-align: center;
    font-weight: bold;
`;

const Banner = styled(Grid)`
    && {
        width: 100%;
        aspect-ratio: 22 / 9;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        background-position: center;
        align-items: center;
        display: grid;

        @media screen and (max-width: 750px) {
            aspect-ratio: 2 / 1;
        }
    }
`;
