import { Grid } from "@mui/material";
import styled from "styled-components";

const Left = styled(Grid)`
    width: 69%;
    border: solid 1px #d9d9d9;
    border-radius: 7px;
    min-height: 600px;
    padding: 3%;
`;

const Right = styled(Grid)`
    width: 29%;
    border: solid 1px #d9d9d9;
`;
const User = styled(Grid)`
    border-bottom: solid 1px #d9d9d9;
    display: flex;
    justify-content: space-between;
    padding: 0 0 2% 0;
`;

const UserImg = styled(Grid)`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: gray;
`;
const UserName = styled(Grid)`
    width: 60%;
    background-color: gray;
`;

const UserDate = styled(Grid)`
    width: 25%;
    background-color: gray;
`;

const Title = styled(Grid)`
    font-size: 15px;
    color: #464646;
`;

export { Left, Right, Title, User, UserImg, UserName, UserDate };
