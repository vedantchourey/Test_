/* eslint-disable no-unused-vars */
import React from 'react';
import styled from '@emotion/styled'
import { useRouter } from 'next/router';

const Image1 = "https://yxonklljbckcjbbuljrs.supabase.co/storage/v1/object/public/public-files/Landing_Page/Image1.svg"
const Image2 = "https://yxonklljbckcjbbuljrs.supabase.co/storage/v1/object/public/public-files/Landing_Page/Image2.svg"
const Image3 = "https://yxonklljbckcjbbuljrs.supabase.co/storage/v1/object/public/public-files/Landing_Page/Image3.svg"
const Image4 = "https://yxonklljbckcjbbuljrs.supabase.co/storage/v1/object/public/public-files/Landing_Page/Image4.svg"
const Image5 = "https://yxonklljbckcjbbuljrs.supabase.co/storage/v1/object/public/public-files/Landing_Page/Image5.svg"

const NeedAPlayer: React.FunctionComponent  = () => {

  const router = useRouter();

  const handleButtonClickTeam = () => {
    
    router.push("/teamlist")
   }
    return (
      <div>
        <NeedAPlayerComp>
                <NeedAPlayerInfo>
                    <NeedAPlayerInfoFrame>
                        <NeedAPlayerInfoFrame_Text01>🔥 Need a Player?</NeedAPlayerInfoFrame_Text01>
                        <NeedAPlayerInfoFrame_Text02>It’s never been easier to add a professional gamer onto your team. Scroll through profiles, reach out to your favourites – add them to your roster.

            Whether you’re looking for upcoming talent or the best of the best – you’ll find them on the Free Agency Market.</NeedAPlayerInfoFrame_Text02>
                        <NeedAPlayerInfoFrame_Button onClick={handleButtonClickTeam}>
                        <NeedAPlayerInfoFrame_Button_Text>Scout em out</NeedAPlayerInfoFrame_Button_Text>
                        </NeedAPlayerInfoFrame_Button>
                    </NeedAPlayerInfoFrame>
                    <NeedAPlayerInfoImages>
                        <Image01><StyledImg src={Image1} alt="My Image" /></Image01>
                        <Image02><StyledImg src={Image2} alt="My Image" /></Image02>
                        <Image03><StyledImg src={Image3} alt="My Image" /></Image03>
                        <Image04><StyledImg src={Image4} alt="My Image" /></Image04>
                        <Image05><StyledImg src={Image5} alt="My Image" /></Image05>
                    </NeedAPlayerInfoImages>
                </NeedAPlayerInfo>
        </NeedAPlayerComp>
      </div>
    );
  };
  
  export default NeedAPlayer;
  

  const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  
`;

  const NeedAPlayerComp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 88px 275px;
  gap: 10px;
  
  position: absolute;
  width: 1719.63px;
  height: 601px;
  left: 0px;
  top: 2558px;
  
  background: rgba(9, 37, 150, 0.15);
  `
  // @media screen and (max-width:768px) {
  //   top: 60%;
  //   height:auto;
    
    
  // }
  const NeedAPlayerInfo = styled.div`
  /* Auto layout */
  
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 63px;
  
  width: 1169.63px;
  height: 425px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  
  `
  const NeedAPlayerInfoFrame_Text01 = styled.div`
  
  
  width: 518px;
  height: 59px;
  
  font-family: 'Orbitron';
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 147%;
  /* identical to box height, or 59px */
  
  display: flex;
  align-items: center;
  
  color: #FFFFFF;
  
  `
  const NeedAPlayerInfoFrame_Text02 = styled.div`
  
  width: 524px;
  height: 224px;
  
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 158%;
  /* or 32px */
  
  
  color: rgba(255, 255, 255, 0.8);
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  flex-grow: 0;
  `
  const NeedAPlayerInfoFrame_Button_Text = styled.div`
  
  width: 108px;
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
  const NeedAPlayerInfoFrame_Button = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 19px 35px;
  gap: 10px;
  
  width: 178px;
  height: 55px;
  
  background: linear-gradient(51.06deg, #9358F7 0.87%, #7B78F2 25.96%, #6197EE 49.23%, #45B5E9 74.93%, #10D7E2 97.48%);
  box-shadow: 0px 16.9632px 28.8375px rgba(163, 105, 251, 0.31);
  border-radius: 0px 18px;
  
  /* Inside auto layout */
  
  flex: none;
  order: 2;
  flex-grow: 0;
  transition: transform 0.2s ease-in-out;
&:hover {
  transform: translateY(-5px);
}
  `
  const NeedAPlayerInfoFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 21px;
  
  width: 524px;
  height: 380px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  `
  const NeedAPlayerInfoImages = styled.div`
  width: 582.63px;
  height: 425px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  flex-grow: 0;
  `
  const Image01 = styled.div`
  position: absolute;
  width: 245.37px;
  height: 196.84px;
  left: calc(50% - 245.37px/2 + 283.08px);
  top: calc(50% - 196.84px/2 + 114.08px);
  
  background: url(man-gamer-teaching-his-girlfriend-playing-space-shooter-video-game-rgb-powerful-personal-computer-pro-cyber-woman-with-headset-performing-video-games-streaming-from-home-during-online-tournament.jpg), url(image.png);
  border-radius: 4px;
  `
  const Image02 = styled.div`
  
  position: absolute;
  width: 126px;
  height: 174.47px;
  left: calc(50% - 126px/2 + 516.13px);
  top: calc(50% - 174.47px/2 - 90.59px);
  
  background: url(team-professional-cybersport-gamers-celebrating-success-gaming-club), url(image);
  border-radius: 4px;
  `
  const Image03 = styled.div`
  position: absolute;
  width: 168.63px;
  height: 129.74px;
  left: calc(50% - 168.63px/2 + 500.5px);
  top: calc(50% - 129.74px/2 + 83.88px);
  
  background: url(smart-gamer-challenging-video-game-computer-club), url(image);
  border-radius: 4px;
  `
  const Image04 = styled.div`
  
  position: absolute;
  width: 283.26px;
  height: 209.14px;
  left: calc(50% - 283.26px/2 + 302.03px);
  top: calc(50% - 209.14px/2 - 107.93px);
  
  background: url(image.png), url(image);
  border-radius: 4px;
  `
  const Image05 = styled.div`
  position: absolute;
  width: 144px;
  height: 303.09px;
  left: calc(50% - 144px/2 + 74.18px);
  top: calc(50% - 303.09px/2 - 2.8px);
  
  background: url(image.png), url(image.png);
  border-radius: 4px;
  `
  