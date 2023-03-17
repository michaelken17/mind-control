import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });

const theme = createTheme({
  typography: {
    fontFamily: montserrat
  }
});

export default function Form() {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h5" gutterBottom>
        Example Form
      </Typography>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 1 }}
      >
        <Grid item xs={12} sm={3}>
          <Typography style={{ fontWeight: "bold" }}>First Name</Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label=""
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography style={{ fontWeight: "bold" }}>Last Name</Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label=""
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
      </Grid>

      <Button sx={{ mt: 4, backgroundColor: "black", color: "white" }}>
        Submit
      </Button>
    </ThemeProvider>
  );
}
