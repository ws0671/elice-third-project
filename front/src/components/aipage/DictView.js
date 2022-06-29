import styled from "styled-components";
import { Box, Tab, Grid, InputBase, } from "@mui/material";

const DictView = () => {
    return (
        <ViewContainer container>
            사전 항목 보기입니다.
        </ViewContainer>
    );
}

export default DictView;

const ViewContainer = styled(Grid)`
    background-color: #ffffff;
    border-radius: 10px;
    margin-bottom: 25px;
    justify-content: space-between;
    width: 100%;
    overflow: hidden;
    padding: 0 15px;
    cursor: pointer;
    box-shadow: 2px 2px 10px #d9d9d9;
`;
