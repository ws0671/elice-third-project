import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const Input = styled(TextField)({
  "& label.Mui-focused": {
    color: "#C2937E",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#C2937E",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#C2937E",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#C2937E",
    },
  },
});

const AuthButton = styled(Button)({
  fontFamily: "GangwonEdu_OTFBoldA",
  fontSize: "20px",
  margin: "15px 0px",
  backgroundColor: "#C2937E",
  "&:hover": {
    backgroundColor: "#C2937E",
    borderColor: "#C2937E",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#C2937E",
    borderColor: "#C2937E",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(194,147,126,.5)",
  },
});

export { Input, AuthButton };
