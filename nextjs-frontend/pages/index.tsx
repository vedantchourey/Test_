import type { NextPage } from "next";
import NoobPage from "../src/frontend/components/page/noob-page";
import Heading from "../src/frontend/components/ui-components/typography/heading";
import SideBar from "../src/frontend/components/ui-components/sidebar";
import Grid from "@mui/material/Grid";
import {ReactComponent as Vector} from '../assets/Vector.svg';
import {ReactComponent as Share} from '../assets/Share.svg';
import Setup from "../src/frontend/components/setup";
import Brackets from "../src/frontend/components/brackets";
const sideBarNav = [
  {
    icon: (<Vector/>),
    title: "Create",
    items: [
      {
        title: "Setup",
        url: "",
      },
      {
        title: "Brackets",
        url: "",
      },
      {
        title: "Streams",
        url: "",
      },
      {
        title: "Publish",
        url: "",
      }
    ],
  },
  {
    icon: (<Share />),
    title: "Share",
    items: [
      {
        title: "Facebook",
        url: "",
      },
      {
        title: "Whatsapp",
        url: "",
      },
      {
        title: "Twitter",
        url: "",
      },
    ],
  },
];

const Home: NextPage = () => {
  return (
    <NoobPage
      title="Home"
      metaData={{
        description: "Noob Storm home page",
      }}
    >
      <>
        <Heading heading="Homepage" />
        <Grid container spacing={1}>
          <Grid item md={3}>
            <SideBar nav={sideBarNav}/>
          </Grid>
          <Grid item md={9}>
            <Setup/>
            {/* <Brackets/> */}
          </Grid>
          
        </Grid>
      </>
    </NoobPage>
  );
};

export default Home;
