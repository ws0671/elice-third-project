import { useState } from "react";
import { Grid } from "@mui/material";

import DictList from "./DictList";
import DictView from "./DictView";

const Dict = ({dictType='dogs'}) => {
    const [curContent, setCurContent] = useState('');
    console.log(dictType);
    return (
        <Grid container>
            <DictList type={dictType} setCurContent={setCurContent}/>
            <DictView type={dictType} content={curContent}/>
        </Grid>
    );
}

export default Dict;