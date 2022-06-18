import logo from "../../assets/images/logo.jpg";
import styled from "styled-components";

const AuthLogo = () => {
  return (
    <>
      <Wrapper>
        <LogoImg src={logo} alt="로고" />
        <ServiceName>궁금하냥?</ServiceName>
      </Wrapper>
    </>
  );
};

export default AuthLogo;

const LogoImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ServiceName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
