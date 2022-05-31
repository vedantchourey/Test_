import { Grid } from "@mui/material";
import React from "react";
import { BasicData } from "../setup/basic";
import { InfoData } from "../setup/info";
import SideBar from "../ui-components/sidebar";
import axios from "axios";
import { EliminateBracketData } from "../brackets/create/eliminate-bracket";
import { SettingData } from "../setup/settings";
import { useRouter } from "next/router";
import NoobPage from "../page/noob-page";
import Create from "./create";
import { ParsedUrlQuery } from "querystring";
import { PublishTournamentData } from "../publish/publish-tournament";
import { StreamData } from "./create/streams";
import moment from "moment";
import Share from "./share";
import { InvitePlayerData } from "./share/invitePlayer";
import Loader from '../ui-components/loader';

export interface TournamentData {
  id?: string;
  status?: string;
  joinStatus?: string;
  createTemplateCode?: string;
  templateCode?: string;
  basic?: BasicData;
  info?: InfoData;
  settings?: SettingData;
  bracketsMetadata?: EliminateBracketData;
  publishData?: PublishTournamentData;
  streams?: {
    data: StreamData[];
  };
  invitePlayer?: InvitePlayerData;
  playerList?: [];
  pricingDetails?: {
    pricePool: number;
    currentPricePool: number;
  };
  brackets?: any;
}

interface TournamentContextType {
  type: "new" | "update";
  id: string | string[];
  data: TournamentData;
  setData: (
    data: TournamentData,
    callback?: () => void,
    doClear?: boolean
  ) => Promise<boolean>;
  onSubmit: (data: TournamentData) => Promise<boolean>;
}

export const TournamentContext = React.createContext<TournamentContextType>({
  type: "new",
  data: {},
  id: "" || [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setData: () => {
    return new Promise(() => false);
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSubmit: () => {
    return new Promise(() => false);
  },
});

interface TournamentType {
  type: "new" | "update";
}

const Tournament: React.FC<TournamentType> = ({ type }) => {
  const [data, setData] = React.useState<TournamentData>({});
  const router = useRouter();
  const query: ParsedUrlQuery = router.query;

  const [loading, setLoading] = React.useState(false);

  let url = "/tournament/new/[...slug]";
  if (type === "update") {
    url = "/tournament/update/[id]/[...slug]";
  }

  React.useEffect(() => {
    if (router.query.id !== undefined) {
      setLoading(true);
      axios
        .get(`/api/tournaments/${router.query.id}`)
        .then((res) => {
          if (res.data.data) {
            const tournamentData = res.data.data;
            Object.keys(tournamentData).forEach((key) => {
              if (tournamentData[key] === null) {
                delete tournamentData[key];
              }
            });

            setData({
              ...tournamentData,
              basic: {
                name: tournamentData.name,
                about: tournamentData.about,
                game: tournamentData.game,
                startDate: tournamentData.startDate,
                startTime: moment(
                  tournamentData.startTime,
                  "hh:mm:ss"
                ).toDate(),
                banner: tournamentData.banner,
                createTemplateCode: tournamentData.createTemplateCode,
                cloneTournament:
                  tournamentData.createTemplateCode !== undefined,
                templateCode: tournamentData.templateCode,
              },
              publishData: {
                society: tournamentData.joinStatus,
                registration: tournamentData.status,
              },
            } as TournamentData);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false)
          console.error(err);
        });
    }
  }, []);

  const getAS = (slug: string): string => {
    let prefix = "/tournament/new";
    if (type === "update") {
      prefix = `/tournament/update/${router.query.id}`;
    }

    return `${prefix}${slug}`;
  };

  const sideBarNav = [
    {
      icon: <img src="/icons/Vector.svg" alt="icon" />,
      title: "Create",
      isActive: (url: string): boolean => {
        return url.indexOf("/create") > -1;
      },
      items: [
        {
          title: "Setup",
          url: url,
          as: getAS("/create/setup/basic"),
          isActive: (url: string): boolean => {
            return url.indexOf("/setup") > -1;
          },
        },
        {
          title: "Brackets",
          url: url,
          as: getAS("/create/brackets/create"),
          isActive: (url: string): boolean => {
            return url.indexOf("/brackets") > -1;
          },
        },
        {
          title: "Streams",
          url: url,
          as: getAS("/create/streams"),
          isActive: (url: string): boolean => {
            return url.indexOf("/streams") > -1;
          },
        },
        {
          title: "Publish",
          url: url,
          as: getAS("/create/publish"),
          isActive: (url: string): boolean => {
            return url.indexOf("/publish") > -1;
          },
        },
      ],
    },
    {
      icon: <img src="/icons/share-alt.svg" alt="icon" />,
      title: "Share",
      isActive: (url: string): boolean => {
        return url.indexOf("/share") > -1;
      },
      items: [
        {
          title: "Invite Player",
          url: url,
          as: getAS("/share/invitePlayer"),
          isActive: (url: string): boolean => {
            return url.indexOf("/invitePlayer") > -1;
          },
        },
      ],
    },
  ];

  const updateData = (
    newData: TournamentData,
    callback?: () => void,
    doClear?: boolean
  ): Promise<boolean> => {
    return submitHandler(newData).then((res) => {
      if (!res) {
        return false;
      }
      if (doClear) {
        setData({});
      }
      if (callback) {
        callback();
      }

      return true;
    });
  };

  const submitHandler = (submitData: TournamentData): Promise<boolean> => {
    const requestData = Object.assign({}, submitData);
    const req = {
      ...requestData,
      status: "PUBLISHED",
      joinStatus: "PUBLIC",
      ...(requestData.basic || {}),
    };
    // eslint-disable-next-line
    delete req.cloneTournament;
    // eslint-disable-next-line
    req.startDate = moment(req.startDate).format("YYYY-MM-DD");
    // eslint-disable-next-line
    req.startTime = moment(req.startTime).format("HH:mm:ss");
    req.status = req.publishData?.registration || "PUBLISHED";
    req.joinStatus = req.publishData?.society || "PRIVATE";
    req.templateCode = req.publishData?.templateCode || "";
    delete req.publishData;
    delete req.basic;
    if(!requestData.settings) delete req.settings
    if(!requestData.bracketsMetadata) delete req.bracketsMetadata
    if(!requestData.streams) delete req.streams
    if(!requestData.info) delete req.info
    return axios
      .post("/api/tournaments/create", req)
      .then((res: any) => {
        if (!res?.data?.errors?.length) {
          setData({ ...res?.data, ...submitData, id: res.data.id });
          return true;
        }
        return false;
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
  };

  const renderSection = (): JSX.Element | null => {
    if (!query.slug || query.slug.length <= 0) return null;

    switch (query.slug[0]) {
      case "create":
        return <Create />;
      case "share":
        return <Share />;
      default:
        return null;
    }
  };

  return (
    <NoobPage
      title="Tournament"
      metaData={{
        description: "Noob Storm tournament page",
      }}
    >
      <React.Fragment>
        <Loader loading={loading} />
        <Grid container spacing={1}>
          <Grid item md={3}>
            <SideBar key={"sidebar"} nav={sideBarNav} />
          </Grid>
          <Grid item md={9}>
            <TournamentContext.Provider
              value={{
                id: router.query.id ? router.query.id : "",
                type,
                data: data,
                setData: updateData,
                onSubmit: submitHandler,
              }}
            >
              {renderSection()}
            </TournamentContext.Provider>
          </Grid>
        </Grid>
      </React.Fragment>
    </NoobPage>
  );
};

export default Tournament;
