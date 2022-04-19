import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ViewCard from "../../ui-components/view-card";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

const CreateData = (
  prizes: string,
  reward: string
): { prizes: string; reward: string } => {
  return { prizes, reward };
};

const rows = [
  CreateData("Place 1:", "5000$"),
  CreateData("Place 2:", "2500$"),
  CreateData("Place 3:", "3000$"),
  CreateData("Place 4:", "PC Case"),
  CreateData("Place 5:", "Cooling Kit"),
];

const Prizes: React.FC = () => {
  return (
    <ViewCard>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography textTransform={"uppercase"} textAlign="left">
                  Place
                </Typography>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <Typography textTransform={"uppercase"} textAlign="left">
                  Rewards
                </Typography>{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.prizes}>
                <TableCell scope="row">
                  <Box display="flex" alignItems={"center"}>
                    {index <= 2 ? (
                      <Image
                        src={`/icons/BadgeIcon_${index + 1}.svg`}
                        width={"26px"}
                        height={"30px"}
                      />
                    ) : null}
                    <Typography
                      textTransform={"uppercase"}
                      marginLeft={index <= 2 ? 2 : 0}
                    >
                      {row.prizes}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell scope="row">
                  <Box display="flex" alignItems={"center"}>
                    <Image
                      src={"/icons/RewardIcon.svg"}
                      width={"26px"}
                      height={"30px"}
                    />
                    <Typography textTransform={"uppercase"} marginLeft={2}>
                      {row.reward}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ViewCard>
  );
};

export default Prizes;
