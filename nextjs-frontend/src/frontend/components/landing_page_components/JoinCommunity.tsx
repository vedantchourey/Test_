/* eslint-disable no-unused-vars */

import React , {useState } from 'react';
import { Card, CardContent, TextField, Button} from '@material-ui/core';
import styled from '@emotion/styled'

const JoinCommunity: React.FunctionComponent = () => {
const [showForm, setShowForm] = useState(false);
const [email, setEmail] = useState('')

const handleButtonClick = () => {
setShowForm(!showForm);
}

const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
event.preventDefault();

setShowForm(false);
}

return (
<div>
  <JoinCommunityComp>
    <JoinCommunityText>
      <JoinCommunityText01>Join Our Community</JoinCommunityText01>
      <JoinCommunityText02>Whether you’re looking for upcoming talent or the best of the best – you’ll find them on the Free Agency Market.</JoinCommunityText02>
    </JoinCommunityText>
  <JoinCommunityButton onClick={handleButtonClick}>
    <JoinCommunityButtonText>Join Community</JoinCommunityButtonText>
  </JoinCommunityButton>


    {showForm && (
      <form onSubmit={handleFormSubmit}>
        <Card >
          <CardContent>
            <TextField
              id="email"
              label="Email"
              type="email"
              placeholder="Your email"
              variant="outlined"
              fullWidth
              style={{color: "white"}}
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            <TextField
              id="message"
              label="Message"
              placeholder="Your message"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              style={{color: "white"}}
            />
            <Button variant="contained" color="primary" fullWidth type="submit">
    Join Community
  </Button>
          </CardContent>
        </Card>
      </form>
    )}
    </JoinCommunityComp>
</div>
);
};
export default JoinCommunity


const JoinCommunityComp = styled.div`

box-sizing: border-box;

/* Auto layout */

display: flex;
flex-direction: column;
align-items: center;
padding: 61px 151px;
gap: 34px;

position: relative;
width: 1167px;
height: 363px;
left: 276px;
top: 2558.05px;

background: linear-gradient(51.06deg, rgba(147, 88, 247, 0.45) 0.87%, rgba(123, 120, 242, 0.45) 25.96%, rgba(97, 151, 238, 0.45) 49.23%, rgba(69, 181, 233, 0.45) 74.93%, rgba(16, 215, 226, 0.45) 97.48%);
border-radius: 15px 85px;
`
// @media screen and (max-width:768px) {
//   position: absolute;
//   top: 85%;
//   height:7%;
//   width:45%;
//   left:7%;
//   border-radius: 7% 20%;
  
  
// }

  
  const JoinCommunityText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 16px;
  
  width: 865px;
  height: 150px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
 
  `
  const JoinCommunityText01 = styled.div`
  width: 406px;
  height: 52px;
  
  font-family: 'Orbitron';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 144%;
  /* identical to box height, or 52px */
  
  display: flex;
  align-items: center;
  
  color: #FFFFFF;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  `
  // @media screen and (max-width:768px) {
    
  //   height:25%;
  //   width:35%;
  //   font-weight: 100;
  // font-size: 25px;
  // line-height: 54%;
    
    
    
  // }
  const JoinCommunityText02 = styled.div`
  
  
  width: 865px;
  height: 82px;
  
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 23px;
  line-height: 180%;
  /* or 41px */
  
  text-align: center;
  
  color: rgba(255, 255, 255, 0.8);
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  flex-grow: 0;
  `
  // @media screen and (max-width:768px) {
    
  //   height:60%;
  //   width:30%;
  //   font-weight: 50;
  // font-size: 15px;
  // line-height: 90%;
  
    
    
    
  // }
  const JoinCommunityButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px 37px;
  gap: 10px;
  
  width: 209px;
  height: 57px;
  
  background: linear-gradient(51.06deg, #9358F7 0.87%, #7B78F2 25.96%, #6197EE 49.23%, #45B5E9 74.93%, #10D7E2 97.48%);
  border-radius: 0px 18px;
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  flex-grow: 0;
  transition: transform 0.2s ease-in-out;
&:hover {
  transform: translateY(-5px);
}
  
  `
  const JoinCommunityButtonText = styled.div`
  
  width: 135px;
  height: 17px;
  
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 108%;
  /* or 17px */
  
  display: flex;
  align-items: center;
  
  color: #FFFFFF;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  `
  
  
  