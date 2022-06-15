import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import MatchDashboard from "./matchDashboard";

const Manage:React.FC = () =>{
  const router = useRouter();
  const query: ParsedUrlQuery = router.query;

  const renderSubSection = ():JSX.Element | null =>{
    if(!query.slug || query.slug.length<2) return null;
        
    switch(query.slug[1]){
    case 'matchDashboard':
      return <MatchDashboard/>
    default :
      return null
    }
  }

  return renderSubSection();
}

export default Manage;