import styled from "@emotion/styled";
import { Button, Chip, Dialog, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { ReactComponent as CircleCloseIcon } from "../../../../../../public/icons/close.svg";
import { getAuthHeader } from "../../../../utils/headers";
import AccordionAlt from "../../../ui-components/accordion";
import CardLayout from "../../../ui-components/card-layout";

export const HeadCell = styled(TableCell)(() => ({
  alignItems: "center",
  border: "none",
}));

export const NoobCell = styled(TableCell)(() => ({
  alignItems: "center",
  color: "rgba(229, 229, 229, 0.5)",
  border: "none",
}));

export const NoobRow = styled(TableRow)(() => ({
  align: "center",
}));

export interface Tournament {
  id: number;
  tournamentId: number;
  matchId: number;
  status: string;
  reportedBy: TournamentReporter;
  createdAt: Date;
}

export interface TournamentReporter {
  stateId: string;
  lastName: string;
  username: string;
  countryId: string;
  firstName: string;
  agreeToTnc: boolean;
  dateOfBirth: Date;
}

export const calculateDiff = (createdAt: Date): string => {
  const today_date = new Date();
  const days = moment(today_date).diff(moment(createdAt), "days");
  return String(days);
};

const MatchDashboard: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  const [tournamentdata, setData] = React.useState<Tournament[]>([]);
  const [resultReq, setResultReq] = React.useState<any[]>([]);
  const [popVisible, setPopupVisible] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<string>("");
  const tournamentList = async (): Promise<void> => {
    try {
      const endpoint = "/api/match-dispute/list";
      const headers = await getAuthHeader();
      axios.get(endpoint, { params: { tournamentId: id }, headers: headers }).then((res) => {
        setData(res.data);
      });
    } catch (err) {
      alert(err);
    }
  };
  const fetchMatchResultReq = async (): Promise<void> => {
    try {
      const endpoint = "/api/tournaments/match-result";
      const headers = await getAuthHeader();
      axios.get(endpoint, { params: { tournament_id: id }, headers: headers }).then((res) => {
        setResultReq(res.data);
      });
    } catch (err) {
      alert(err);
    }
  };
  React.useEffect(() => {
    tournamentList();
    fetchMatchResultReq();
  }, []);
  const resolveDispute = async (id: any): Promise<void> => {
    const endpoint = "/api/match-dispute/update";
    const headers = await getAuthHeader();
    axios.patch(endpoint, { id, status: "RESOLVED" }, { headers: headers }).then(() => {
      tournamentList();
    });
  };

  const acceptResult = async ({ id, tournament_id }: any): Promise<void> => {
    const endpoint = "/api/tournaments/match-result";
    const headers = await getAuthHeader();
    axios.patch(endpoint, { id, status: "RESOLVED", tournament_id }, { headers: headers }).then(() => {
      fetchMatchResultReq();
    });
  };

  const toggle = (data: string): void => {
    setImage(data);
    setPopupVisible(!popVisible);
  };
  return (
    <React.Fragment>
      <AccordionAlt title="MATCH DISTIPUTES" icon={{ expanded: <CircleCloseIcon /> }}>
        <CardLayout title="Match Distiputes">
          <Grid container rowSpacing={1} columnSpacing={5}>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableBody>
                    <NoobRow>
                      <HeadCell>
                        <Typography align="left">Match</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Type of Report</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Reporter</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Status</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Assign</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Action</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Time Since Report</Typography>
                      </HeadCell>
                    </NoobRow>
                    {tournamentdata.map((item) => {
                      return (
                        <NoobRow key={item.id}>
                          <NoobCell>
                            <Typography>{item?.matchId}</Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography>Incorrect score</Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography>
                              {item?.reportedBy?.firstName} {item?.reportedBy?.lastName}
                            </Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography>
                              <Chip label={item.status} color="success" />
                            </Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography>co-admin</Typography>
                          </NoobCell>
                          {item.status === "PENDING" ? (
                            <NoobCell>
                              <Typography>
                                <Button onClick={(): any => resolveDispute(item.id)}>Resolve</Button>
                              </Typography>
                            </NoobCell>
                          ) : (
                            <>
                              <Typography></Typography>
                            </>
                          )}
                          <NoobCell>
                            <Typography>{calculateDiff(item.createdAt)}</Typography>
                          </NoobCell>
                        </NoobRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardLayout>
      </AccordionAlt>
      <AccordionAlt title="MATCH RESULT REQUEST" icon={{ expanded: <CircleCloseIcon /> }}>
        <CardLayout title="Match Result Request">
          <Grid container rowSpacing={1} columnSpacing={5}>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableBody>
                    <NoobRow>
                      <HeadCell>
                        <Typography align="left">Match</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Opponent 1 Score</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Opponent 2 Score</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Status</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Action</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>View Image</Typography>
                      </HeadCell>
                    </NoobRow>
                    {resultReq.map((item) => {
                      return (
                        <NoobRow key={item.id}>
                          <NoobCell>
                            <Typography>{item.match_id}</Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography>{item?.opponent1?.score}</Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography>{item?.opponent2?.score}</Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography>
                              <Chip label={item.status} color="success" />
                            </Typography>
                          </NoobCell>
                          {item.status === "PENDING" ? (
                            <NoobCell>
                              <Typography>
                                <Button onClick={(): any => acceptResult(item)}>Resolve</Button>
                              </Typography>
                            </NoobCell>
                          ) : (
                            <>
                              <Typography></Typography>
                            </>
                          )}
                          <NoobCell>
                            <Button onClick={(): any => toggle(item.screenshot)}>View</Button>
                          </NoobCell>
                        </NoobRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardLayout>
      </AccordionAlt>
      <Dialog open={popVisible} onClose={(): void => toggle("")} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <img height={"70%"} src={image} />
      </Dialog>
      <Box display="flex" justifyContent={"flex-end"}>
        <Button variant="contained"> Send </Button>
      </Box>
    </React.Fragment>
  );
};

export default MatchDashboard;
