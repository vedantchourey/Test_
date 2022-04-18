import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import Brackets from "../../brackets";
import Publish from "../../publish";
import Setup from "../../setup";
import Streams from "./streams";

const Create:React.FC = () =>{
  const router = useRouter();
  const query: ParsedUrlQuery = router.query;

  const renderSubSection = ():JSX.Element | null =>{
    if(!query.slug || query.slug.length<2) return null;
        
    switch(query.slug[1]){
    case 'setup':
      return <Setup/>
    case 'brackets':
      return <Brackets/>
    case 'publish':
      return <Publish/>
    case 'streams':
      return <Streams/>
    default :
      return null
    }
  }

  return renderSubSection();
}

export default Create;