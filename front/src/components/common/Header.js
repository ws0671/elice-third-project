import { useNavigate } from "react-router-dom";
import { Grid, Container, ToggleButton } from "@mui/material";
import styled from "styled-components";
import Image from "../../assets/images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import HeaderMenu from "./HeaderMenu";
import { useState } from "react";

const Header = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(false);

    return (
        <Wrapper>
            <Container
                sx={{
                    display: "flex",
                    height: "90px",
                    justifyContent: "space-between",
                }}
            >
                <Logo
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <LogoImg src={Image} alt="logo" />
                    <SvcName>궁금하냥?</SvcName>
                </Logo>
                <Nav className="navbar">
                    <NavButton
                        className="navbar_togglebtn"
                        value="check"
                        selected={selected}
                        onChange={() => {
                            setSelected(!selected);
                        }}
                    >
                        <MenuIcon />
                    </NavButton>
                    <ul className="webMenu">
                        <HeaderMenu />
                    </ul>
                    <ul className="mobileMenu">{selected && <HeaderMenu />}</ul>
                </Nav>
            </Container>
        </Wrapper>
    );
};

export default Header;

const NavButton = styled(ToggleButton)`
    && {
        border: none;
    }
`;

const Wrapper = styled.header`
    width: 100%;
    position: fixed;
    z-index: 100;
    background-color: #e6e9e4;
`;

const Logo = styled(Grid)`
    padding: 0px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
`;

const LogoImg = styled.img`
    height: 60px;
`;

const SvcName = styled.div`
    margin-left: 10px;
    font-size: 25px;
`;

const Nav = styled.nav`
    display: flex;
    align-items: center;
    a {
        font-size: 20px;
        color: black;
        text-decoration: none;
        cursor: pointer;

        ::after {
            content: "|";
            padding: 0px 20px;
            color: #c2937e;
            font-size: 25px;
        }

        &:last-child {
            ::after {
                content: none;
            }
        }
    }

    .navbar_togglebtn, .mobileMenu {
        display: none;
    }

    @media screen and (max-width: 850px) {
        position: relative;
        justify-content: center;
        flex-direction: column;
        display: flex;
        .webMenu {
            display: none;
        }
        .navbar_togglebtn {
            display: block;
        }
          .mobileMenu {
            background-color : #e6e9e4;
            width : 100vw;
            display : block;
            position: fixed;
            top : 70px;
            
            right : 0;

            a {
              display : inline-block;
              width : 100%;
              text-align : center;
              padding : 3%;
              font-size : 16px;
        
              :: after {
                content: none;
                }
            } 
            a:hover
            { text-decoration:underline;
              text-underline-position: under;
            }   

          }

      }
    }
`;
