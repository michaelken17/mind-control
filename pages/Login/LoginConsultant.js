import { Box, createTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import SignInConsultant from "./SignInConsultant";
import TitleBox from "./TitleBox";
import MainLayout from "../../components/SignInLayout";
import React, { useRef } from "react";
import { ThemeProvider } from "@emotion/react";
import {
  montserrat,
  glacial,
  cooperHewitt,
  montserratBold,
  montserratExtraBold,
} from "fonts";
const theme = createTheme({
  typography: {
    fontFamily: montserrat,
  },
  button: {
    fontFamily: montserrat,
  },
});

export default function LoginConsultant() {
  return (
    <ThemeProvider theme={theme}>
      {" "}
      <MainLayout>
        <Box
          sx={{
            width: {
              sm: "90vw",
              xs: "90vw",
              xl: "60vw",
            },
          }}
        >
          {/* GRID SYSTEM */}
          <Grid container alignItems="center" justifyContent="center">
            <SignInConsultant />

            <TitleBox />
          </Grid>
          {/* GRID SYSTEM END */}
        </Box>
      </MainLayout>
    </ThemeProvider>
  );
}
