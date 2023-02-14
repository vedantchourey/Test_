/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

//import AboutBlock from src/frontend/components/AboutBlock
//import HowItWorks from src/frontend/components/HowItWorks
//  ../../src/frontend/components/not-found/not-found

import React from "react";
import styled from '@emotion/styled';
import AboutBlock from "../../src/frontend/components/landing_page_components/About";
import HowItWorks from "../../src/frontend/components/landing_page_components/HowItWorks";
import Footer from "../../src/frontend/components/landing_page_components/Footer";
import JoinCommunity from "../../src/frontend/components/landing_page_components/JoinCommunity"
import PlayerCardsProgression from "../../src/frontend/components/landing_page_components/PlayerCardsProgression"
import NeedAPlayer from "../../src/frontend/components/landing_page_components/NeedAPlayer"
import Firstsection from "../../src/frontend/components/landing_page_components/FirstSection"

import BGEffects from "../../public/landing_page/BGEffects.svg"
import Head from "next/head";

import Aboutleft from "../../public/landing_page/Aboutleft.svg"
import Aboutright from "../../public/landing_page/Aboutright.svg"

const Aboutus1 = "https://yxonklljbckcjbbuljrs.supabase.co/storage/v1/object/public/public-files/Landing_Page/Aboutus1.svg"
const Aboutus2 = "https://yxonklljbckcjbbuljrs.supabase.co/storage/v1/object/public/public-files/Landing_Page/Aboutus2.svg"
const Aboutus3 = "https://yxonklljbckcjbbuljrs.supabase.co/storage/v1/object/public/public-files/Landing_Page/Aboutus3.svg"


const abouts = [{AboutTextFrame1_Tournaments: "Tournaments",
 AboutTextFrame1_Content: "You’re the heart of Noobstorm. This is why we’re giving the gaming community everything they need to succeed.",
 AboutTextFrame2_Button: "View Tournaments",
About_image: Aboutus1,
AboutRoute: "/tournaments-list",
},
 {
    AboutTextFrame1_Tournaments: "Games & Brands",
  AboutTextFrame1_Content: "We make it easy for gaming companies to take part in the experience. Find skilled players who have mastered your game.",
  AboutTextFrame2_Button: "Contact us",
  About_image:Aboutus2,
  AboutRoute: "/disputes"
},
  {
    AboutTextFrame1_Tournaments: "Free Agency Market", 
  AboutTextFrame1_Content: "An easy way to show off your gaming skills to recruiters – or find the perfect player for your team.Our market makes it simpler than ever to show your skills off to the world. Create your profile and list your achievements.",
  AboutTextFrame2_Button: "Enter Free Agency",
  About_image: Aboutus3,
  AboutRoute: "/free-agency-market/view/members"
}
]


const FristSection = styled.div`
display: flex;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const SecondSection = styled.div`
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: center;
padding: 23px 100px 88px;
gap: 10px;
margin-top:150px;
isolation: isolate;
width: 100%;

@media (max-width: 768px) {
padding: 23px 20px 88px;
flex-direction: column;
margin-top: 650px;
}
`

const About = styled.div`
display: flex;
  flex-wrap: wrap;
  height: 611px;
  margin: 0 auto;
  @media (max-width: 768px) {
    flex-direction: column;
  }

`

const AboutTitle = styled.div`
width: 100%;
font-family: 'Orbitron';
font-style: normal;
font-weight: 600;
font-size: 40px;
line-height: 144%;
display: inline-block;
align-items: center;
color: #FFFFFF;
margin-right: 10px;
@media (max-width: 768px) {
  font-size: 30px;
}
`

const Arrows = styled.div`
display: flex;
flex-wrap: wrap;
align-items: flex-start;
width: 100%;
@media (max-width: 768px) {
  flex-direction: column;
}


/* Inside auto layout */



`

const Arrows1 = styled.div`
width: 55px;
height: 55px;
@media (max-width: 768px) {
  width: 100%;
}
transition: transform 0.2s ease-in-out;
&:hover {
  transform: translateY(-5px);
  cursor: pointer;
  
}


/* Inside auto layout */


`
const Arrows2 = styled.div`

width: 55px;
  height: 55px;
  @media (max-width: 768px) {
    width: 100%;
  }
  transition: transform 0.2s ease-in-out;
&:hover {
  transform: translateY(-5px);
  cursor: pointer;
  
}

`

const ThridSection = styled.div`
display: flex;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 23px 20px 88px;
    margin-top: 900px;
  }
`

const Background = styled.div`
  position: absolute;
  width: 120%;
  height: 750%;
  
  overflow-x: hidden;
  background-image: url(${BGEffects});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;




const Landing_page: React.FC<void> = () => {
  return (
    <>
    <Head>
      {/* This ways to add css on global website use css @import property and you also paste Link tag also */}
      <style>
       @import url("https://fonts.googleapis.com/css2?family=Orbitron&display=swap")
      </style>
</Head>
    <Background>
      
      <FristSection>
          <Firstsection/>
      </FristSection>

    
       <SecondSection>
          <AboutTitle>🔥 About us</AboutTitle>
          
          <Arrows>
            <Arrows1>
              <StyledImg src={Aboutleft} alt="My Image" />
            </Arrows1>
            <Arrows2>
              <StyledImg src={Aboutright} alt="My Image" />
            </Arrows2>
          </Arrows>
        <About>
          <AboutBlock abouts={abouts} />
        </About>
      </SecondSection>
     
    

    <ThridSection>
      <HowItWorks/>
      
    </ThridSection>
    <FourthSection>
      <NeedAPlayer/>

    </FourthSection>


    <FifthSection>
      <PlayerCardsProgression/>
      
    </FifthSection>
    
    <SixthSection>
      <JoinCommunity/>
    </SixthSection> 

      <Last>
        <Footer/>
      </Last>
      </Background>
      </>
  );
};

export default Landing_page;



const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  display: flex;
  
`


const FourthSection = styled.div`
display: flex;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const FifthSection = styled.div`
display: flex;
flex-wrap: wrap;
@media (max-width: 768px) {
  flex-direction: column;
}
`














const SixthSection = styled.div`
display: flex;
flex-wrap: wrap;
@media (max-width: 768px) {
  positon
  flex-direction: column;
  top: 90%;
}

`




const Last = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 0px;
gap: 46px;

position: absolute;
width: 1000.26px;
height: 589.22px;
left: 300px;
top: 4637px;
@media (max-width: 768px) {
  padding: 0px 20px;
  gap: 20px;
  
  top: 92%;
  height:auto;
  

}


`
