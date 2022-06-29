import { Grid } from "@mui/material";
import styled from "styled-components";

const DictListItem = ({title}) => {

    return (
        <GridwithUnderline>
            {title}
        </GridwithUnderline>
    );
};

export default DictListItem;

const GridwithUnderline = styled(Grid)`
    border-bottom: solid 1px #d9d9d9;
    width: 90%;
    // padding: 2px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
`;