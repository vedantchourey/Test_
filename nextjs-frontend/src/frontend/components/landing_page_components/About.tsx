/* eslint-disable no-unused-vars */





import React from 'react';
import styled from '@emotion/styled'
import { useRouter } from 'next/router';

interface AboutProps {
  AboutRoute: string,
  About_image: string,
  AboutTextFrame1_Tournaments: string,
  AboutTextFrame1_Content: string,
  AboutTextFrame2_Button:string
  }

  interface AboutBlockProps {
    abouts: AboutProps[]
    }

  const AboutBlock: React.FunctionComponent<AboutBlockProps> = ({
      abouts,
    }) => {
      const router = useRouter();
    
      function handleButtonClick(about: AboutProps) {
      router.push(about.AboutRoute);
    }
    
      return (
        <AboutWrapper>
          {abouts.map((about, index) => {
            return (
              <AboutFrame key={index}>
                <RectangleWrapper>
                  <RectangleImg src={about.About_image} alt="My Image" />
                </RectangleWrapper>
                <AboutText>
                  <AboutTextFrame1>
                    <AboutTextFrame1_Tournaments>{about.AboutTextFrame1_Tournaments}</AboutTextFrame1_Tournaments>
                    <AboutTextFrame1_Content>{about.AboutTextFrame1_Content}</AboutTextFrame1_Content>
                  </AboutTextFrame1>
                  <AboutTextFrame2>
                    <AboutTextFrame2_Button onClick={(): void => handleButtonClick(about)}>{about.AboutTextFrame2_Button}</AboutTextFrame2_Button>
                  </AboutTextFrame2>
                </AboutText>
              </AboutFrame>
            );
          })}
        </AboutWrapper>
      );
    };
    
export default AboutBlock;
const AboutWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 16px;
  margin-left : -200px;
  `;
  // @media only screen and (max-width: 786px) {
  //   display: flex;
  //   flex-direction: row; 
  //   align-items: center; 
  //   width: 80%; 
  //   height: 90%; 
  //   left: 10%; 
  //   top: 6%; 
  // }
  
const RectangleWrapper = styled.div` 
display: flex; 
align-items: flex-start;
margin-bottom: 27px;

`
const RectangleImg = styled.img `
width: 130%; 
height: 100%; 

`

const StyledImg = styled.img`
    width: 50%;
    height: 50%;
    
    
  `;

const AboutFrame = styled.div`

box-sizing: border-box;
margin: 16px; 


display: inline-block;
flex-direction: column;
align-items: flex-start;
padding: 25px 24px 30px;
gap: 27px;

width: 376px;
height: 611px;

background: linear-gradient(204.09deg, rgba(255, 255, 255, 0.1375) 1.8%, rgba(255, 255, 255, 0.0375) 98.93%);
backdrop-filter: blur(20px);


border-radius: 18px;



flex: none;
order: ${props => (props.id)};
align-self: stretch;
flex-grow: 0;

`


const AboutText = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: flex-start;
padding: 0px;
gap: 19px;

width: 328px;
height: 236px;




flex: none;
order: 1;
flex-grow: 1;
`

const AboutTextFrame1 = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 328px;
height: 108px;

flex: none;
order: 0;
flex-grow: 0;
`
const AboutTextFrame2 = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 12px 40px;
gap: 10px;

width: 222px;
height: 40px;

background: linear-gradient(51.06deg, #9358F7 0.87%, #7B78F2 25.96%, #6197EE 49.23%, #45B5E9 74.93%, #10D7E2 97.48%);
box-shadow: 0px 16.9632px 28.8375px rgba(163, 105, 251, 0.31);
border-radius: 0px 18px;

transition: transform 0.2s ease-in-out;
&:hover {
  transform: translateY(-5px);
  cursor: pointer;
}

flex: none;
order: 1;
flex-grow: 0;
`
const AboutTextFrame1_Tournaments = styled.div`
width: 172px;
height: 33px;
white-space: nowrap;
overflow: hidden;
font-family: 'Poppins';
font-style: normal;
font-weight: 600;
font-size: 25px;
line-height: 32px;
/* or 128% */

display: flex;
align-items: center;

color: #FFFFFF;




flex: none;
order: 0;
flex-grow: 0;
`
const AboutTextFrame1_Content = styled.div`
width: 328px;
height: 69px;

font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 155%;
/* or 23px */


color: #C6C6C6;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
`
const AboutTextFrame2_Button = styled.div`

width: 142px;
height: 16px;

font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 108%;
/* or 16px */

display: flex;
align-items: center;

color: #FFFFFF;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;

`