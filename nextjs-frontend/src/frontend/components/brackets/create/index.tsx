import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { TournamentContext } from "../../tournament";
import AccordionAlt from "../../ui-components/accordion";
import EliminateBracket, {
  EliminateBracketData,
  EliminateBracketRef,
} from "./eliminate-bracket";

const Create: React.FC = (): JSX.Element => {
  const { data, setData } = React.useContext(TournamentContext);
  const router = useRouter();
  const ref = React.useRef<EliminateBracketRef>(null);

  const handleBracketSave = (bracketsMetadata: EliminateBracketData): void => {
    setData({ ...data, bracketsMetadata },()=>{
      router.push(`/tournament/[...slug]`, `/tournament/create/streams`, {
        shallow: true,
      });
    });
  };

  const goBack = ():void => {
    router.push(
      `/tournament/[...slug]`,
      `/tournament/create/setup/settings`,
      { shallow: true }
    );
  };

  const submitForm = ():void =>{
    if(ref && ref.current){
      ref.current.getFormik().submitForm();
    }
  }

  return (
    <React.Fragment>
      <AccordionAlt
        title="Create an Eliminate Bracket"
        subTitle="Single or Double Elimination Schedule"
      >
        <EliminateBracket
          onSave={handleBracketSave}
          data={data.bracketsMetadata}
          ref={ref}
        />
      </AccordionAlt>
      <Box display="flex" justifyContent={"space-between"}>
        <Button
          variant="contained"
          onClick={():void => {
            goBack && goBack();
          }}
          startIcon={<img src="/icons/lessthan.svg" />}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={submitForm}
          endIcon={<img src="/icons/greater.svg" />}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default Create;
