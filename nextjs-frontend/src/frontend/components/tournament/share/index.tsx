import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import InvitePlayer from "./invitePlayer";

const Share:React.FC = () =>{
  const router = useRouter();
  const query: ParsedUrlQuery = router.query;

  const renderSubSection = ():JSX.Element | null =>{
    if(!query.slug || query.slug.length<2) return null;
        
    switch(query.slug[1]){
    case 'invitePlayer':
      return <InvitePlayer/>
    // case 'embedCodes':
    //   return <EmbedCodes/>
    
    default :
      return null
    }
  }

  return renderSubSection();
}

export default Share;