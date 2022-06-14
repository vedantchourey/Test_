import { useRouter } from "next/router";
import React from "react";
import { TournamentContext } from "../tournament";
import PublishTournament, { PublishTournamentData } from "./publish-tournament";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

const Publish: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { data, setData, id, type } = React.useContext(TournamentContext);
  const [isCreated, setCreated] = React.useState(false);

  const handleSave = (newData: PublishTournamentData): void => {
    setData({ ...data, publishData: newData }, undefined, type === "new").then(
      (res) => {
        if (res) {
          setCreated(true);
        }
      }
    );
  };

  const goBack = (): void => {
    if (type === "new") {
      router.push(
        `/tournament/new/[...slug]`,
        `/tournament/new/create/streams`,
        { shallow: true }
      );
    } else {
      router.push(
        `/tournament/update/[id]/[...slug]`,
        `/tournament/update/${id}/create/streams`,
        { shallow: true }
      );
    }
  };

  const handleClose = (): void => {
    setCreated(false);
    if (type === "new") {
      router.push(
        `/tournament/new/[...slug]`,
        `/tournament/new/create/setup/basic`,
        { shallow: true }
      );
    } else {
      router.push(
        `/tournament/update/[id]/[...slug]`,
        `/tournament/update/${id}/create/setup/basic`,
        { shallow: true }
      );
    }
  };

  return (
    <React.Fragment>
      <PublishTournament
        tournamentId={data.id}
        data={data.publishData}
        onSave={handleSave}
        onBack={goBack}
      />
      <Dialog open={isCreated} onClose={handleClose}>
        <DialogTitle>Successfully saved!</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Publish;
