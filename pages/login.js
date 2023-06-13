import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import SignInPage from "./Login/SignInPage";
import TitleBox from "./Login/TitleBox";
import MainLayout from "../components/SignInLayout";
import React, { useRef } from "react";

export default function login() {
  return (
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
          <SignInPage />

          <TitleBox />
        </Grid>
        {/* GRID SYSTEM END */}
      </Box>
    </MainLayout>
  );
}
