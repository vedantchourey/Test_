import styled from "@emotion/styled";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export const NoobToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
    "& .MuiToggleButtonGroup-grouped":{
        borderRadius:"10px",
        border:"1px solid rgba(255, 255, 255, 0.3)"
    }
}));

export const NoobToggleButton = styled(ToggleButton)(() => ({
    "&.Mui-selected":{
        backgroundColor:"rgba(114, 101, 241, 0.5)"
    }
}));

export default NoobToggleButtonGroup;
