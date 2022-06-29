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
                    {/* <Image src={Image} alt="logo" width={30} height={30} /> */}
                    <Title>궁금하냥?</Title>
                    <span>반려동몰의 모든 것</span>
                </LogoWrapper>
                <ServiceWrapper>
                    <Title>Service</Title>
                    <span>MAP / AI 종분석 / COMMUNITY </span>
                </ServiceWrapper>
                <TextWrapper>
                    <LinkWrapper>
                        <LinkText>FrontEnd</LinkText>

                        <span>김애림</span>
                        <span>이정민</span>
                    </LinkWrapper>
                    <LinkWrapper>
                        <LinkText>BackEnd</LinkText>
                        <span>이예원</span>
                        <span>이영민</span>
                    </LinkWrapper>
                    <LinkWrapper>
                        <LinkText>인공지능</LinkText>
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
`;

const Title = styled.span`
    font-size: 20px;
    margin-bottom: 5px;
    color: #65949e; ;
`;

const LinkText = styled.span`
    border-bottom: solid 1px;
    margin: 20px 0;
    font-size: 18px;
    font-weight: bold;
    color: gray;
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
