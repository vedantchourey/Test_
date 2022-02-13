import type { NextPage } from 'next'
import NotFound from '../../src/frontend/components/not-found/not-found';
import NoobPage from '../../src/frontend/components/page/noob-page';

const Noob404Page: NextPage = () => {
  return (
    <NoobPage
      title="404 Not Found"
      metaData={{
        description: "Noob storm 404 page"
      }}
    >
      <NotFound />
    </NoobPage >
  )
}

export default Noob404Page