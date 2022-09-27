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
import { TournamentData } from "../../tournament";
import backendConfig from "../../../../backend/utils/config/backend-config";

const { credit_config } = backendConfig;

const CreateData = (
  prizes: string,
  reward: string
): { prizes: string; reward: string } => {
  return { prizes, reward };
};

interface PrizesProps {
  data: TournamentData;
}

const Prizes: React.FC<PrizesProps> = ({ data }) => {
  const pricePool = data?.pricingDetails?.currentPricePool || 0;
  const playersLimit = data?.bracketsMetadata?.playersLimit || 2;

  const rows =
    data?.bracketsMetadata?.type === "SINGLE" &&
    ((data?.bracketsMetadata?.type !== "SINGLE" && playersLimit > 2) ||
      data?.bracketsMetadata?.thirdPlace)
      ? [
          CreateData(
            "Place 1:",
            `${(
              (data?.settings?.entryType === "credit"
                ? pricePool * 0.6 * credit_config.price_per_credit
                : 600) * parseInt(data?.settings?.tournamentFormat[0] || "1")
            ).toFixed()}`
          ),
          CreateData(
            "Place 2:",
            `${(
              (data?.settings?.entryType === "credit"
                ? pricePool * 0.3 * credit_config.price_per_credit
                : 300) * parseInt(data?.settings?.tournamentFormat[0] || "1")
            ).toFixed()}`
          ),
          CreateData(
            "Place 3:",
            `${(
              (data?.settings?.entryType === "credit"
                ? pricePool * 0.1 * credit_config.price_per_credit
                : 100) * parseInt(data?.settings?.tournamentFormat[0] || "1")
            ).toFixed()}`
          ),
        ]
      : [
          CreateData(
            "Place 1:",
            `${(
              (data?.settings?.entryType === "credit"
                ? pricePool * 0.65 * credit_config.price_per_credit
                : 700) * parseInt(data?.settings?.tournamentFormat[0] || "1")
            ).toFixed()}`
          ),
          CreateData(
            "Place 2:",
            `${(
              (data?.settings?.entryType === "credit"
                ? pricePool * 0.35 * credit_config.price_per_credit
                : 300) * parseInt(data?.settings?.tournamentFormat[0] || "1")
            ).toFixed()}`
          ),
        ];
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
                      {row.reward} ₹
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
