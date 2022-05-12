import {
    Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormLabel from "../../ui-components/formlabel";
import * as yup from "yup";
import { Formik, useFormik } from "formik";

import React from "react";
import GameDropDown from "../../drop-downs/game-drop-down";
import NoobPage from "../../page/noob-page";
import axios from "axios";
import PlatformDropDown from "../../drop-downs/platform-drop-down";
import { getAuthHeader } from "../../../utils/headers";
import { authSession } from "../../../service-clients/auth-service-client";
import { useRouter } from "next/router";

export interface GameData {
  game: string;
  platform: string;
}

interface GameProps {
  data?: GameData;
  onSave?: (data: GameData) => void;
  setPlatformIds?: any;
}

const CreateTeam: React.FC<GameProps> = () => {
const router = useRouter();
const [error,setError] = React.useState(undefined);

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    game: yup.string().required("Game is required"),
    platform: yup.string().required("Platform is required"),
  });

  const formik = useFormik({
    initialValues: {
      game: "",
      name: "",
      platform: "",
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
        console.log(values);
        const data={
            name: values.name,
            game_id: values.game,
            platform_id: values.platform
        }
        const headers = await getAuthHeader();

        axios.post("/api/teams/create",data,{headers:{
            ...headers
        }}).then((res)=>{
            router.push("/team/view/[...slug]",`/team/view/${res.data.id}`,{shallow:true});
            setError(undefined);
        }).catch(err=>{
            console.error(err);
            if(err.response.data.errors && err.response.data.errors[0]){
                setError(err.response.data.errors[0])
            }else{
                setError(undefined);
            }
            
        })
    },
  });
  return (
    <NoobPage
      title="Team"
      metaData={{
        description: "Noob Storm team page",
      }}
    >
      <Box sx={{ paddingX: { xs: "10px", sm: "10px", md: "75px" } }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          rowSpacing={2}
        >
          <Grid item xs={12}>
            <Typography component="h2" variant="h1" color="white">
              Team up and join exciting games with your friends
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              display={"flex"}
              justifyContent="center"
              color={"white"}
              component="h4"
              variant="h5"
            >
              Create a team
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ marginX: { xs: "10px", sm: "10px", md: "20%" }}} padding={3}>
            {
                error?(
                    <Alert severity="error">{error}</Alert>
                ):null
            }
              <FormControl fullWidth variant="standard">
                <FormLabel label="Team Name"></FormLabel>
                <OutlinedInput id="name" name="name" onChange={formik.handleChange} error={formik.touched.name && Boolean(formik.errors.name)} value={formik.values.name}  />
                {formik.touched.name && Boolean(formik.errors.name) ? (
                  <FormHelperText> {formik.errors.name} </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth variant="standard">
                <FormLabel label="Select Game"></FormLabel>
                <GameDropDown
                  label="Choose your Game"
                  id="game"
                  name="game"
                  placeholder="Select Game"
                  error={formik.touched.game && Boolean(formik.errors.game)}
                  onChange={(id, selectedGame): void => {
                    formik.handleChange({
                      target: {
                        name: "game",
                        value: id,
                      },
                    });
                  }}
                  value={formik.values.game}
                />
                {formik.touched.game && Boolean(formik.errors.game) ? (
                  <FormHelperText> {formik.errors.game} </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth variant="standard">
                <FormLabel label="Select Platform"></FormLabel>
                <PlatformDropDown
                  label="Platform"
                  allowAll={true}
                  placeholder="Select Platform"
                  disabled={false}
                  onChange={(id): void => {
                    formik.handleChange({
                      target: {
                        name: "platform",
                        value: id,
                      },
                    });
                  }}
                  value={formik.values.platform}
                  error={
                    formik.touched.platform && Boolean(formik.errors.platform)
                  }
                />
                {formik.touched.platform && Boolean(formik.errors.platform) ? (
                  <FormHelperText> {formik.errors.platform} </FormHelperText>
                ) : null}
              </FormControl>
              <Box display={"flex"} justifyContent="center" width={"100%"}>
    
                <Button onClick={formik.submitForm}> Create Team</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </NoobPage>
  );
};

export default CreateTeam;
