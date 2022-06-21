import { useDaumPostcodePopup } from "react-daum-postcode";

import { Button } from "@mui/material";

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

  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      sx={{ position: "absolute", right: "0px", bottom: "10px" }}
    >
      위치 변경
    </Button>
  );
};

export default DaumPostcode;
