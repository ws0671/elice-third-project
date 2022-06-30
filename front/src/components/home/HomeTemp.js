import { Grid } from "@mui/material";
import Layout from "../common/Layout";
import IntroSlider from "./IntroSlider";

const HomeTemp = () => {
    return (
        <Grid sx={{ width: "100%", paddingTop: "80px" }}>
            <IntroSlider />
        </Grid>
    );
};

export default HomeTemp;
