import {styled} from "@mui/material/styles";
import {Typography} from "@mui/material";

export const StyledHeader = styled(Typography)(({theme}) => ({
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "22px",
    letterSpacing: "-0.333333px",
    margin: "10px 0"
}))

export const StyledTypography = styled(Typography)(({theme}) => ({
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "24px",
    letterSpacing: "-0.333333px",
    m: "10px 0"
}))