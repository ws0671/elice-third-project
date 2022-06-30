import { Grid } from "@mui/material";

import DictList from "./DictList";
import DictView from "./DictView";

const DictCat = () => {
    return (
        <Grid container>
            <DictList type="cats" />
            <DictView />
        </Grid>
    );
}

export default DictCat;