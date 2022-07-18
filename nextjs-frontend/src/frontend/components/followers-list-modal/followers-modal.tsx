import { Box, Typography, Avatar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./followers-list-modal.module.css";
import { IOthersProfileResponse } from "../../service-clients/messages/i-profile";
import { getUserProfileByUsername } from "../../service-clients/profile-service-client";
import Image from "../../components/utils/supabase-image";
import config from "../../utils/config/front-end-config";
import { useRouter } from "next/router";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

export default function Followersmodal({ username }: any): JSX.Element {
  const [data, setData] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    (async (): Promise<void> => {
      setData(await getUserProfileByUsername(username));
    })();
  }, []);
  return (
    <Box className={styles.userList}>
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        onClick={() => {
          router.push(`account/${username}`);
        }}
      >
        {data?.avatarUrl ? (
          <Image
            bucket={config.storage.publicBucket}
            filePath={data?.avatarUrl || ""}
            isPublicBucket={true}
            width={50}
            height={50}
            className={styles.profileAvatar}
          />
        ) : (
          <Avatar
            className={styles.profileAvatar}
            style={{ height: "50px", width: "50px" }}
          >
            {username.split("")[0].toUpperCase()}
          </Avatar>
        )}
        <Box sx={{ cursor: "pointer" }}>
          <Typography sx={{ ml: 3 }} variant="h3" color="black" fontSize={16}>
            {username}
          </Typography>
        </Box>
      </Box>
      <Button className={styles.followBtn} variant="contained">
        Follow
      </Button>
    </Box>
  );
}
