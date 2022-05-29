import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Avatar,
  Box,
  Card,
  Link,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";
// utils
import { fCurrency } from "../../../utils/formatNumber";
//
import Label from "../../Label";

// ----------------------------------------------------------------------

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { _id, name, thumbnails, store_id, createdAt } = product;

  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        {/* <Label
          variant="filled"
          color="info"
          sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: "absolute",
            textTransform: "uppercase",
          }}
        >
          NEW
        </Label> */}
        <ProductImgStyle alt={name} src={thumbnails} />
      </Box>
      <Divider />
      <Stack sx={{ p: 3 }}>
        <Link
          to={`./${_id}`}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          // justifyContent="space-between"
          marginBottom={1}
        >
          <Avatar src={store_id.store_image} />
          <Typography component="span" variant="body1">
            {store_id.store_name}
          </Typography>
        </Stack>
        <Divider variant="fullWidth" />
        <Stack direction="row" alignItems="center" marginTop={1}>
          <Icon
            icon="healthicons:i-schedule-school-date-time"
            width={20}
            height={20}
          />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {new Date(createdAt).toLocaleString()}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
