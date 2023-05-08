import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import SigninPage from "./Login/SignInPage";
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
          }, display:"flex", justifyContent:"center"
        }}
       

      >
        {/* GRID SYSTEM */}
        <Grid container>
          <SigninPage />

          <TitleBox />
        </Grid>
        {/* GRID SYSTEM END */}
      </Box>
    </MainLayout>
  );
}
