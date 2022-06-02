import styled from "@emotion/styled";
import {
    Button, Chip, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { ReactComponent as CircleCloseIcon } from "../../../../../../public/icons/close.svg";
import AccordionAlt from "../../../ui-components/accordion";
import CardLayout from "../../../ui-components/card-layout";

export const HeadCell = styled(TableCell)(() => ({
    alignItems: "center",
    border: "none"
}));

export const NoobCell = styled(TableCell)(() => ({
    alignItems: "center",
    color: "rgba(229, 229, 229, 0.5)",
    border: "none"
}));

export const NoobRow = styled(TableRow)(() => ({
    align: "center"
}));

const data: { match: string; type: string; reporter: string; status: string; assignedto: string; time: string; }[] = [
    {
        match: "1",
        type: "incorract score",
        reporter: "Admin",
        status: "Resolved",
        assignedto: "co-admin",
        time: "40",
    },
];

const MatchDashboard: React.FC = (): JSX.Element => {
    return (
        <React.Fragment>
            <AccordionAlt
                title="MATCH DISTIPUTES"
                icon={{ expanded: <CircleCloseIcon /> }}
            >
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
                                            <HeadCell> <Typography>Type of Report</Typography>
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
                                                <Typography>Time Since Report</Typography>
                                            </HeadCell>
                                        </NoobRow>
                                        {data.map((item) => {
                                            return (
                                                <NoobRow key={item.match}>
                                                    <NoobCell>
                                                        <Typography>{item.match}</Typography>
                                                    </NoobCell>
                                                    <NoobCell>
                                                        <Typography>{item.type}</Typography>
                                                    </NoobCell>
                                                    <NoobCell>
                                                        <Typography>{item.reporter}</Typography>
                                                    </NoobCell>
                                                    <NoobCell>
                                                        <Typography>
                                                            <Chip label={item.status} color="success" />
                                                        </Typography>
                                                    </NoobCell>
                                                    <NoobCell>
                                                        <Typography>{item.assignedto}</Typography>
                                                    </NoobCell>
                                                    <NoobCell>
                                                        <Typography>{item.time}</Typography>
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
            <Box display="flex" justifyContent={"flex-end"}>
                <Button variant="contained"> Send </Button>
            </Box>
        </React.Fragment>
    );
};

export default MatchDashboard;
