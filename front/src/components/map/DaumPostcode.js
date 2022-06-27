import { useDaumPostcodePopup } from "react-daum-postcode";

import { Button } from "@mui/material";
import styled from "styled-components";

const DaumPostcode = ({ setAddress }) => {
  const open = useDaumPostcodePopup();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return <LocChgBtn onClick={handleClick}>위치 변경</LocChgBtn>;
};

export default DaumPostcode;

const LocChgBtn = styled(Button)`
  && {
    position: absolute;
    right: 0px;
    bottom: 10px;
    background-color: #c2937e;
    color: white;
    font-family: "GangwonEdu_OTFBoldA";
    font-size: 20px;
    box-shadow: 1px 1px 5px #d9d9d9;
  }
`;
