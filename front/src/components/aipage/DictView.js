import styled from "styled-components";
import { Box, Tab, Grid, InputBase, } from "@mui/material";

const DictView = ({content = 'hello',}) => {
    return (
        <Grid item md={9} sm={12} xs={12}>
            <ViewContainer>
                {content}

            </ViewContainer>
        </Grid>
    );
}

export default DictView;

const ViewContainer = styled(Grid)`
    background-color: #ffffff;
    border-radius: 10px;
    margin-bottom: 25px;
    justify-content: space-between;
    width: 100%;
    min-height: 640px;
    overflow: hidden;
    padding: 0 15px;
    cursor: pointer;
    box-shadow: 2px 2px 10px #d9d9d9;
`;
