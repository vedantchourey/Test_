import type { NextPage } from 'next'
import NoobPage from '../src/frontend/components/page/noob-page';
import Heading from '../src/frontend/components/ui-components/typography/heading';

const Home: NextPage = () => {
  return (
    <NoobPage
      title="Home"
      metaData={{
        description: "Noob Storm home page"
      }}
    >
      <Heading heading='Homepage' />
    </NoobPage>
  )
}

export default Home
