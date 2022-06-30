import { Grid } from "@mui/material";
import styled from "styled-components";

const DictListItem = ({title, activated = true}) => {
    const itemColor = activated ? '#659492' : '#ffffff';
    const fontColor = activated ? '#ffffff' : '#000000';

    // console.log(itemColor);

    const clickHandler = (event) => {
        console.log(event.key);
    }

    return (
        <GridwithUnderline style={{backgroundColor:itemColor, color:fontColor}}>
            {title}
        </GridwithUnderline>
    );
};

export default DictListItem;

const GridwithUnderline = styled(Grid)`
    border-bottom: solid 1px #d9d9d9;
    width: 100%;
    padding: 4px;
    font-size: 20px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
`;