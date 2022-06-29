import { useDaumPostcodePopup } from "react-daum-postcode";

import { DefaultBtn } from "../common/Buttons";

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
    <DefaultBtn
      onClick={handleClick}
      sx={{ position: "absolute", bottom: "10px", right: "0px" }}
    >
      <div className="btnText">위치 변경</div>
    </DefaultBtn>
  );
};

export default DaumPostcode;
