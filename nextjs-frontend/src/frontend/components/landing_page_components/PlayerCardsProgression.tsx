/* eslint-disable no-unused-vars */
import React from 'react';
import styled from '@emotion/styled'
import PCP1 from '../../../../public/landing_page/PCP1.svg'
import PCP2 from '../../../../public/landing_page/PCP2.svg'
import PCP3 from '../../../../public/landing_page/PCP3.svg'


const bronze2 = "https://yxonklljbckcjbbuljrs.supabase.co/storage/v1/object/public/public-files/Landing_Page/bronze2.svg"
const silver2 = "https://yxonklljbckcjbbuljrs.supabase.co/storage/v1/object/public/public-files/Landing_Page/silver2.svg"
const gold2 = "https://yxonklljbckcjbbuljrs.supabase.co/storage/v1/object/public/public-files/Landing_Page/gold2.svg"
const ruby2 = "https://yxonklljbckcjbbuljrs.supabase.co/storage/v1/object/public/public-files/Landing_Page/ruby2.svg"
const diamond2 = "https://yxonklljbckcjbbuljrs.supabase.co/storage/v1/object/public/public-files/Landing_Page/diamond2.svg"


const PlayerCardsProgression: React.FunctionComponent  = () => {
    return (
      <div>

        <PlayerCardsProgressionComp>
                <PlayerCardsProgressionFrame01>
                    <PlayerCardsProgressionFrame01Frame01>
                        <PlayerCardsProgressionFrame01Frame01Text01>🔥 Player Cards Progression</PlayerCardsProgressionFrame01Frame01Text01>
                        <PlayerCardsProgressionFrame01Frame01Text02>A growth-based community – Noobstorm’s cards show your progress, rating, and standing.
                            Players ratings will be updated using the Elo range from 750 - 2000+
                            Our Elo Ranking system gives every player the chance to evolve, hone their skills, and pursue their dreams in gaming.</PlayerCardsProgressionFrame01Frame01Text02>
                    </PlayerCardsProgressionFrame01Frame01>
                    <PlayerCardsProgressionFrame01Frame02>
                        <PlayerCardsProgressionFrame01Frame02Image01><StyledImg src={PCP1} alt="My Image" /></PlayerCardsProgressionFrame01Frame02Image01>
                        <PlayerCardsProgressionFrame01Frame02Image02><StyledImg src={PCP2} alt="My Image" /></PlayerCardsProgressionFrame01Frame02Image02>
                        <PlayerCardsProgressionFrame01Frame02Image03><StyledImg src={PCP3} alt="My Image" /></PlayerCardsProgressionFrame01Frame02Image03>
                    </PlayerCardsProgressionFrame01Frame02>
                </PlayerCardsProgressionFrame01>
                <PlayerCardsProgressionFrame02>
                    <PlayerCardsProgressionFrame02Image01><StyledImg src={bronze2} alt="My Image" /></PlayerCardsProgressionFrame02Image01>
                    <PlayerCardsProgressionFrame02Image02><StyledImg src={silver2} alt="My Image" /></PlayerCardsProgressionFrame02Image02>
                    <PlayerCardsProgressionFrame02Image03><StyledImg src={gold2} alt="My Image" /></PlayerCardsProgressionFrame02Image03>
                    <PlayerCardsProgressionFrame02Image04><StyledImg src={ruby2} alt="My Image" /></PlayerCardsProgressionFrame02Image04>
                    <PlayerCardsProgressionFrame02Image05><StyledImg src={diamond2} alt="My Image" /></PlayerCardsProgressionFrame02Image05>
                </PlayerCardsProgressionFrame02>
            </PlayerCardsProgressionComp>
                
        
      </div>
    );
  };
  
  export default PlayerCardsProgression;
  

  const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  
`;

  const PlayerCardsProgressionComp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 35px;
  
  position: absolute;
  width: 1169px;
  height: 802.33px;
  left: 275px;
  top: 3258px;
  `
  // @media screen and (max-width:768px) {
  //   top: 70%;
  //   height:auto;
    
  // }
  const PlayerCardsProgressionFrame01 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 39px;
  
  width: 1164px;
  height: 291px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  `
  const PlayerCardsProgressionFrame01Frame01 = styled.div`
  /* Auto layout */
  
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 21px;
  
  width: 1164px;
  height: 188px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  
  `
  const PlayerCardsProgressionFrame01Frame01Text01 = styled.div`
  width: 832px;
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
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  `
  const PlayerCardsProgressionFrame01Frame01Text02 = styled.div`
  
  width: 1164px;
  height: 108px;
  
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 180%;
  /* or 36px */
  
  text-align: center;
  
  color: rgba(255, 255, 255, 0.8);
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  flex-grow: 0;
  `
  const PlayerCardsProgressionFrame01Frame02 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 17px 0px;
  gap: 73px;
  
  width: 1164px;
  height: 64px;
  
  background: rgba(128, 114, 244, 0.26);
  border-radius: 11px;
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  `
  const PlayerCardsProgressionFrame01Frame02Image01 = styled.div`
  /* Auto layout */
  
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 11px;
  
  width: 237px;
  height: 30px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  `
  const PlayerCardsProgressionFrame01Frame02Image02 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 11px;
  
  width: 262px;
  height: 30px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  flex-grow: 0;
  `
  const PlayerCardsProgressionFrame01Frame02Image03 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 11px;
  
  width: 106px;
  height: 30px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 2;
  flex-grow: 0;
  `
  const PlayerCardsProgressionFrame02 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  
  width: 1169px;
  height: 476.33px;
  
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  flex-grow: 0;
  `
  const PlayerCardsProgressionFrame02Image01 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 13.02px;
  
  width: 191.29px;
  height: 326.39px;
  
  filter: drop-shadow(-49.9482px 26.5682px 37.1955px rgba(0, 0, 0, 0.25));
  
  /* Inside auto layout */
  
  flex: none;
  order: 0;
  flex-grow: 0;
  `
  const PlayerCardsProgressionFrame02Image02 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 14.53px;
  
  width: 212.55px;
  height: 364.64px;
  
  filter: drop-shadow(-49.9482px 26.5682px 37.1955px rgba(0, 0, 0, 0.25));
  
  /* Inside auto layout */
  
  flex: none;
  order: 1;
  flex-grow: 0;
  `
  const PlayerCardsProgressionFrame02Image03 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 16.05px;
  
  width: 233.8px;
  height: 400.79px;
  
  filter: drop-shadow(-49.9482px 26.5682px 37.1955px rgba(0, 0, 0, 0.25));
  
  /* Inside auto layout */
  
  flex: none;
  order: 2;
  flex-grow: 0;
  `
  const PlayerCardsProgressionFrame02Image04 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 17.37px;
  
  width: 255.05px;
  height: 435.19px;
  
  filter: drop-shadow(-49.9482px 26.5682px 37.1955px rgba(0, 0, 0, 0.25));
  
  /* Inside auto layout */
  
  flex: none;
  order: 3;
  flex-grow: 0;
  `
  const PlayerCardsProgressionFrame02Image05 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 18.99px;
  
  width: 276.31px;
  height: 476.33px;
  
  filter: drop-shadow(-49.9482px 26.5682px 37.1955px rgba(0, 0, 0, 0.25));
  
  /* Inside auto layout */
  
  flex: none;
  order: 4;
  flex-grow: 0;
  
  `
  











