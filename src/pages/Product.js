import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axiosClient from "src/api/axiosClient";
import { setErrorMsg } from "src/redux/alert";

// material
import { Grid, Container, Stack, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import ProductSearch from "src/components/_dashboard/products/ProductSearch";
import ProductSort from "src/components/_dashboard/class/ClassSort";
import ProductCard from "src/components/_dashboard/products/ProductCard";
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
];

// ----------------------------------------------------------------------

export default function Product() {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");

  const dispatch = useDispatch();

  async function fetchAPI() {
    try {
      const res = await axiosClient.get("/api/products/pending-products");
      setProducts([...res.data.data]);
    } catch (error) {
      if (error.response.data) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
  }
  useEffect(() => {
    fetchAPI();
  }, []);

  const handleSortByDate = (event) => {
    const tempProducts = [...products];
    tempProducts.sort((a, b) =>
      event.target.value === "oldest"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );
    setSortOrder(event.target.value);
    setProducts(tempProducts);
  };
  return (
    <Page title="Dashboard: Products">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Pending products
          </Typography>
          {/* <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Class
          </Button> */}
        </Stack>
        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <ProductSearch products={products} />
          <ProductSort
            currentValue={sortOrder}
            options={SORT_OPTIONS}
            onSort={handleSortByDate}
          />
        </Stack>

        <Grid container spacing={3}>
          {products.map((post, index) => (
            <Grid item key={post._id} lg={3} md={6} xs={12}>
              <ProductCard product={post} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
