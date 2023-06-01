import * as React from "react";
import { Button, Container, Grid } from "@mui/material";
import {
  montserrat,
  glacial,
  cooperHewitt,
  montserratExtraBold,
} from "../../public/fonts";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { motion, AnimatePresence, color } from "framer-motion";
import ChatIcon from "@mui/icons-material/Chat";
import styles from "styles/Quiz.module.css";
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Typography,
} from "@mui/material";

import localFont from "next/font/local";
import Link from "next/link";
import { useSelector } from "react-redux";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

const theme = createTheme({
  typography: {
    fontFamily: montserrat,
  },
  button: {
    fontFamily: montserrat,
  },
});

const fiturKO = [
  { title: "Rekomendasi Psikolog Klinis", path: "/MentalHealthCheck/Start" },
  { title: "Konsultasi via Chat", path: "/DailyHealthCheck/Start" },
];

export default function KonsultasiOnlineHome() {
  const mentalIllnessData = useSelector(
    (x) => x.persistedReducer.app.mentalIllnessData
  );
  const MHCData = useSelector((x) => x.persistedReducer.app.MHCdata);

  const [isLoaded, setIsLoaded] = React.useState(false);

  const axios = require("axios");

  React.useEffect(() => {
    setIsLoaded(true);
    console.log(MHCData);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        exit={{ opacity: 0 }}
        style={{ marginTop: 20, marginBottom: "20px" }}
      >
        <Container component="main" maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: { xs: "30px", md: "40px", lg: "40px", xl: "50px" },
              color: "black",
            }}
            className={montserratExtraBold.className}
          >
            Konsultasi Online
          </Typography>
          <Typography
            sx={{
              marginTop: "15px",
              fontSize: { xs: "17px", md: "19px", lg: "18px", xl: "20px" },
              color: "black",
            }}
            className={glacial.className}
          >
            Konsultasi online membantu anda dalam menemukan psikolog yang dapat
            membantu anda dalam melawan penyakit mental anda
          </Typography>
        </Container>
      </motion.div>

      {/* Options */}
      <Box
        className={styles.quizDiv}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          paddingTop: "30px",
          paddingBottom: "20px",
          marginTop: "50px",
          px: "50px",
        }}
      >
        <Grid
          container
          columns={2}
          spacing={4}
          sx={{ width: "50%" }}
          justifyContent="center"
        >
          <Grid
            item
            xl={1}
            xs={4}
            lg={1}
            sm={2}
            sx={{ justifyItems: "center", textAlign: "center" }}
          >
            <Link legacyBehavior href="PemesananKonsultasi">
              <ImageListItem
                sx={{
                  borderRadius: "20px",
                  margin: "0 auto",
                  backgroundColor: "rgba(255, 255, 255, 0.4)",
                  // height: { xs: 250, sm: 220, md: 220, lg: 270 },
                  width: { xs: 300, sm: 300, md: 400, lg: 300 },
                }}
              >
                <Box
                  sx={{
                    borderRadius: "20px",
                    color: "black",
                    height: { xs: 250, sm: 250, md: 300, lg: 250 },
                    width: { xs: 300, sm: 300, md: 400, lg: 300 },
                  }}
                >
                  <WorkHistoryIcon
                    sx={{ marginTop: "50px", fontSize: "100px" }}
                  />
                </Box>
                <ImageListItemBar
                  sx={{
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                  }}
                  className={glacial.className}
                  title={
                    <Typography sx={{ fontSize: "20px" }}>
                      Pemesanan Konsultasi Online
                    </Typography>
                  }
                />
              </ImageListItem>
            </Link>
          </Grid>

          <Grid
            item
            xl={1}
            xs={4}
            lg={1}
            sm={2}
            sx={{ justifyItems: "center", textAlign: "center" }}
          >
            <ImageListItem
              sx={{
                borderRadius: "20px",
                margin: "0 auto",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                // height: { xs: 250, sm: 220, md: 220, lg: 270 },
                width: { xs: 300, sm: 300, md: 400, lg: 300 },
              }}
            >
              <Box
                sx={{
                  borderRadius: "20px",
                  color: "black",
                  height: { xs: 250, sm: 250, md: 300, lg: 250 },
                  width: { xs: 300, sm: 300, md: 400, lg: 300 },
                }}
              >
                <ChatIcon sx={{ marginTop: "50px", fontSize: "100px" }} />
              </Box>
              <ImageListItemBar
                sx={{
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                }}
                className={glacial.className}
                title={
                  <Typography sx={{ fontSize: "20px" }}>
                    Konsultasi Online
                  </Typography>
                }
              />
            </ImageListItem>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        className={styles.quizDiv}
        sx={{
          p: "10px",
          clear: "both",
          position: "relative",
          position: "absolute",
          bottom: 0,
          width: "100%",
          // textAlign: "center",
          // justifyContent: "center",
          // display: { xl: "block" },
        }}
      ></Box>
    </ThemeProvider>
  );
}
