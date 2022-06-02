import styled from "@emotion/styled";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { getAuthHeader } from "../../utils/headers";

export const HeadCell = styled(TableCell)(() => ({
  borderTop: "1px solid #ffffff1a",
  borderBottom: "none",
}));

export const NoobCell = styled(TableCell)(() => ({
  border: "1px solid #ffffff1a",
  alignItems: "center",
}));

export const NoobRow = styled(TableRow)(() => ({
  align: "center",
}));

export interface Player {
  balance: number;
  firstName: string;
  lastName: string;
  user_id: string;
}

export interface TeamData {
  id: string;
  name: string;
  players: Player[];
}

const TeamListData: React.FC = () => {
  const [teamdata, setData] = React.useState<TeamData[]>([]);
  const router = useRouter();
  const teamList = async (): Promise<void> => {
    try {
      const endpoint = "api/teams";
      const headers = await getAuthHeader();
      axios.get(endpoint, { headers: headers }).then((res) => {
        setData(res.data.result);
      });
    } catch (err) {
      alert(err);
    }
  };

  const handleNavigation = async (id: string): Promise<void> => {
    router.push(`/team/view/${id}/members`);
  };

  React.useEffect(() => {
    teamList();
  }, []);

  return (
    <React.Fragment>
      <Grid container rowSpacing={2} mt={4}>
        <Grid item xs={12} sm={12} md={12} mb={12}>
          <TableContainer>
            <Table>
              <TableBody>
                {teamdata.map((item) => {
                  return (
                    <NoobRow
                      sx={{
                        display: { sm: "flex", xs: "flex", md: "table-row" },
                        flexDirection: { sm: "column", xs: "column" },
                      }}
                      key={item.name}
                      onClick={(): void => {
                        handleNavigation(item.id);
                      }}
                    >
                      <NoobCell>
                        <Box alignItems="center" display="center">
                          <img
                            src="/icons/Rectangle.svg"
                            width={"65px"}
                            height={"65px"}
                          />
                          <Box>
                            <Typography marginLeft={2} marginRight={2}>
                              {item.name}
                            </Typography>
                            {/* <Typography marginLeft={2} marginRight={2}>{item.id}</Typography> */}
                          </Box>
                        </Box>
                      </NoobCell>
                    </NoobRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default TeamListData;
