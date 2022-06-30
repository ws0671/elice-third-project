import Img from "../../assets/images/footer.png";
import styled from "styled-components";
import Image from "../../assets/images/logo.png";
import { Container, Grid } from "@mui/material";
const Footer = () => {
    return (
        <FooterWrapper>
            <Container
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <LogoWrapper>
                    <Title>궁금하냥?</Title>
                    <span>반려동몰의 모든 것</span>
                </LogoWrapper>
                <ServiceWrapper>
                    <Title>Service</Title>
                    <span>MAP / AI 종분석 / COMMUNITY </span>
                </ServiceWrapper>
                <TextWrapper>
                    <LinkWrapper>
                        <Position>FrontEnd</Position>

                        <span>김애림</span>
                        <span>이정민</span>
                    </LinkWrapper>
                    <LinkWrapper>
                        <Position>BackEnd</Position>
                        <span>이예원</span>
                        <span>이영민</span>
                    </LinkWrapper>
                    <LinkWrapper>
                        <Position>인공지능</Position>
                        <span>소범기</span>
                        <span>홍일도</span>
                    </LinkWrapper>
                </TextWrapper>
            </Container>
        </FooterWrapper>
    );
};

export default Footer;

const FooterWrapper = styled.div`
    height: 120px;
    padding: 10px 0;
    background-color: white;
    font-size: 12px;
    width: 100%;
    margin-top: 7%;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    @media screen and (max-width: 600px) {
        font-size: 9px;
        height: 90px;
    }
`;

const LogoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25%;
    color: gray;
`;

const ServiceWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 15%;
    color: gray;
`;

const Title = styled.span`
    font-size: 20px;
    margin-bottom: 5px;
    color: #65949e;
    @media screen and (max-width: 600px) {
        font-size: 12px;
        margin-bottom: 3px;
    }
`;

const Position = styled.span`
    border-bottom: solid 1px;
    margin: 20px 0;
    font-size: 18px;
    font-weight: bold;
    color: gray;
    @media screen and (max-width: 600px) {
        font-size: 10px;
        margin: 10px 0;
    }
`;
const TextWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 40%;
    color: gray;
`;

const LinkWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
