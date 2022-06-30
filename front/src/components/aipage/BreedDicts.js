import { useState } from "react";
import styled from "styled-components";

import { Box, Tab, Grid,  } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { DefaultBtn } from "../common/Buttons";

import Dict from "./Dict";

const BreedDicts = ({setBreedDict}) => {


    const [value, setValue] = useState("dogs");

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    
    return (
        <> 
            <TabContext value={value}>
       
                <Box
                    sx={{
                    position: "relative",
                    }}
                >
                    <CategoryTabList
                    onChange={handleTabChange}
                    aria-label="map tab list"
                    >
                        <CategoryTab label="강아지" value="dogs" />
                        <CategoryTab label="고양이" value="cats" />
                        
                        <BackBtn onClick={() => setBreedDict(false)}>뒤로가기</BackBtn>
                    </CategoryTabList>
                   
                </Box>
                
                <TabPanel
                    value={value}
                    sx={{
                    backgroundColor: "white",
                    borderRadius: "0px 10px 10px 10px",
                    boxShadow: "2px 2px 10px #d9d9d9",
                    }}
                >
                    <Grid container>
                        <Grid item md={12} sm={12} xs={12} sx={{ minHeight: "600px" }}>
                            
                            {(value === 'dogs') && <Dict dictType="dogs" />}
                            {(value === 'cats') && <Dict dictType="cats" />}
                        </Grid>
                    </Grid>
                </TabPanel>
            </TabContext>
            
        </>
        
    );
};



export default BreedDicts;

const CategoryTabList = styled(TabList)`
  && .MuiTabs-indicator {
    display: none;
  }
`;


const CategoryTab = styled(Tab)`
  && {
    background-color: #65949e;
    color: white;
    border-radius: 10px 10px 0px 0px;
    margin-right: 5px;
    font-size: 20px;
    font-family: "GangwonEdu_OTFBoldA";
  }

  &&.Mui-selected {
    color: black;
    background-color: white;
  }
`;

const BackBtn = styled(DefaultBtn)`
  && {
    position: absolute;
    right: 0px;
    bottom: 10px;

  }
`;

