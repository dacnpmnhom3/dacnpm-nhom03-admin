import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardHeader,
  Divider,
  CardContent,
  TextField,
} from "@mui/material";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axiosClient from "src/api/axiosClient";
import { setErrorMsg, setSuccessMsg } from "src/redux/alert";
import ProductProfileDetail from "src/components/_dashboard/products/ProductDetail";
import { styled } from "@mui/material/styles";
import ProductPropertyTable from "src/components/_dashboard/products/ProductPropertyTable";
import ProductVariations from "src/components/_dashboard/products/ProductVariations";

const ProductImgStyle = styled("img")({
  top: 0,
  width: "80%",
  height: "80%",
  objectFit: "cover",
  position: "absolute",
});

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({
    category: "",
    _id: "",
    description: "",
    thumbnails: "",
    createdAt: "",
    properties: [],
    name: "",
    variations: [],
  });
  const dispatch = useDispatch();

  async function fetchAPI() {
    try {
      const res = await axiosClient.get(`/api/product/${productId}`);
      setProductInfo({ ...res.data.data });
    } catch (error) {
      if (error.response.data) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
  }
  useEffect(() => {
    fetchAPI();
  }, []);

  const handleSubmit = async (event) => {
    try {
      const obj =
        event.target.id === "accept"
          ? { status: "accepted" }
          : { status: "denied" };
      const res = await axiosClient.put(`/api/product/${productId}`, obj);

      dispatch(setSuccessMsg(res.data.data.message));
      navigate(-1);
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="lg">
          <Button
            to="./../"
            size="large"
            variant="contained"
            component={RouterLink}
          >
            Back
          </Button>

          <Typography sx={{ my: 3 }} variant="h4">
            Product Detail
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={5} md={6} xs={12}>
              <Box sx={{ pt: "100%", position: "relative" }}>
                <ProductImgStyle
                  alt={productInfo.name}
                  src={productInfo.thumbnails}
                />
              </Box>
            </Grid>
            <Grid item lg={7} md={6} xs={12}>
              <ProductProfileDetail productDetail={productInfo} />
            </Grid>
          </Grid>
          <Card>
            <CardHeader title="Description" />
            <Divider />
            <CardContent>
              <TextField
                fullWidth
                name="description"
                disabled
                value={productInfo.description}
                variant="outlined"
                multiline
              />
            </CardContent>
          </Card>
          <ProductPropertyTable properties={productInfo.properties} />
          <ProductVariations variations={productInfo.variations} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button
              color="primary"
              variant="contained"
              id="accept"
              onClick={handleSubmit}
              sx={{ mr: 5 }}
              size="large"
            >
              Accept
            </Button>
            <Button
              color="error"
              variant="contained"
              id="deny"
              onClick={handleSubmit}
              size="large"
            >
              Deny
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
