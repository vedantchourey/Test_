import { Fragment } from 'react';
import { Container, Grid } from '@mui/material';
import Heading from '../../src/frontend/components/ui-components/typography/heading';
import NoobPage from '../../src/frontend/components/page/noob-page';
import ProductDetails from '../../src/frontend/components/product/product-detail';

const ProductDetail = (): JSX.Element => {

  return (
    <NoobPage title="Product Detail" metaData={{ description: "Noob Storm Product Detail page" }}>
      <Fragment>
        <Container maxWidth="xl">
          <Heading divider heading={"Product Detail"} />
          <Grid container spacing={2}>
            <ProductDetails name="Xbox One Series 2 Elite Wireless Controller" companyName="Microsoft" price="152.99" mainImage="/images/Controller1.png" img="/images/Controller2.png" shortDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy." description="Play like a pro with the world's most advanced controller. Designed to meet the needs of today's competitive gamers, the all-new Xbox Elite Wireless Controller Series 2 features over 30 new ways to play like a pro. Enhance your aiming with new adjustable-tension thumbsticks, fire even faster with shorter hair trigger locks, and stay on target with a wrap-around rubberized grip.
            Play like a pro with the world’s most advanced controller, compatible with Xbox Series X|S, Xbox One, and PC.
            Features a rechargable battery with up to 40 hours of battery live to keep you in the game.
            Enjoy limitless customization with 4 paddles, 6 different thumbsticks, and more with customizable button mapping.
            Tailor the elite controller to your preferred gaming style with new interchangeable thumbstick and paddle shapes. Save up to 3 custom profiles and 1 default profile on the controller and switch between them on the fly with the Profile button. Use Xbox Wireless, Bluetooth, or the included USB-C cable to play across your Xbox One and Windows 10 devices." />
          </Grid>
        </Container>
      </Fragment>
    </NoobPage>
  )
}

export default ProductDetail