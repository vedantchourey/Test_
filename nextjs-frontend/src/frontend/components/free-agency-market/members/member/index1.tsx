import styled from "@emotion/styled";
import { Box, Button, MenuItem, Select, useMediaQuery, useTheme } from "@mui/material";

export const NoobButton = styled(Button)(() => ({
  color: "white",
  borderRadius: 0,
  textTransform: "capitalize",
}));

const MemberButton: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>{isMobile ? (
      <>
        <Box sx={{ m: 1 }}>

          <Select value={"search"} fullWidth={true}>
            <MenuItem value="search">Search by Games</MenuItem>
          </Select>
        </Box>
        <Box sx={{ m: 1 }}>
          <Select value={"platform"} fullWidth={true}>
            <MenuItem value="platform">Platform</MenuItem>
          </Select>
        </Box>
      </>
    ) : (
      <>
        <Box>
          <Select value={"search"} sx={{ m: 1 }}>
            <MenuItem value="search">Search by Games</MenuItem>
          </Select>
          <Select value={"platform"} sx={{ m: 1 }}>
            <MenuItem value="platform">Platform</MenuItem>
          </Select>
        </Box>
      </>
    )
    };
    </>
  );
};

export default MemberButton;
