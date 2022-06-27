import Img from "../../assets/images/footer.png";
import styled from "styled-components";

const Footer = () => {
  return <Wrapper></Wrapper>;
};

export default Footer;

const Wrapper = styled.footer`
  background: url(${Img});
  background-repeat: repeat-x;
  background-position: center bottom;
  height: 200px;
`;
