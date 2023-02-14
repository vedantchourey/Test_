/* eslint-disable no-unused-vars */

import React from 'react';
import styled from '@emotion/styled'
import { Grid} from "@material-ui/core";
import Logo from "../../../../public/landing_page/FS_LOGO_NOOBSTROM1.svg"
import Head from "next/head";




import { useRouter } from 'next/router';


const CDNURL = "https://yxonklljbckcjbbuljrs.supabase.co/storage/v1/object/public/public-files/Landing_Page/NoobStorm1.mp4?t=2023-01-19T06%3A01%3A35.928Z"



const Fristsection: React.FunctionComponent = () => {

  


  
  const router = useRouter();

  const handleButtonClickHome = () => {
    
   router.push("/home")
  }
  const handleButtonClickTournaments = () => {
    
   router.push("/tournaments-list")
  }
  const handleButtonClickFreeAgency = () => {

   router.push("/leaderboard")
  }
  const handleButtonClickBlog = () => {
    
   router.push("/blog")
  }
  const handleButtonClickSignIn = () => {
    
   router.push("")
  }
  
  const handleButtonClickSignUp = () => {
    
   router.push("/register")
  }

  return (

    <>
    <Head>
      {/* This ways to add css on global website use css @import property and you also paste Link tag also */}
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron&display=swap');
      </style>
    </Head>
      <div>

        <TopBox>
            <Grid container>
                <NoobBox>
                <WhiteTextGrid item >
                <NoobLogo>
                    <StyledImg src={Logo} alt="My Image" />
                </NoobLogo>   
                </WhiteTextGrid >
                </NoobBox>
                <MiddleBox>
                <WhiteTextGrid item >
                    <Home onClick={handleButtonClickHome}>
                        Home
                    </Home>
                </WhiteTextGrid >
                <WhiteTextGrid item >
                    <Tournaments onClick={handleButtonClickTournaments}>
                        TOURNAMENTS
                    </Tournaments>
                </WhiteTextGrid >
                <WhiteTextGrid item >
                    <FreeAgency onClick={handleButtonClickFreeAgency}>
                        FREE AGENCY
                    </FreeAgency>
                </WhiteTextGrid >
                <WhiteTextGrid item >
                    <Blog onClick={handleButtonClickBlog}>
                        BLOG
                    </Blog>
                </WhiteTextGrid >
                </MiddleBox>
                <SignBox>
                    <WhiteTextGrid item>
                        <SignIn>
                            <SignInText onClick={handleButtonClickSignIn}>SIGN IN</SignInText>
                        </SignIn>
                        <SignUp>
                            <SignUpText onClick={handleButtonClickSignUp}>Sign Up</SignUpText>
                            
                        </SignUp>
                    </WhiteTextGrid>
                </SignBox>

            </Grid>
        </TopBox>
    
    <InfoSection >
      <JoinNoobstorm>
      Join India’s fastest-growing community of pro gamers . 
      </JoinNoobstorm>
      <NoobStormCommunity>
      Noobstorm is a community for gamers, by gamers. From cross-platform tournaments to active recruiting – we’re creating an opportunity for you to go pro.
      </NoobStormCommunity>
      <SingningUpFrame>
        <SingningUpFrameGroup>
            <SingningUpFrameGroupFrame onClick={handleButtonClickSignUp}>
                <SingningUpFrameGroupFrameText onClick={handleButtonClickSignUp}>Signing up</SingningUpFrameGroupFrameText>
            </SingningUpFrameGroupFrame >
        </SingningUpFrameGroup>
      </SingningUpFrame>
    </InfoSection>

    <ImageSection>
      <video height="500px" controls>
        <source src={CDNURL} type="video/mp4"/>
      </video>
    </ImageSection>
      </div>
      </>
    );
  };
  
  export default Fristsection;
  

 


const SingningUpFrame = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 43px;

width: 174px;
height: 54px;


/* Inside auto layout */

flex: none;
order: 2;
flex-grow: 0;
transition: transform 0.2s ease-in-out;
&:hover {
  transform: translateY(-5px);
  cursor: pointer;
}

`
// @media (max-width: 768px) {
//   width: 100%;
//   font-size: 14px;
//   padding: 0px 20px;
//   gap: 20px;
// }
const SingningUpFrameGroup = styled.div`

width width: 174px;
height: 54px;
flex: none;
order: 0;
flex-grow: 0;
@media (max-width: 768px) {
  width: 100%;
}
`
const SingningUpFrameGroupFrame = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 18px 41px;
gap: 10px;
width: 174px;
height: 54px;
left: 0px;
top: 0px;
background: linear-gradient(51.06deg, #9358F7 0.87%, #7B78F2 25.96%, #6197EE 49.23%, #45B5E9 74.93%, #10D7E2 97.48%), linear-gradient(267.54deg, #D74037 1.13%, #E94A68 37.37%, #D735AC 80.45%);
box-shadow: 0px 16.9632px 28.8375px rgba(163, 105, 251, 0.31);
border-radius: 0px 18px;
` 
// @media (max-width: 768px) {
//   padding: 10px 20px;
//   gap: 5px;
// }
const SingningUpFrameGroupFrameText = styled.div`
width: 92px;
height: 28px;
font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 17px;
line-height: 108%;
/* or 18px */
display: flex;
align-items: center;
color: #FFFFFF;
flex: none;
order: 0;
flex-grow: 0;

`
// @media (max-width: 768px) {
//   font-size: 14px;
// }




  const NoobLogo = styled.div`
  /* Design - NOOBSTROM 1 */


width: 214px;
height: 46px;


/* Inside auto layout */

flex: none;
order: 0;
flex-grow: 0;
&:hover {
  transform: translateY(-5px);
}
`
// @media (max-width: 768px) {
//   width: 150px;
//   height: 30px;
// }

  const Home = styled.div`
  width: 49px;
  height: 18px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 108%;
  /* or 18px */
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: #FFFFFF;
  flex: none;
  order: 0;
  flex-grow: 0;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }
  `
  // @media (max-width: 768px) {
  //   font-size: 10px;
  
  //   display: flex;
  // align-items: center;
  // }
  const Tournaments = styled.div`
  width: 120px;
  height: 18px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 108%;
  /* or 18px */
  display: flex;
  align-items: center;
  color: #FFFFFF;
  flex: none;
  order: 1;
  flex-grow: 0;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }
  `
  // @media (max-width: 768px) {
  //   font-size: 10px;
  //   margin-right: 3px;
    
  // }
  const FreeAgency = styled.div`
  width: 120px;
  height: 18px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 108%;
  display: flex;
  align-items: center;
  color: #FFFFFF;
  flex: none;
  order: 2;
  flex-grow: 0;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }
  `
  // @media (max-width: 768px) {
  //   font-size: 10px;
  //   margin-right: 3px;
  // }
  const Blog = styled.div`
  width: 49px;
  height: 18px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 108%;
  display: flex;
  align-items: center;
  color: #FFFFFF;
  flex: none;
  order: 3;
  flex-grow: 0;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }
  `
  // @media (max-width: 768px) {

  //   font-size: 10px;
  //   margin-right: 3px;
  // }

  const SignInText = styled.div`
  width: 51px;
  height: 15px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 108%;
  display: flex;
  align-items: center;
  color: #FFFFFF;
  flex: none;
  order: 0;
  flex-grow: 0;
  
  `
  // @media (max-width: 768px) {
  //   width: 37px;
  //   font-size: 10px;
  // }
  const SignUpText = styled.div`
  width: 55px;
  height: 15px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 108%;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: #FFFFFF;
  flex: none;
  order: 0;
  flex-grow: 0;
  `
  // @media (max-width: 768px) {
  //   width: 40px;
  //   font-size: 10px;
  // }

  const SignIn = styled.div`
  box-sizing: border-box;

  /* Auto layout */

  display: inline-block;
  flex-direction: row;
  align-items: flex-start;
  padding: 15px 34px;
  gap: 10px;
  margin-right: 10px;

  width: 119px;
  height: 45px;
  box-shadow: 0px 16.9632px 28.8375px rgba(163, 105, 251, 0.31);
  border-radius: 0px 18px;

  /* Inside auto layout */
  border: 2px solid rgba(163, 105, 251, 0.31);
  flex: none;
  order: 0;
  flex-grow: 0;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  /* Mobile Responsive */
  `
  // @media (max-width:768px) {
  //   width: 60%;
  //   height: auto;
  //   padding: 10px;
  //   font-size: 10px;
  // }
  const SignUp = styled.div`
  display: inline-block;
flex-direction: row;
align-items: flex-start;
padding: 15px 34px;
gap: 10px;

width: 123px;
height: 45px;

background: linear-gradient(51.06deg, #9358F7 0.87%, #7B78F2 25.96%, #6197EE 49.23%, #45B5E9 74.93%, #10D7E2 97.48%);
box-shadow: 0px 16.9632px 28.8375px rgba(163, 105, 251, 0.31);
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
// @media only screen and (max-width: 786px) {
//    width: 60%;
//     height: auto;
//     padding: 10px;
//     font-size: 10px;
// }

  const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  
  `;
  // @media only screen and (max-width: 786px) {
  //   width: 80%;
  //    height: 80%; 

  // }



  const WhiteTextGrid = styled(Grid)`
  color: white;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 143px;
  position: absolute;
  width: 1400px;
  height: 46px;
  left: calc(36% - 1170px/2);
  top: 44px;
  `;
  // @media only screen and (max-width: 786px){
  //   flex-direction: row;
    
  //   width: 70%;
  //   height: 40px; 
  //   left: 5%; 
  //   top: 1%; 
  // }







const MiddleBox = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 50px;
margin-right:70px;
margin-left:50px;

width: 650px;
height: 18px;


/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
`;
// @media only screen and (max-width: 786px) {
//   flex-direction: row;

//   width: 40%;
//   height: 30px;
//   gap:2px;
 
// }

const NoobBox = styled.div`

width: 214px;
height: 46px;
margin-right:120px;

flex: none;
order: 0;
flex-grow: 0;
`
// @media only screen and (max-width: 786px) {
//   width: 80%;
//   height: 40px;
//   margin-right:0px;
// }
const SignBox= styled.div`


display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 18px;

width: 260px;
height: 45px;




flex: none;
order: 2;
flex-grow: 0;

`
// @media only screen and (max-width: 786px) {
//   top: 10px;
//   flex-direction: row; 
//  gap:2px;
//   width: 30%; 
//   height: 30px; 
// }


const ImageSection = styled.div`
position: relative;

margin-top: 20px;
width: 716px;
height: 581px;
left: 915px;
top: 144px;
color: white;

}
video{
  width: 100%;
  height: 70%;
}


`
// @media only screen and (max-width: 786px) {
//   position: absolute;
//   margin-left: 750px;
//   margin-top: 150px;
  
//   left: -650px;
//   top: -664px;
//   color: white;
//   width: 50%;
//   height: 50%;
//   top: 5%;
//   height:auto;
// }
const InfoSection = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 43px;

position: absolute;
width: 563px;
height: 561px;
left: calc(40% - 563px/2 - 296.5px);
top: 164px;

`
// @media only screen and (max-width: 786px) {
//   flex-direction: column; 
//   align-items: center; 
//   width: 80%; 
//   height: 90%; 
//   left: 5%; 
//   top: 3%; 
// }
const JoinNoobstorm = styled.div`
width: 563px;
height: 304px;

font-family: Orbitron;
font-style: normal;
font-weight: 400;
font-size: 55px;
line-height: 138%;

display: flex;
align-items: center;
letter-spacing: 0.015em;

color: #FFFFFF;



flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
`
// @media only screen and (max-width: 786px) {
//   width: 90%; 
//   height: 60px; 
//   font-size: 25px; 
//   line-height: 150%; 
// }
const NoobStormCommunity = styled.div`
width: 563px;
height: 117px;

font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 195.5%;


display: flex;
align-items: center;

color: rgba(255, 255, 255, 0.8);




flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
`

// @media only screen and (max-width: 786px) {
//   width: 90%; 
//   height: 30px; 
//   font-size: 15px; 
//   line-height: 150%; 
// }
