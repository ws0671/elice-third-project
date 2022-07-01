import { Grid } from "@mui/material";
import IntroSlider from "./IntroSlider";
import Home from "./Home";
const HomeTemp = () => {
    return (
        <Grid sx={{ width: "100%", paddingTop: "80px" }}>
            <IntroSlider />
            <Home />
        </Grid>
    );
};

export default HomeTemp;
