import React from "react";
import AccordionAlt from "../../ui-components/accordion";
import CreateBracketForm from "../../ui-components/create-bracket-form";

const Create = ():JSX.Element => {
  return (
    <AccordionAlt title="Create an Eliminate Bracket" subTitle="Single or Double Elimination Schedule">
      <CreateBracketForm />
    </AccordionAlt>
  );
};

export default Create;
