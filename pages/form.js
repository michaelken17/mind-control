import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Form from "./ExampleForm";

export default function Form() {
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
        <React.Fragment>
          <Form/>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}></Box>
        </React.Fragment>
      </Paper>
    </Container>
  );
}
