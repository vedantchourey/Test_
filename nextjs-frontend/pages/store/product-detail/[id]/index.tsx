import { Fragment, useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import Heading from "../../../../src/frontend/components/ui-components/typography/heading";
import NoobPage from "../../../../src/frontend/components/page/noob-page";
import ProductDetails from "../../../../src/frontend/components/product/product-detail";
import { useRouter } from "next/router";
import { IProduct } from "../../../../src/backend/services/database/models/i-product";
import { getAuthHeader } from "../../../../src/frontend/utils/headers";
import axios from "axios";

const ProductDetail = (): JSX.Element => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState<IProduct>();

  const fetchData = async (): Promise<void> => {
    setLoading(true);

    const headers = await getAuthHeader();
    axios
      .post(
        "/api/product/getById",
        { id: router.query.id },
        {
          headers: headers,
        }
      )
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (router.query.id !== undefined) {
      fetchData();
    }
  }, [router.query.id]);
  return (
    <NoobPage
      title="Product Detail"
      metaData={{ description: "Noob Storm Product Detail page" }}
    >
      <Fragment>
        <Container maxWidth="xl">
          <Heading divider heading={"Product Detail"} />
          <Grid container spacing={2}>
            {!loading && (
              <ProductDetails
                name={product?.name}
                companyName="Noobstorm"
                price={product?.amount}
                mainImage={product?.image}
                shortDescription={product?.description}
                description={product?.description}
                productCode={product?.product_code}
                id={product?.id}
                createdAt={product?.created_at}
              />
            )}
          </Grid>
        </Container>
      </Fragment>
    </NoobPage>
  );
};

export default ProductDetail;
