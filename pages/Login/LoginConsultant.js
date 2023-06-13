import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import SignInConsultant from "./SignInConsultant";
import TitleBox from "./TitleBox";
import MainLayout from "../../components/SignInLayout";
import React, { useRef } from "react";

export default function LoginConsultant() {
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
          <SignInConsultant />

          <TitleBox />
        </Grid>
        {/* GRID SYSTEM END */}
      </Box>
    </MainLayout>
  );
}
