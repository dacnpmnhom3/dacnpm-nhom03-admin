import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";

export default function ProductPropertyTable({ properties }) {
  const [values, setValues] = useState(properties);

  useEffect(() => {
    setValues([...properties]);
  }, [properties]);

  return (
    <Card sx={{ my: 5 }}>
      <CardHeader title="Properties" />
      <Divider />
      <CardContent>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            {values.map((property) => (
              <React.Fragment key={property._id}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "honeydew" }}>
                    <TableCell>{property.property_name}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {property.property_value.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.sub_property}
                      </TableCell>
                      <TableCell>{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </React.Fragment>
            ))}
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
