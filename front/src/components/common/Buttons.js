import styled from "styled-components";
import { Button } from "@mui/material";

const DefaultBtn = styled(Button)`
  && {
    background-color: #c2937e;
    color: white;
    font-family: "GangwonEdu_OTFBoldA";
    font-size: 16px;
    box-shadow: 1px 1px 5px #d9d9d9;
    border-radius: 5px;
    height: 32px;
  }

  &&:hover {
    background-color: #b07d66;
  }

  .btnText {
    padding-top: 5px;
  }
`;

const NegativeBtn = styled(Button)`
  && {
    background-color: #fe6c63;
    color: white;
    font-family: "GangwonEdu_OTFBoldA";
    font-size: 16px;
    box-shadow: 1px 1px 5px #d9d9d9;
    border-radius: 5px;
    height: 32px;
  }

  &&:hover {
    background-color: #fd584e;
  }

  .btnText {
    padding-top: 5px;
  }
`;

export { DefaultBtn, NegativeBtn };
