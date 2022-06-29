import { useState } from "react";
import styled from "styled-components";

import { Box, Tab, Grid, Button } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { DefaultBtn, NegativeBtn } from "../common/Buttons";
import Layout from "../common/Layout";

import DictCat from "./DictCat";
import DictDog from "./DictDog";

const BreedDicts = ({setBreedDict}) => {
    const [value, setValue] = useState("DOG");

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <>
            
            {/* <div>
            여기는 품종 사전입니다.
            </div> */}
        
            <TabContext value={value}>
            {/* <DefaultBtn
                onClick={() => setBreedDict(false)}
                style={{
                    float: "right",
                }}
            >
                <div className="btnText">뒤로가기</div>
            </DefaultBtn> */}
                <Box
                    sx={{
                    position: "relative",
                    }}
                >
                    <CategoryTabList
                    onChange={handleTabChange}
                    aria-label="map tab list"
                    >
                        <CategoryTab label="강아지" value="DOG" />
                        <CategoryTab label="고양이" value="CAT" />
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
                            {(value === 'DOG') && <DictDog />}
                            {(value === 'CAT') && <DictCat />}
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

