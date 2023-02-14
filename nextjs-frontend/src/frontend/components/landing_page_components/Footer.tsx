/* eslint-disable no-unused-vars */

import React from 'react';
import styled from '@emotion/styled'
import FooterLogo from "../../../../public/landing_page/FooterLogo.svg"
import Footer18 from "../../../../public/landing_page/Footer18.svg"
import Footer18Text from "../../../../public/landing_page/Footer18Text.svg"
import Linkedin from "../../../../public/landing_page/mdi_linkedin.svg"
import facebook from "../../../../public/landing_page/ri_youtube-fill.svg"
import Youtube from "../../../../public/landing_page/ri_youtube-fill2.svg"
import twitter from "../../../../public/landing_page/ri_youtube-fill1.svg"

import { useRouter } from 'next/router';



const Footer: React.FunctionComponent   = () => {

  const router = useRouter();

  const handleButtonClickSignUp = () => {
    
    router.push("/register")
   }
  
   const handleButtonClickaboutus = () => {
    
    router.push("/about-us")
   }
  
   const handleButtonClickhowitworks= () => {
    
    router.push("/how-it-works")
   }

   const handleButtonClicktermsofuse = () => {
    
    router.push("/terms-of-use")
   }

   const handleButtonClickprivacypolicy = () => {
    
    router.push("/privacy-policy")
   }

    return (
      <div>
        <FooterWrapper>
       <Row1>
        <Logoinput>
          <Logo><StyledImg src={FooterLogo} alt="My Image" /></Logo>
          <CTA>
            <CTAText>Ready to get started?</CTAText>
            <CTAButton  onClick={handleButtonClickSignUp} >
              <CTAButtonText>Get Started</CTAButtonText>
            </CTAButton>
          </CTA>
        </Logoinput>
        
        <Divider></Divider>
      </Row1>
      <FooterFrame>
        <FooterFrameNewsLetter>
          <FooterFrameNewsLetterText>Subscribe to our newsletter</FooterFrameNewsLetterText>
          <FooterFrameNewsLetterForm>
          <form>
              <FooterFrameNewsLetterFormFrame>
                <FooterFrameNewsLetterFormFrameText>
                    <Inputemail type="email" placeholder="Enter your email address">
                      
                    </Inputemail>
                  <FooterFrameNewsLetterFormFrameReactangle>
                  </FooterFrameNewsLetterFormFrameReactangle>
                </FooterFrameNewsLetterFormFrameText>
                <Button> &gt; </Button>
              </FooterFrameNewsLetterFormFrame>
          </form>
          </FooterFrameNewsLetterForm>
        </FooterFrameNewsLetter>
        <FooterFrameFrame>
          <FooterFrameFrameAbout01>
            <FooterFrameFrameAboutText01 onClick={handleButtonClickaboutus} >About</FooterFrameFrameAboutText01>

            <FooterFrameFrameAboutText02 onClick={handleButtonClickhowitworks} >How it works</FooterFrameFrameAboutText02>
          </FooterFrameFrameAbout01>
          <FooterFrameFrameAbout02>
            <FooterFrameFrameAbout02Text01 onClick={handleButtonClicktermsofuse} >Terms of Service</FooterFrameFrameAbout02Text01>
            <FooterFrameFrameAbout02Text02 onClick={handleButtonClickprivacypolicy} >Privacy Policy</FooterFrameFrameAbout02Text02>
          </FooterFrameFrameAbout02>
        </FooterFrameFrame>
      </FooterFrame>
      <FooterRow3>
        <FooterRow3Text>Copyright © 2022. All Rights Reserved By NOOBSTORM</FooterRow3Text>
        <FooterRow3Socials>
          <FooterRow3SocialsLinkedin><StyledImg src={Linkedin} alt="My Image" /></FooterRow3SocialsLinkedin>
          <FooterRow3SocialsYoutube><StyledImg src={twitter} alt="My Image" /></FooterRow3SocialsYoutube>
          <FooterRow3SocialsTwitter><StyledImg src={Youtube} alt="My Image" /></FooterRow3SocialsTwitter>
          <FooterRow3SocialsFacebook><StyledImg src={facebook} alt="My Image" /></FooterRow3SocialsFacebook>
        </FooterRow3Socials>
      </FooterRow3>
      <FooterText>
        <FooterTextTerms>EA Sports and the EA Sports logo are trademarks of Electronic Arts, Inc. 
          All rights reserved.
           Electronic Arts, Inc is not affiliated with noobstorm.gg.
            2K Games is a registered trademark of Take-Two Interactive Software, Inc. 
            All rights reserved. Take-Two Interactive Software,
             Inc is not affiliated with noobstorm.gg.
              Xbox and Xbox One are registered trademarks of Microsoft Corporation.
               All rights reserved. Microsoft Corporation is not affiliated with noobstorm.gg. 
               Playstation and Playstation 5 are registered trademarks of Sony Computer Entertainment.
                All rights reserved. Sony Computer Entertainment is not affiliated with noobstorm.gg.
                 Wii is a registered trademark of Nintendo of America Inc. All rights reserved.
                  Nintendo of America Inc. is not affiliated with noobstorm.gg.
                   All other trademarks are the property of their respective owners</FooterTextTerms>
        <FooterTextIcon>
          <FooterTextIcon01><StyledImg src={Footer18} alt="My Image" /></FooterTextIcon01>
          <FooterTextIcon02><StyledImg src={Footer18Text} alt="My Image" /></FooterTextIcon02>
        </FooterTextIcon>
      </FooterText>
      </FooterWrapper>
      </div>
    );
  };
  
  export default Footer;


  const FooterWrapper = styled.div`
  media (max-width: 768px) {
    
  }`

  const Button = styled.div`
  background: linear-gradient(51.06deg, #9358F7 0.87%, #7B78F2 25.96%, #6197EE 49.23%, #45B5E9 74.93%, #10D7E2 97.48%);
  border-radius: 2px ;
  width: 31.26px;
  height: 36px;
  color:white;
  text-align: center;
  transition: transform 0.2s ease-in-out;
&:hover {
  transform: translateY(-5px);
  cursor: pointer;
}
  `
  const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  
`;

  const Row1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 36px;
  
  width: 1171.26px;
  height: 91px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  `
//   @media screen and (max-width:768px) {
//   top: 90%;
//   height:auto;
  
// }
  const Logoinput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 514px;
  
  width: 1171.26px;
  height: 54px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  `
  const Logo = styled.div`
  
  width: 194.47px;
  height: 46px;
  
  background: url();
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  `
//   @media screen and (max-width:768px) {
//   display: flex;
//   position: relative;
//   height:40%;
//   width:40%;
//   margin-left: -30%;
//   margin-top: 5%;
// }
  const CTA = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 47px;
  
  width: 462.79px;
  height: 54px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  flex-grow: 0;
  
  `
  const CTAText = styled.div`
  
  width: 231.79px;
  height: 33px;
  
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 33px;
  /* identical to box height */
  
  letter-spacing: -0.3px;
  
  color: #FFFFFF;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  `
  // @media screen and (max-width:768px) {
  //   display: flex;
  //   position: relative;
  //   height:40%;
  //   width:40%;
  //   margin-left: -135%;
  //   margin-top: 7%;
  //   font-style: normal;
  // font-weight: 40;
  // font-size: 15px;
  // line-height: 30px;
  // }
  const CTAButtonText = styled.div`
  width: 94px;
  height: 26px;
  
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  /* identical to box height */
  
  letter-spacing: -0.231818px;
  
  color: #FFFFFF;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  
  `
  // @media screen and (max-width:768px) {
  //   display: flex;
  //   position: relative;
  //   font-weight: 50;
  //   font-size: 17px;
  //   line-height: 20px;
   
  // }
  const CTAButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 14px 45px;
  gap: 10px;
  
  width: 184px;
  height: 54px;
  
  background: linear-gradient(51.06deg, #9358F7 0.87%, #7B78F2 25.96%, #6197EE 49.23%, #45B5E9 74.93%, #10D7E2 97.48%);
  border-radius: 0px 18px;
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  flex-grow: 0;
  transition: transform 0.2s ease-in-out;
&:hover {
  transform: translateY(-5px);
  cursor: pointer;
}
`
// @media screen and (max-width:768px) {
//   display: flex;
//   position: relative;
//   height:70%;
//   width:30%;
//   margin-top: 5%;
//   margin-left: -20%;
//   font-weight: 50;
//   align-items: flex-start;
 
// }
  const Divider = styled.div`
  /* Divider */
  
  
  width: 1165.93px;
  height: 1px;
  
  background: #649DFC;
  mix-blend-mode: normal;
  opacity: 0.3;
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  flex-grow: 0;
  `
//   @media screen and (max-width:768px) {
//   display: flex;
//   position: relative;
//   height:1px;
//   width:40%;
//   margin-left: -10%;
//   margin-bottom: 5%;
// }
  
  const FooterFrame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  gap: 698px;
  
  width: 1170px;
  height: 114px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  flex-grow: 0;
  //create a media query for mobile
  
  
  `
//   @media screen and (max-width:768px) {
//   top: 90%;
//   height:auto;
//   width:70%;
//   flex-direction:row;
//   gap: 0px;
//   justify-content: center;
//   align-items: center;
//   margin-left: 5%;
// }
  
  const FooterFrameNewsLetter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 30px;
  
  width: 302.95px;
  height: 114px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  `
//   @media screen and (max-width:768px) {
//   display: flex;
//   position: relative;
//   height:auto;
//   width:50%;
//   flex-direction:column;
//   gap: 2px;
//   margin-left: -45%;
// }
  
  const FooterFrameNewsLetterText = styled.div`
  width: 302.95px;
  height: 33px;
  margin-top:15px;
  
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 33px;
  /* identical to box height */
  
  letter-spacing: -0.3px;
  
  color: #FFFFFF;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  `
  
  const FooterFrameNewsLetterForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2 px;
  
  width: 302.95px;
  height: 51px;
  
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  `
  
  const FooterFrameNewsLetterFormFrame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  gap: 123px;
  
  
  width: 302.95px;
  height: 50px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  `
  
  const FooterFrameNewsLetterFormFrameText = styled.div`
  width: 104px;
  height: 23px;
  
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  /* identical to box height */
  
  letter-spacing: -0.204545px;
  
  color: #FFFFFF;
  
  mix-blend-mode: normal;
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;

  `
  
  const FooterFrameNewsLetterFormFrameSubmit = styled.div`
  
  width: 46.24px;
  height: 50px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  flex-grow: 0;
  `
  
  const FooterFrameNewsLetterFormFrameSubmitFrame = styled.div`
  
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 15px 14px;
  gap: 10px;
  
  position: absolute;
  width: 46.24px;
  height: 50px;
  left: 256.71px;
  top: 0px;
  
  background: linear-gradient(51.06deg, #9358F7 0.87%, #7B78F2 25.96%, #6197EE 49.23%, #45B5E9 74.93%, #10D7E2 97.48%), linear-gradient(203.5deg, #FF1CF7 24.79%, #00F0FF 118.2%), #FFD2DD;
  border-radius: 8px 8px 0px 0px;
  `
  
  
  const FooterFrameNewsLetterFormFrameSubmitFrame_ic = styled.div`
  
  
  
  width: 18.24px;
  height: 20px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  `
  
  const FooterFrameNewsLetterFormFrameSubmitFrame_ic_Path = styled.div`
  position: absolute;
  left: 30.28%;
  right: 30.28%;
  top: 30%;
  bottom: 30%;
  
  `
  
  const FooterFrameNewsLetterFormFrameSubmitFrame_ic_Path_icon = styled.div`
  
  position: absolute;
  left: 44.39%;
  right: 43.43%;
  top: 40%;
  bottom: 40%;
  
  background: #FFFFFF;
  `

  const Inputemail = styled.input`
  background-color: transparent;
  border: none;
  color: white;
  width:220px
  `
  
  const FooterFrameNewsLetterFormFrameReactangle = styled.div`
  width: 260.95px;
  height: 1px;
  
  background: #FFFFFF;
  mix-blend-mode: normal;
  opacity: 0.3;
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  `
  
  const FooterFrameFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;
  gap: 40px;
  
  width: 250px;
  height: 72px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  flex-grow: 0;
  `
//   @media screen and (max-width:768px) {
//   display: flex;
//   position: relative;
//   height:auto;
//   width:50%;
//   flex-direction:column;
//   gap: 2px;
//   padding: 0px;
//   margin-left: -10%;
  
  
// }
  const FooterFrameFrameAbout01 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;
  
  width: 105px;
  height: 72px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  `
  const FooterFrameFrameAboutText01 = styled.div`
  width: 51px;
  height: 26px;
  
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 26px;
  /* identical to box height */
  
  
  color: #47B5FD;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  &:hover{
    cursor: pointer;
  }
  `
  const FooterFrameFrameAboutText02 = styled.div`
  width: 105px;
  height: 26px;
  
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 26px;
  /* identical to box height */
  
  
  color: #FFFFFF;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  flex-grow: 0;
  &:hover{
    cursor: pointer;
  }
  `
  const FooterFrameFrameAbout02 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;
  
  width: 140px;
  height: 72px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  flex-grow: 0;
  
  `
  const FooterFrameFrameAbout02Text01 = styled.div`
  width: 140px;
  height: 26px;
  
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 26px;
  /* identical to box height */
  &:hover{
    cursor: pointer;
  }
  
  
  color: #FFFFFF;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  `
  const FooterFrameFrameAbout02Text02 = styled.div`
  
  width: 115px;
  height: 26px;
  
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 26px;
  /* identical to box height */
  
  
  color: #FFFFFF;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  flex-grow: 0
  &:hover{
    cursor: pointer;
  }
  `
  
  const FooterRow3 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 458px;
  margin-top:50px;
  
  width: 1162.3px;
  height: 24px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 2;
  flex-grow: 0;
  `
  const FooterRow3Text = styled.div`
  width: 387px;
  height: 23px;
  
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  /* identical to box height */
  
  letter-spacing: -0.204545px;
  
  color: #FFFFFF;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  `
  const FooterRow3Socials = styled.div`
  /* Auto layout */
  
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 6px;
  margin-top:10px;
  width: 114px;
  height: 24px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  flex-grow: 0;
  `
  const FooterRow3SocialsLinkedin = styled.div`
  width: 24px;
  height: 24px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  `
  const FooterRow3SocialsYoutube = styled.div`
  width: 24px;
  height: 24px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  flex-grow: 0;
  `
  const FooterRow3SocialsTwitter = styled.div`
  width: 24px;
  height: 24px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 2;
  flex-grow: 0;
  `
  const FooterRow3SocialsFacebook = styled.div`
  width: 24px;
  height: 24px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 3;
  flex-grow: 0;
  `
  const FooterText = styled.div`
  /* Auto layout */
  
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 15px;
  
  width: 1159.57px;
  height: 222.22px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 3;
  flex-grow: 0;
  
  `
//   @media screen and (max-width:768px) {
//  display: flex;
//  position: relative;
//  height:auto;
//  width:50%;
//  flex-direction:column;
//  gap: 2px;
 
//  align-items: center;
//  margin-left: 10%;
// }
  const FooterTextTerms = styled.div`
  width: 1159.57px;
  height: 162px;
  
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 179.7%;
  /* or 27px */
  
  text-align: center;
  letter-spacing: -0.204545px;
  
  color: #A4A4A4;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  `
//   @media screen and (max-width:768px) {
  
//   position: fixed;
//   height:auto;
//   width:60%;
//   flex-direction:column;
//   gap: 2px;
  
//   margin-left: 0%;
// }
  const FooterTextIcon = styled.div`
  /* Auto layout */
  
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 1.81px;
  
  width: 123px;
  height: 45.22px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  flex-grow: 0;
  
  `
  // @media screen and (max-width:768px) {
  // margin-left: -60%;
  const FooterTextIcon01 = styled.div`
  width: 39.79px;
  height: 45.22px;
  
  background: url(image.png);
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  `
  const FooterTextIcon02 = styled.div`
  width: 39.79px;
  height: 45.22px;
  
  background: url(image.png);
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  `
  
  