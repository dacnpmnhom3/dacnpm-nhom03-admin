import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

import { useState, useEffect } from "react";
import StandardImageList from "./productCarousel";
import { Fragment as ReactFragment } from "react";
export default function ProductVariations({ variations }) {
  const [values, setValues] = useState(variations);

  useEffect(() => {
    setValues([...variations]);
  }, [variations]);

  return (
    <Card sx={{ mb: 5 }}>
      <CardHeader title="Variations" />
      <Divider />
      {values.map((variation) => (
        <ReactFragment key={variation._id}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item lg={6} md={6} xs={12}>
                <StandardImageList images={variation.images} />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <Card>
                  <CardHeader
                    title={variation.variation_attributes
                      .map(
                        (attribute) =>
                          `${attribute.variation_name}: ${attribute.value}`
                      )
                      .join(", ")}
                  />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="SKU"
                          name="sku"
                          disabled
                          value={variation.sku}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Price"
                          name="price"
                          type="number"
                          disabled
                          value={variation.price}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Stock"
                          name="stock"
                          type="number"
                          disabled
                          value={variation.stock}
                          variant="outlined"
                        />
                      </Grid>
                      {/* <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      label="Created Date"
                      name="createdAt"
                      disabled
                      onChange={handleChange}
                      value={new Date(values.createdAt).toLocaleString()}
                      variant="outlined"
                    />
                  </Grid> */}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </ReactFragment>
      ))}
    </Card>
  );
}
