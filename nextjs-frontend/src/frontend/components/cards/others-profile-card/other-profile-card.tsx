import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { CheckOutlined } from "@mui/icons-material";
import styles from "./other-profile-card.module.css";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { IOthersProfileResponse } from "../../../service-clients/messages/i-profile";
import {
  followUser,
  unFollowUser,
} from "../../../service-clients/follow-service";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { blockUser, unBlockUser } from "../../../service-clients/block-service";
import frontendConfig from "../../../utils/config/front-end-config";
import FollowersModal from "../../followers-list-modal/followers-list-modal";
import { useRouter } from "next/router";
import { frontendSupabase } from "../../../services/supabase-frontend-service";
import { useAppSelector } from "../../../redux-store/redux-store";
import { userProfileSelector } from "../../../redux-store/authentication/authentication-selectors";
import { getAuthHeader } from "../../../utils/headers";
import axios from "axios";
import moment from "moment";
import { fetchUserFollowerList, fetchUserFollowingList } from "../../../service-clients/profile-service-client";
import { IFollowersList } from "../../../service-clients/messages/i-followers-list-response";

const OtherProfileCard = (props: {
  userData: IOthersProfileResponse;
}): JSX.Element => {
  const router = useRouter();
  const [userData, setUserData] = useState(props.userData);
  const [showMenu, setShowMenu] = useState(false);
  const [teamData, setTeamData] = useState<any[]>([]);
  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const [openFollowingModal, setOpenFollowingModal] = useState(false);
  const [followers, setFollowers] = useState<IFollowersList[]>([]);
  const [followings, setFollowings] = useState<IFollowersList[]>([]);
  const user = useAppSelector(userProfileSelector);
  const [teamModal, setTeamModal] = useState(false)
  
  const fetchFollowers = async (): Promise<any> => {
    try {
      if (user) {
        const followersResponse = await fetchUserFollowerList(props.userData.id);
        setFollowers(followersResponse);
      }
    } catch(error) {
      console.warn("Error: Error while getting followers - ", error);
    }
  };

  const fetchFollowings = async (): Promise<any> => {
    try {
      if (user) {
        const followingResponse = await fetchUserFollowingList(props.userData.id);
        setFollowings(followingResponse);
      }
    } catch (error) {
      console.warn("Error: Error while getting followings - ", error);
    }
  };

  const { totalFollowers, totalPosts, totalFollowing, isFollowing } = userData;

  const teamList = async (): Promise<void> => {
    try {
      const endpoint = `/api/teams?user_id=${props.userData.id}`;
      const headers = await getAuthHeader();
      axios
        .get(endpoint, { headers: headers })
        .then((res) => {
          setTeamData(res.data.result);
        })
        .catch((err) => console.error(err));
    } catch (err) {
      alert(err);
    }
  };

  const followAction = (): void => {
    if (!isFollowing) {
      followUser(userData.id).then(async () => {
        await frontendSupabase.from("notifications").insert({
          type: "FOLLOWING",
          user_id: userData.id,
          sent_by: user?.id,
          message: `${user?.username} started following you.`,
        });
      });
      setUserData((prev) => {
        return {
          ...prev,
          isFollowing: true,
          totalFollowers: totalFollowers + 1,
        };
      });
      // eslint-disable-next-line no-useless-return
      return;
    }
    unFollowUser(userData.id);
    setUserData((prev) => {
      return {
        ...prev,
        isFollowing: false,
        totalFollowers: totalFollowers - 1,
      };
    });
  };
  const handleCloseMenu = (): void => setShowMenu(false);
  const handleToggleMenu = (): void => setShowMenu((pre) => !pre);

  const handleOpenFollowersModal = (): void => {
    setOpenFollowersModal(true);
  };
  const handleCloseFollowersModal = (): void => {
    setOpenFollowersModal(false);
  };

  const handleOpenFollowingModal = (): void => {
    setOpenFollowingModal(true);
  };
  const handleCloseFollowingModal = (): void => {
    setOpenFollowingModal(false);
  };

  async function block(): Promise<void> {
    setUserData((pre) => {
      return {
        ...pre,
        isBlocked: true,
      };
    });
    await blockUser(userData.id);
    handleCloseMenu();
  }
  async function unBlock(): Promise<void> {
    setUserData((pre) => {
      return {
        ...pre,
        isBlocked: false,
      };
    });
    await unBlockUser(userData.id);
    handleCloseMenu();
  }

  const fetchChannel = async (): Promise<any> => {
    router.push(`/chat?user=${userData.id}&name=${userData.username}`);
  };

  useEffect(() => {
    teamList();
    fetchFollowers();
    fetchFollowings();
  }, [props.userData]);

  return (
    <Box className={styles.otherProfileCard}>
      <Box
        className={styles.background}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(64, 64, 64, 0.3), rgba(8, 0, 28, 1)), url(${frontendConfig.storage.publicBucketUrl}/${frontendConfig.storage.publicBucket}/${userData.avatarUrl})`,
        }}
      >
        <Box sx={{ textAlign: "right", position: "relative", display: "none" }}>
          <IconButton sx={{ padding: "10px" }} onClick={handleToggleMenu}>
            <MoreVertIcon />
          </IconButton>
          {showMenu && (
            <List className={styles.optionsContainer}>
              {userData.isBlocked ? (
                <ListItem disablePadding>
                  <Button
                    fullWidth
                    onClick={(): unknown => unBlock()}
                    className={styles.optionsBtn}
                    sx={{ color: "red" }}
                  >
                    Unblock
                  </Button>
                </ListItem>
              ) : (
                <ListItem disablePadding>
                  <Button
                    fullWidth
                    className={styles.optionsBtn}
                    sx={{ color: "red" }}
                    onClick={(): unknown => block()}
                  >
                    <img src="/icons/error.svg" alt="icon" />
                    Block
                  </Button>
                </ListItem>
              )}
            </List>
          )}
        </Box>
        <Box className={styles.profileSection}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              sx={{ width: 120, height: 120, marginBottom: 2 }}
              src={`${frontendConfig.storage.publicBucketUrl}/${frontendConfig.storage.publicBucket}/${userData.avatarUrl}`}
            ></Avatar>
          </Box>
          <Typography variant="h3" fontSize={18} color="#fff">
            @{userData.username}
          </Typography>
        </Box>
        {/* </Box>

      <Box className={styles.bottom}> */}

        <Box className={styles.detailsContainer} sx={{ width: "100%" }}>
          <Grid container p={2}>
            <Grid item md={5} sx={{ textAlign: "left" }}>
              <Typography variant="caption" fontSize={12}>
                Team
              </Typography>
              {teamData.slice(0, 3).map((t, idx) => {
                const teamLogo = t?.teamLogo
                  ? (frontendSupabase.storage
                      .from("public-files")
                      .getPublicUrl(t.teamLogo).publicURL as string)
                  : "/static/images/avatar/3.jpg";
                return (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 1,
                      cursor: "pointer",
                    }}
                    key={idx}
                    onClick={(): any =>
                      router.push(
                        `/team/view/${t.id}/members?user_id=${props.userData.id}`
                      )
                    }
                  >
                    <Avatar
                      sx={{ mr: 1, width: 35, height: 35 }}
                      alt={t.name.toUpperCase()}
                      src={teamLogo}
                    />
                    <Typography
                      variant="h3"
                      fontSize={14}
                      textOverflow="ellipsis"
                    >
                      {t.name}
                    </Typography>
                  </Box>
                );
              })}
              {teamData.length > 3 && (
                <Button
                  variant="text"
                  sx={{
                    mt: 2,
                    p: 0,
                    justifyContent: "flex-start",
                    pl: "2px",
                  }}
                  fullWidth
                  onClick={(): any => setTeamModal(true)}
                >
                  <Avatar sx={{ mr: 1, width: 35, height: 35 }}>
                    <Typography
                      variant="h3"
                      fontSize={12}
                      textOverflow="ellipsis"
                    >
                      {`+ ${teamData.length - 3}`}
                    </Typography>
                  </Avatar>
                  View All
                </Button>
              )}
            </Grid>
            <Grid
              item
              md={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className={styles.verticalDivider} />
            </Grid>
            <Grid item md={5}>
              <Typography variant="caption" fontSize={12}>
                Member since
              </Typography>
              <Typography
                sx={{ textAlign: "left", mt: 1 }}
                variant="h3"
                fontSize={14}
              >
                {moment(userData?.createdAt).format("DD MMM YYYY")}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 3 }} light className={styles.divider} />
          <Grid container>
            <Grid item md={3} sx={{ textAlign: "center" }}>
              <Typography variant="caption" fontSize={14}>
                Followers
              </Typography>
              <Typography
                onClick={handleOpenFollowersModal}
                sx={{ cursor: "pointer" }}
                variant="h3"
                color="#6931F9"
                fontSize={16}
              >
                {totalFollowers || 0}
              </Typography>
            </Grid>
            <Grid
              item
              md={1}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <div className={styles.verticalDivider} />
            </Grid>
            <Grid item md={4} sx={{ textAlign: "center" }}>
              <Typography variant="caption" fontSize={14}>
                Following
              </Typography>
              <Typography
                onClick={handleOpenFollowingModal}
                sx={{ cursor: "pointer" }}
                variant="h3"
                color="#6931F9"
                fontSize={16}
              >
                {totalFollowing || 0}
              </Typography>
            </Grid>
            <Grid
              item
              md={1}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <div className={styles.verticalDivider} />
            </Grid>
            <Grid item md={3} sx={{ textAlign: "center" }}>
              <Typography variant="caption" fontSize={14}>
                Posts
              </Typography>
              <Typography variant="h3" color="#6931F9" fontSize={16}>
                {totalPosts || 0}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box className={styles.btnSection}>
          <Button
            className={styles.bottomBtn}
            startIcon={isFollowing ? <CheckOutlined /> : <PersonAddAltIcon />}
            variant="contained"
            onClick={followAction}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
          <Button
            className={styles.bottomBtn}
            sx={{ borderColor: "#fff", color: "#fff" }}
            variant="outlined"
            onClick={(): any => fetchChannel()}
          >
            Message
          </Button>
        </Box>
      </Box>

      <Dialog
        open={teamModal}
        onClose={(): any => setTeamModal(false)}
        className={"hide-scrollbar"}
      >
        <Box style={{ maxHeight: 500, width: 500, background: "#08001c" }} className={"hide-scrollbar"}>
          <AppBar position="static" className={styles.appBar}>
            <Box sx={{ textAlign: "center", position: "relative" }}>
              <Typography variant="h3" color="white" fontSize={20}>
                Teams
              </Typography>
              <Box sx={{ position: "absolute", right: 0, top: "-6px" }}>
                <IconButton onClick={(): any => setTeamModal(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          </AppBar>
          <Divider />
          <Box mt={1} pl={2} pr={2} maxHeight={500} overflow={"scroll"} className={"hide-scrollbar"}>
            {teamData.map((t, idx) => {
              const teamLogo = t?.teamLogo
                ? (frontendSupabase.storage
                    .from("public-files")
                    .getPublicUrl(t.teamLogo).publicURL as string)
                : "/static/images/avatar/3.jpg";
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                    cursor: "pointer",
                  }}
                  key={idx}
                  onClick={(): any => router.push(`/team/view/${t.id}/members`)}
                >
                  <Avatar
                    sx={{ mr: 3, width: 50, height: 50, border: "2px solid #6932f9 !important" }}
                    alt={t.name.toUpperCase()}
                    src={teamLogo}
                  />
                  
                  <Typography
                    variant="h3"
                    fontSize={16}
                    textOverflow="ellipsis"
                  >
                    {t.name}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Dialog>

      <>
        <FollowersModal
          handleClose={handleCloseFollowersModal}
          userData={userData}
          userList={followers}
          showModal={openFollowersModal}
          listType="followers"
        />

        <FollowersModal
          handleClose={handleCloseFollowingModal}
          userData={userData}
          userList={followings}
          showModal={openFollowingModal}
          listType="following"
        />
      </>
    </Box>
  );
};
export default OtherProfileCard;
