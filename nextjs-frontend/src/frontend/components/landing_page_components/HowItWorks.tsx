/* eslint-disable no-unused-vars */
import React from 'react';
import styled from '@emotion/styled'
import Image from '../../../../public/landing_page/HowItWorks.svg'


const HowItWorks: React.FunctionComponent  = () => {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
        <HowItWorksComp>
            <HowItWorksText>🔥 HOW IT WORKS</HowItWorksText>
            
             <StyledImg src={Image} alt="My Image" />

            
        </HowItWorksComp>
      </div>
    );
  };
  
  export default HowItWorks;
  
  
const HowItWorksComp = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 38px;

position: absolute;
width: 1170px;
height: 627.52px;
left: 275px;
top: 1899px;


`
// @media screen and (max-width:768px) {
//   top: 55%;
//   left: 20%;
  
  
// }

const HowItWorksText = styled.div`
  font-family: 'Orbitron';
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 144%;
  color: #FFFFFF;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -600%);
  
  `;
  // @media screen and (max-width:768px) {
  //   width: 70%;
  //   height:auto;
  //   left: 320px;
  //   align-items: center;

  // }
const StyledImg = styled.img`
    width: 100%;
    height: 100%;
    
    `;
    // @media screen and (max-width:768px) {
    //   width: 40%;
    //   height:50%;
      
    // }