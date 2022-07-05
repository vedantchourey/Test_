import React, { useEffect } from "react";
import { Avatar, Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ReactComponent as GameIcon } from "../../../../../public/icons/GameIcon_1.svg";
import { ReactComponent as YouTubeIcon } from "../../../../../public/icons/YouTube_1.svg";
import NoobFilePicker from "../../utils/noob-file-picker";
import { allowedImageExtensions } from "../../../../models/constants";
import { v4 } from "uuid";
import { uploadImage } from "../../../service-clients/image-service-client";
import { frontendSupabase } from "../../../services/supabase-frontend-service";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const CardDesktop: React.FC<TeamCardProp> = ({name ="-", onChangeTeamLogo, team}) => {
  const teamLogo = team?.teamLogo
    ? frontendSupabase.storage.from("public-files").getPublicUrl(team.teamLogo)
        .publicURL
    : undefined;
  return (
    <Grid container columnSpacing={2}>
      <Grid item md={3} lg={2}>
        <Avatar
          src={teamLogo || "/icons/Rectangle.svg"}
          sx={{ width: 150, height: 150, marginBottom: 2 }}
        />
        <IconButton
          sx={{ position: "absolute", backgroundColor: "#6932F9", mt: -7, ml: 2 }}
          onClick={(): any => onChangeTeamLogo()}
        >
          <EditIcon />
        </IconButton>
      </Grid>
      <Grid item md={6} lg={10} display={"flex"} flexDirection={"column"}>
        <Typography color={"white"} textAlign="left" component="h4">
          {name}
        </Typography>
        <Box display={"flex"} marginTop="30px">
          <Box
            border={"1px solid #31274A"}
            height="48px"
            width={"48px"}
            display="flex"
            alignItems={"center"}
            justifyContent="center"
          >
            <GameIcon />
          </Box>
          <Box
            border={"1px solid #31274A"}
            height="48px"
            width={"48px"}
            display="flex"
            alignItems={"center"}
            justifyContent="center"
          >
            <YouTubeIcon />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

const CardMobile: React.FC<TeamCardProp> = ({name ="-", onChangeTeamLogo, team}) => {
  const teamLogo = team?.teamLogo
    ? frontendSupabase.storage.from("public-files").getPublicUrl(team.teamLogo)
        .publicURL
    : undefined;
  return (
    <Grid container>
      <Grid item xs={12} display={"flex"}>
        <Box width={"65px"} height={"65px"} position="relative">
          <Avatar
            src={teamLogo || "/icons/Rectangle.svg"}
            sx={{ width: 85, height: 85, marginBottom: 2 }}
          />
          <Box position={"absolute"} mt={-7} ml={1}>
            <IconButton onClick={(): any => onChangeTeamLogo()} color="primary">
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
        <Box marginLeft={2}>
          <Typography color={"white"} textAlign="left" component="h4">
            {" "}
            {name}{" "}
          </Typography>
          <Box
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background: "#08001C",
              display: "flex",
              alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <Typography color={"white"} variant={"body2"} padding={1}>
              Team Elo Rating:
              <Typography
                component={"span"}
                style={{ color: "#F09633", marginLeft: "30px" }}
              >
                {" "}
                356{" "}
              </Typography>{" "}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} display="flex" marginTop={4}>
        <Box
          border={"1px solid #31274A"}
          height="48px"
          width={"48px"}
          display="flex"
          alignItems={"center"}
          justifyContent="center"
        >
          <GameIcon />
        </Box>
        <Box
          border={"1px solid #31274A"}
          height="48px"
          width={"48px"}
          display="flex"
          alignItems={"center"}
          justifyContent="center"
        >
          <YouTubeIcon />
        </Box>
      </Grid>
    </Grid>
  );
};

interface TeamCardProp{
  name?:string
  onChangeTeamLogo?: any
  onChangeCover?: any
  team?: any;
  refresh?: any;
}

const TeamCard: React.FC<TeamCardProp> = ({ children, name, team, refresh }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [teamLogoPicker, setTeamLogoPicker] = React.useState(false)
  const [coverLogoPicker, setCoverLogoPicker] = React.useState(false)

  const teamCover = team?.teamCover
    ? frontendSupabase.storage.from("public-files").getPublicUrl(team.teamCover)
        .publicURL
    : undefined;

    useEffect(() => {
      if (teamLogoPicker) {
        setTimeout(() => setTeamLogoPicker(false), 500);
      }
    }, [teamLogoPicker]);

    useEffect(() => {
      if (coverLogoPicker) {
        setTimeout(() => setCoverLogoPicker(false), 500);
      }
    }, [coverLogoPicker]);
    

  return (
    <Box sx={{ marginX: { md: "70px", sm: "10px", xs: "10px" } }}>
      <div
        style={{
          padding: 20,
          marginBottom: 20,
          backgroundImage: `linear-gradient(180deg, rgba(64, 64, 64, 0.3), rgba(8, 0, 28, 0.8)), url(${teamCover || "/images/team-background.svg"} )`,
          backgroundRepeat: "no-repeat",
          backgroundClip: "border-box",
          backgroundOrigin: "border-box",
          borderRadius: 10,
          backgroundSize: "cover",
          display: "flex"
        }}
        // onClick={(): any => setCoverLogoPicker(true)}
      >
        {!isMobile ? (
          <CardDesktop
            name={name}
            onChangeTeamLogo={(): any => setTeamLogoPicker(true)}
            onChangeCover={(): any => setCoverLogoPicker(true)}
            team={team}
          />
        ) : (
          <CardMobile
            name={name}
            onChangeTeamLogo={(): any => setTeamLogoPicker(true)}
            onChangeCover={(): any => setCoverLogoPicker(true)}
            team={team}
          />
        )}
        <Box >
            <IconButton onClick={(): any => setCoverLogoPicker(true)} color="primary">
              <EditIcon />
            </IconButton>
          </Box>
      </div>
      <NoobFilePicker
        onFileSelected={async (file): Promise<any> => {
          if (file?.length) {
            const fileName = `${v4()}.png`;
            const { data, error } = await uploadImage(
              "public-files",
              `teams/logo/${fileName}`,
              file[0]
            );
            if (error) {
              alert("Some error while update team logo");
            } else {
              await frontendSupabase
                .from("teams")
                .update({
                  teamLogo: (data?.Key || "").replace("public-files/", ""),
                })
                .eq("id", team.id);
              refresh();
            }
          }
          setTeamLogoPicker(false);
        }}
        onError={(error): void => {
          console.error(error);
          setTeamLogoPicker(false);
        }}
        allowedExtensions={allowedImageExtensions}
        show={teamLogoPicker}
        maxFiles={1}
        minFiles={0}
        maxFileSizeInBytes={10000 * 10000}
      />
      <NoobFilePicker
        onFileSelected={async (file): Promise<any> => {
          if (file?.length) {
            const fileName = `${v4()}.png`;
            const { data, error } = await uploadImage(
              "public-files",
              `teams/logo/${fileName}`,
              file[0]
            );
            if (error) {
              alert("Some error while update team logo");
            } else {
              await frontendSupabase
                .from("teams")
                .update({
                  teamCover: (data?.Key || "").replace("public-files/", ""),
                })
                .eq("id", team.id);
              refresh();
            }
          }
          setCoverLogoPicker(false);
        }}
        onError={(error): void => {
          console.error(error);
          setCoverLogoPicker(false);
        }}
        allowedExtensions={allowedImageExtensions}
        show={coverLogoPicker}
        maxFiles={1}
        minFiles={0}
        maxFileSizeInBytes={10000 * 10000}
      />

      {children}
    </Box>
  );
};

export default TeamCard;
