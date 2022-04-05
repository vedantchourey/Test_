import React from "react";
import { TournamentContext, TournamentData } from "../../tournament";
import AccordionAlt from "../../ui-components/accordion";
import EliminateBracket, { EliminateBracketData } from "./eliminate-bracket";

export interface CreateProps{
  onSubmit? : (data: TournamentData) => void
}



const Create:React.FC<CreateProps> = ({onSubmit}):JSX.Element => {
  const {data, setData} = React.useContext(TournamentContext);

  const handleBracketSave = (bracket:EliminateBracketData):void =>{
    setData({...data,bracket})
    if(onSubmit){
      onSubmit({...data, bracket})
    }
  }

  return (
    <AccordionAlt title="Create an Eliminate Bracket" subTitle="Single or Double Elimination Schedule">
      <EliminateBracket onSave={handleBracketSave} data={data.bracket} />
    </AccordionAlt>
  );
};

export default Create;
